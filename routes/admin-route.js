const express = require('express'),
    admin_authenticated = require('../util/authenticate').admin_authenticated,
    admin_deauthenticated = require('../util/authenticate').admin_deauthenticated,
    formidable = require('formidable'),
    multer = require('multer'),
    imageUtil = require('../util/image'),
    jimp = require('jimp'),
    fs = require('fs'),
    ejs = require('ejs'),
    randomstring = require("randomstring");
var cakeController = require('../controller/CakeController');
var adminRouter = express.Router();
let route = process.env.ADMIN_URL;

var settingPage = JSON.parse(fs.readFileSync('util/setting.json'));

/**----------------  NORMAL FUNCTION   ------------------------------ */
{
    /**
     * 
     * @param {HTTPRequest} req 
     * @param {HTTPResponse} res 
     * @param {JSON} params : [{url, params}]
     */
    var makeContentRender = (req, res, params) => {

    }
}

/**----------------  GENERAL  -------------------------------------- */
{

    adminRouter.get('/login', admin_deauthenticated, function (req, res) {
        res.render('admin/login.ejs', { 'req': req, 'res': res, 'alertmessage': req.flash('alertmessage') });
    });

    adminRouter.get('/logout', admin_authenticated, (req, res) => {
        res.redirect(route + '/login');
    });

    adminRouter.get('/', admin_authenticated, function (req, res) {
        res.render('admin/dashboard.ejs', { 'req': req, 'res': res });
    });

    adminRouter.get('/setting', admin_authenticated, function (req, res) {
        res.render('admin/setting.ejs', { 'req': req, 'res': res, 'setting': settingPage });
    });

    adminRouter.get('/error', admin_deauthenticated, function (req, res) {
        res.render('admin/error.ejs', { 'req': req, 'res': res, 'message': req.flash('message'), path: req.flash('path') });
    });
}

/**----------------   CAKE  ---------------------------------------- */
{
    adminRouter.get('/cakes', admin_authenticated, function (req, res) {
        cakeController.find({}, function (error, list) {
            if (error) {
                req.flash('message', 'Đã có lỗi xảy ra, vui lòng thực hiện lại');
                res.render('admin/list/cake-list.ejs', { 'req': req, 'res': res, 'listCake': [], 'message': req.flash('message'), 'alert': req.flash('alert') });
            } else {
                res.render('admin/list/cake-list.ejs', { 'req': req, 'res': res, 'listCake': list, 'message': req.flash('message'), 'alert': req.flash('alert') });
            }
        })
    });

    adminRouter.get('/cake', admin_authenticated, function (req, res) {
        cakeController.getCakeTypes().then((data, error) => {
            if(error){
                req.flash('message', settingPage.cake.error.eror);
                req.flash('path', route + '/cakes');
                res.redirect(route + '/error');
            }else{
                res.render('admin/add/cake.ejs', { 'req': req, 'res': res, 'message': req.flash('message'), 'alert': req.flash('alert'), 'cakeType': data || [] });
            }
        }).catch(e => {
        })
    });

    adminRouter.get('/cake/:slug', admin_authenticated, function (req, res) {
        var slug = req.params.slug;
        cakeController.findOne({ slug: slug }).exec((e, cakeBySlug) => {
            if (e) {
                req.flash('message', settingPage.cake.error.cake_type);
                req.flash('path', route + '/cakes');
                res.redirect(route + '/error');
            } else {
                cakeController.getCakeTypes().then((cake_types, error) => {
                    if(!error){
                        res.status(200);
                        res.render('admin/add/cake.ejs', { 'req': req, 'res': res, 'message': req.flash('message'), 'alert': req.flash('alert'), 'cake': cakeBySlug, 'cakeType': cake_types || [] });
                    }else{
                        req.flash('message', settingPage.cake.error.eror);
                        req.flash('path', route + '/cakes');
                        res.redirect(route + '/error');
                    }
                }).catch(e => {
                })
            }
        });
    });
    adminRouter.delete('/cake/:del', admin_authenticated, function (req, res) {
        var id = req.params.del;
        cakeController.deleteMany({ '_id': id }, function (error, data) {
            if (error) {
                res.status(200);
                res.send({ "error": error });
            } else {
                res.status(201);
                res.send({ "success": true });
            }
        });
    });
    function uploadObject(ob) {
        return {
            storage: multer.diskStorage({
                destination: (req, file, next) => {
                    next(null, './public/img/' + ob)
                },
                filename: (req, file, next) => {
                    let ext = file.originalname.split('.').pop();
                    next(null, req.body.slug + '.' + ext);
                },
            }),
            fileFilter: (req, file, next) => {
                if (!file) {
                    next();
                } else {
                    let image = file.mimetype.startsWith('image');
                    if (image) {
                        next(null, true);
                    } else {
                        next({ error: true, message: settingPage.notify_text.cake.image_file }, false);
                    }
                }
            }
        };

    }
    /**
     * AJAX POST
     */
    adminRouter.post('/cake', [admin_authenticated, multer(uploadObject('cake')).single('img')], function (req, res) {
        try {
            let _insertData = req.body;
            if(req.file){
                _insertData.img = req.file.filename;
            }
            let saveData = function(data, request, response){
                if (data._id == '') delete data._id;
                delete data.cropper;
                try {
                    cakeController._insert(data, function (error, data) {
                        if (error) {
                            console.error(error);
                            response.status(200);
                            response.send({ 'error': true, 'message': settingPage.notify_text.cake.insert });
                        } else {
                            response.status(201);
                            response.send({ 'error': false, 'alert': settingPage.notify_text.cake.success, 'data': data });
                        }
                    });
                } catch (e) {
                    response.status(200);
                    response.send({ 'error': true, 'message': settingPage.notify_text.cake.insert });
                }
            }

            if (_insertData.cropper && req.file) {
                console.log(_insertData.cropper.img);
                let cropper = JSON.parse(_insertData.cropper).img;
                console.log(cropper);
                if(cropper.img && cropper.img.crop && cropper.img.crop.x){
                    let img = req.file.filename;
                    console.log('-----------------'+img);
                    _insertData.img = cropper.ratio + '/' + img;
                    jimp.read('public/img/cake/' + img, (err, image) => {
                        if (err) {
                            res.status(501);
                            res.send({ 'error': true, 'message': settingPage.notify_text.cake.insert, 'data': data });
                        } else if (image) {
                            let x = cropper.img.crop.x,
                                y = cropper.img.crop.y,
                                w = cropper.img.crop.w,
                                h = cropper.img.crop.h;
                            image.crop(x, y, w, h).quality(80).write('public/img/cake/' + cropper.ratio + '/' + img);
                            saveData(_insertData, req, res)
                        }
                    });
                }else{
                    saveData(_insertData, req, res);
                }
            }else{
                saveData(_insertData, req, res);
            }
            
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({ 'error': true, 'message': settingPage.notify_text.cake.insert });
        }

    })
}

module.exports = exports = adminRouter;
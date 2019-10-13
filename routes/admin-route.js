const express = require('express'),
    admin_authenticated = require('../util/authenticate').admin_authenticated,
    admin_deauthenticated = require('../util/authenticate').admin_deauthenticated,
    formidable = require('formidable'),
    imageUtil = require('../util/image'),
    jimp = require('jimp'),
    ejs = require('ejs'),
    randomstring = require("randomstring");
var cakeController = require('../controller/CakeController');
var adminRouter = express.Router();
let route = process.env.ADMIN_URL;

/**----------------  NORMAL FUNCTION   ------------------------------ */
{
    var resize = (filePath, newName, ratio) => {
        jimp.read({
            url: filePath
        }).then(image => {
            console.log(image);
        }).catch(e => {

        })
    }

    /**
     * 
     * @param {HTTPRequest} req 
     * @param {HTTPResponse} res 
     * @param {JSON} params : [{url, params}]
     */
    var makeContentRender = (req, res, params)=>{

    }
}

/**----------------  GENERAL  -------------------------------------- */
{

    adminRouter.get('/login', admin_deauthenticated, function (req, res) {
        res.render(route + '/login.ejs', { 'req': req, 'res': res, 'alertmessage': req.flash('alertmessage') });
    });

    adminRouter.get('/logout', admin_authenticated, (req, res) => {
        res.redirect(route + '/login');
    });

    adminRouter.get('/', admin_authenticated, function (req, res) {
        res.render('admin/dashboard.ejs', { 'req': req, 'res': res });
    });

    adminRouter.get('/setting', admin_authenticated, function (req, res) {
        res.render('admin/setting.ejs', { 'req': req, 'res': res });
    });

    adminRouter.post('/crop', admin_deauthenticated, function (req, res) {
        let form = new formidable.IncomingForm();
        form.uploadDir = './public/img/crop';
        form.encoding = 'utf-8';
        form.keepExtensions = true;
        let img = '';
        let fields = {};

        form.on('field', (field, value) => {
            fields[field] = value;
        }).on('fileBegin', function (name, file) {
            img = randomstring.generate(10) + new Date().getTime() + '_' + file.name.split(' ').join('-');
            file.path = form.uploadDir + '/' + img;
        }).on('file', function (field, file) {
            if (file.size == 0) {
                img = '';
            } else {
                imageUtil.load.crop(file, fields.x, fields.y, fields.w, fields.h, img);

            }
        }).parse(req, function (err, fields, files) {

        }).on('end', function () {
            res.status(200).json({ image: img });
            res.end();
        });
    })
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
        res.render('admin/add/cake.ejs', { 'req': req, 'res': res, 'message': req.flash('message'), 'alert': req.flash('alert') });
    });

    adminRouter.get('/cake/:slug', admin_authenticated, function (req, res) {
        var id = req.params.slug;
        res.render('admin/add/cake.ejs', { 'req': req, 'res': res });

    });
    adminRouter.delete('/cake/:del', admin_authenticated, function (req, res) {
        var id = req.params.del;
        res.render('admin/add/cake.ejs', { 'req': req, 'res': res });
        cakeController.deleteMany({ '_id': id }, function (error, data) {
            if (error) {
                res.send({ "error": error });
                res.status(204);
            } else {
                res.send({ "success": true });
                res.status(201);
            }
        });
    });

    adminRouter.post('/cake', admin_authenticated, function (req, res) {
        let form = new formidable.IncomingForm();
        form.uploadDir = './public/img/cake';
        form.encoding = 'utf-8';
        form.maxFieldSize = 10 * 1024 * 1024; //10MB
        form.keepExtensions = true;
        let files = {};
        img = '',
            fields = {};
        form.on('field', (field, value) => {
            fields[field] = value;
        }).on('fileBegin', function (name, file) {
            img = randomstring.generate(10) + new Date().getTime() + '_' + file.name.split(' ').join('-');
            file.path = form.uploadDir + '/' + img;
        }).on('file', function (field, file) {
            files[field] = file;
            if (file.size == 0) img = '';
        }).on('progress', function (bytesReceived, bytesExpected) {
            if (bytesReceived > form.maxFieldsSize) {
                req.connection.destroy();
            }
        }).parse(req, function (err, fields, files) { }).on('end', function () {
            fields.img = img;
            if (img = '') delete fields.img;
            if (fields._id == '') delete fields._id;
            cakeController._insert(fields, function (error, data) {
                if (error) {
                    res.status(204);
                    res.send({ 'error': true, 'message': error });
                } else {
                    res.status(201);
                    res.send({ 'error': false, 'alert': 'Đã thêm bánh', 'data': data });
                }
            });
        });
    })
}

module.exports = exports = adminRouter;
require('dotenv').config();
const randomstring = require('randomstring'),
    fs = require('fs');

getImageName = (id) => {
    let date = new Date();
    let s = data.getYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes();
    return s + '_' + id + '.png';
}

module.exports = exports = function(img, path, callback) {
    if (img) {
        if (typeof img == 'string' && img != '') {
            if (img.indexOf('data:image') >= 0) {
                let fileName = getImageName(randomstring.generate(15));
                let base64Data = img.replace(/^data:image\/png;base64,/, '').replace(/^data:image\/jpeg;base64,/, "");
                fs.writeFile('public/img/' + path + '/' + fileName, base64Data, 'base64');
                img = process.env.HOST + 'img/' + path + '/' + fileName;
                callback(img);
            } else {
                img = process.env.HOST + 'img/' + path + '/' + img;
                callback(img);
            }
        } else if (img instanceof Buffer) {
            let fileName = getImageName(randomstring.generate(15));
            fs.writeFile('public/img/' + path + '/' + fileName, img);
            img = process.env.HOST + 'img/' + path + '/' + fileName;
            callback(img);
        } else if (img != null && img == '') {
            callback(null);
        }
    }
};
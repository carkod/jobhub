'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Pdf;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Schemas = require('./Schemas');

var _wkhtmltopdf = require('wkhtmltopdf');

var _wkhtmltopdf2 = _interopRequireDefault(_wkhtmltopdf);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Compile model from schema
var CVModel = _mongoose2.default.model('CVModel', _Schemas.CVSchema);
var CLModel = _mongoose2.default.model('CLModel', _Schemas.CLSchema);

var generatePDF = function generatePDF(url, req, data, printType, headerText) {
    //const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    var footerURL = 'www.carloswu.xyz';
    var name = data.name.replace(/\s/g, '');;
    var position = ''; //data.cats !== undefined ? data.cats.position : '';
    var updated = 'Updated ' + (0, _moment2.default)(data.updatedAt).year();
    var folder = _path2.default.join(__dirname, '../', '/docs');
    var uri = folder + ('/CarlosWu-' + name + '(' + printType + ').pdf');
    var options = {
        output: uri,
        ignore: ['QFont::setPixelSize: Pixel size <= 0 (0)', 'QPainter::begin():'],
        headerRight: '' + footerURL,
        footerRight: '[page]',
        headerLeft: headerText + ' - ' + position,
        footerLeft: '' + updated
    };

    var pdfURL = {
        name: printType === 'q' ? 'Quick Version' : printType === 'f' ? 'Full Version' : printType === 'cl' ? 'Cover Letter default version' : '',
        value: printType,
        link: req.protocol + '://' + req.get('host') + ('/docs/CarlosWu-' + name + '(' + printType + ').pdf')

    };

    return new Promise(function (ok, fail) {
        (0, _wkhtmltopdf2.default)(url, options, function (err) {
            if (err) {

                fail(err);
            } else {
                ok(pdfURL);
            }
        });
    });
};

function Pdf(app, db) {
    app.use('/pdf/assets', _express2.default.static(__dirname + '/pdf/assets'));
    app.use('/pdf/assets/vendor', _express2.default.static(__dirname + '/node_modules/semantic-ui-css'));
    app.set('views', __dirname + '/pdf/views');
    app.set('view engine', 'jsx');
    app.engine('jsx', require('express-react-views').createEngine());

    app.get('/pdf/fullprint/:id', function (req, res, next) {
        var id = req.params.id;

        CVModel.findOne({ _id: id }, function (findErr, content) {
            if (findErr) throw findErr;
            res.render('FullPrint.jsx', content, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
        });
    });

    app.get('/pdf/quickprint/:id', function (req, res, next) {
        var id = req.params.id;

        CVModel.findOne({ _id: id }, function (findErr, content) {
            if (findErr) throw findErr;
            res.render('QuickPrint.jsx', content, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
        });
    });

    app.get('/pdf/generate/:id', function (req, res, next) {
        var id = req.params.id;


        CVModel.findOne({ _id: id }, function (err, content) {
            if (err) throw err;

            var printType = 'f';
            var printType2 = 'q';
            var headerText = 'Currilum Vitae';
            var url = req.protocol + '://' + req.get('host') + '/pdf/fullprint/' + id;

            Promise.all([generatePDF(url, req, content, printType, headerText), generatePDF(url, req, content, printType2, headerText)]).then(function (links) {
                return res.send(links);
            });
        });
        //return next();
    });

    app.get('/pdf/coverletter/:id', function (req, res, next) {
        var id = req.params.id;

        CLModel.findOne({ _id: id }, function (findErr, content) {
            if (findErr) throw findErr;
            res.render('CoverLetter.jsx', content, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
        });
    });

    app.get('/pdf/generateCl/:id', function (req, res, next) {
        var id = req.params.id;


        CLModel.findOne({ _id: id }, function (err, content) {
            if (err) throw err;

            var printType = 'cl';
            var headerText = 'Cover Letter';
            var url = req.protocol + '://' + req.get('host') + '/pdf/coverletter/' + id;
            console.log(content);
            Promise.all([generatePDF(url, req, content, printType, headerText)]).then(function (links) {
                return res.send(links);
            });
        });
        //return next();
    });
}
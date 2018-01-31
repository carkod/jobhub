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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Compile model from schema
var CVModel = _mongoose2.default.model('CVModel', _Schemas.CVSchema);

var generatePDF = function generatePDF(req, data, printType, headerText) {
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    var footerURL = 'www.carloswu.xyz';
    var name = data.name.replace(/\s/g, '');;
    var position = data.cats.position;
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

    var pdfURL = req.protocol + '://' + req.get('host') + ('/docs/CarlosWu-' + name + '(' + printType + ').pdf');

    return new Promise(function (ok, fail) {
        console.log(url);
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

    app.get('/pdf/generate/:id', function (req, res) {
        var id = req.params.id;


        CVModel.findOne({ _id: id }, function (err, content) {
            if (err) throw err;

            function fullPrint() {
                return new Promise(function (a, f) {
                    app.render('FullPrint.jsx', content, function (err, html) {
                        if (err) {
                            f(err);
                        } else {
                            a(content);
                        }
                    });
                });
            }

            function quickPrint() {
                return new Promise(function (a, f) {
                    app.render('QuickPrint.jsx', content, function (err, html) {
                        if (err) {
                            f(err);
                        } else {
                            a(content);
                        }
                    });
                });
            }

            var pdfObj = [];

            /*
                1. Render Fullprint page.
                2. Print fullprint page PDF
                3. Render Quickprint page.
                4. Print quickprint page.
            */

            fullPrint().catch(function (e) {
                return console.log(e);
            }).then(function (data) {
                var printType = 'f';
                var headerText = 'Currilum Vitae';
                generatePDF(req, data, printType, headerText).catch(function (e) {
                    return console.log('error generating full CV');
                }).then(function (e) {
                    pdfObj.push({ name: 'Full Version', value: printType, link: e });
                    quickPrint().catch(function (e) {
                        return console.log(e);
                    }).then(function (data2) {
                        var printType2 = 'q';
                        generatePDF(req, data2, printType2, headerText).catch(function (e) {
                            return console.log('error generating quick CV');
                        }).then(function (e2) {
                            pdfObj.push({ name: 'Short Version', value: printType2, link: e2 });res.json(pdfObj);
                        });
                    });
                });
            });
        });
        return;
    });

    app.get('/pdf/generateCL/:id', function (req, res) {
        var id = req.params.id;

        CVModel.findOne({ _id: id }, function (err, content) {
            if (err) throw err;
            var objPDF = {};

            app.render('FullPrint.jsx', content, function (err, html) {
                if (err) throw err;
                var printType = 'coverletter';
                var headerText = 'Cover Letter';
                generatePDF(req, content, printType, headerText).then(function (url) {
                    objPDF.Fpdf = url;
                });
            });

            return res.json(objPDF);
        });
    });
}
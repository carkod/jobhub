'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Pdf;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Schemas = require('./Schemas');

var _nodeSassMiddleware = require('node-sass-middleware');

var _nodeSassMiddleware2 = _interopRequireDefault(_nodeSassMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Compile model from schema
var CVModel = _mongoose2.default.model('CVModel', _Schemas.CVSchema);

function Pdf(app, db) {
    app.use('/pdf/assets', _express2.default.static(__dirname + '/pdf/assets'));
    app.use('/pdf/assets/vendor', _express2.default.static(__dirname + '/node_modules/semantic-ui-css'));
    app.set('views', __dirname + '/pdf/views');
    app.set('view engine', 'jsx');
    app.engine('jsx', require('express-react-views').createEngine());

    app.get('/pdf/:type/:id', function (req, res) {
        var _req$params = req.params,
            type = _req$params.type,
            id = _req$params.id;

        CVModel.findOne({ _id: id }, function (err, content) {
            if (err) throw err;
            if (type === 'fullprint') {
                res.render('FullPrint', content);
            } else if (type === 'quickprint') {
                //res.render('quickprint', content)    
            }
        });
    });

    app.get('/pdf/quickprint', function (req, res) {
        res.render('quickprint', { title: 'Hey', message: 'Hello there!' });
    });
}
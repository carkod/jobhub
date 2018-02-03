'use strict';

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _credentials = require('./credentials');

var _credentials2 = _interopRequireDefault(_credentials);

var _CVs = require('./CVs.js');

var _CVs2 = _interopRequireDefault(_CVs);

var _CoverLetters = require('./CoverLetters.js');

var _CoverLetters2 = _interopRequireDefault(_CoverLetters);

var _Portfolio = require('./Portfolio.js');

var _Portfolio2 = _interopRequireDefault(_Portfolio);

var _Categories = require('./Categories.js');

var _Categories2 = _interopRequireDefault(_Categories);

var _Pdf = require('./Pdf');

var _Pdf2 = _interopRequireDefault(_Pdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 8081;
var dbUrl = 'mongodb://' + _credentials2.default.user + ':' + _credentials2.default.pass + '@' + _credentials2.default.host + ':' + _credentials2.default.port + '/' + _credentials2.default.db;

var promise = _mongoose2.default.connect(dbUrl, { useMongoClient: true });
var db = _mongoose2.default.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

promise.then(function (db) {

    //Security
    app.use((0, _helmet2.default)());

    //Parser Middlewares
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use(_bodyParser2.default.json());
    app.use((0, _expressValidator2.default)());
    app.use((0, _cors2.default)());

    //Download static files in uploads folder
    app.use(_express2.default.static(_path2.default.join(__dirname, '../', '/uploads')));
    app.get('/uploads/:filename', function (req, res) {
        res.download(_path2.default.join(__dirname, '../', req.url));
    });

    // PDF generator folder
    app.use(_express2.default.static(_path2.default.join(__dirname, '../', '/docs')));
    app.get('/docs/:filename', function (req, res) {
        res.download(_path2.default.join(__dirname, '../', req.url));
    });

    //3rd party APIs
    //IN(app);

    //CRUD
    (0, _CVs2.default)(app, db);
    (0, _CoverLetters2.default)(app, db);
    (0, _Portfolio2.default)(app, db);
    (0, _Categories2.default)(app, db);

    //Other applications
    (0, _Pdf2.default)(app, db);

    app.listen(PORT, function () {
        return console.log('Server is running on localhost:' + PORT);
    });
});
'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

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
var Schema = _mongoose2.default.Schema;
var dbName = 'cv_generator';
//const dbLive = 'jobhub';
var PORT = 8081;
var dbUrl = void 0;
/*if (process.env.NODE_ENV !== 'production') {
    dbUrl = 'mongodb://carloswu.xyz:27017/' + dbName;
} else {
    dbUrl = 'mongodb://localhost:27017/' + dbName;        
}*/

//Live Digital ocean MongoDB only allows to connect from c9.io IP (dev environment)
dbUrl = 'mongodb://carkod:48295620-j@www.carloswu.xyz:27017/' + dbName;

var promise = _mongoose2.default.connect(dbUrl, { useMongoClient: true });

var db = _mongoose2.default.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

promise.then(function (db) {

    //Parser Middlewares
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use(_bodyParser2.default.json());
    app.use((0, _expressValidator2.default)());
    app.use((0, _cors2.default)());

    //Download static files in uploads folder
    app.use(_express2.default.static(__dirname + '/uploads'));
    app.get('/uploads/:filename', function (req, res) {
        res.download(__dirname + req.url);
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
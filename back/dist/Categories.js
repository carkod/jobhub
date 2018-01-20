'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Categories;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Schemas = require('./Schemas');

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Compile model from schema
//import { ObjectId } from 'mongodb';
var cats = _mongoose2.default.model('categories', _Schemas.CategoriesSchema);

function Categories(app, db) {

    app.get('/api/cats', function (req, res) {

        cats.find({}, function (err, content) {
            if (err) throw err;
            //console.log(content)
            res.json(content);
        });
    });
}
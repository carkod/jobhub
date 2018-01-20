'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CategoriesSchema = exports.ProjectSchema = exports.CLSchema = exports.CVSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var print = console.log.bind(console, '>');

//print(slug('Front-end developer', {lowercase: true}).toLowerCase())

// CV
var CVSchema = new Schema({
    _id: _mongoose2.default.Schema.ObjectId,
    name: { type: String },
    summary: { type: String },
    slug: { type: String, slug: "name", unique: true },
    cats: {
        position: { type: String },
        locale: { type: String },
        cvCountry: { type: String },
        status: { type: String }
    },
    persdetails: { type: Schema.Types.Mixed },
    workExp: { type: Schema.Types.Mixed },
    educ: { type: Schema.Types.Mixed },
    langSkills: { type: Schema.Types.Mixed },
    webdevSkills: { type: Schema.Types.Mixed },
    itSkills: { type: Schema.Types.Mixed },
    other: { type: Schema.Types.Mixed }

}, { timestamps: true }, { strict: false });

// Cover Letters
var CLSchema = new Schema({
    _id: _mongoose2.default.Schema.ObjectId,
    name: { type: String },
    slug: { type: String, lowercase: true, trim: true },
    cats: {
        position: { type: String },
        locale: { type: String },
        cvCountry: { type: String }
    },
    image: { type: String },
    desc: { type: Schema.Types.Mixed },
    other: { type: Schema.Types.Mixed }

}, { timestamps: true }, { strict: false });

// Projects
var ProjectSchema = new Schema({
    _id: _mongoose2.default.Schema.ObjectId,
    name: { type: String },
    slug: { type: String, lowercase: true, trim: true },
    cats: {
        status: { type: String },
        position: { type: String },
        locale: { type: String },
        cvCountry: { type: String }
    },
    image: { type: String },
    desc: { type: Schema.Types.Mixed },
    documents: [],
    links: [],
    other: { type: Schema.Types.Mixed }

}, { timestamps: true }, { strict: false });

var CategoriesSchema = new Schema({}, { timestamps: true }, { strict: false });

// CVSchema.pre('update', function(next){
//     const slugger = slug(this._update.$set.name.toLowerCase());
//     // this._findOne({id: '5a2b3658c54dd20bd20ee3f9'},function(err, doc) {
//     //     console.log(doc)
//     //     // if (err) {
//     //     //     this._update.$set.slug = slugger;
//     //     // } else {
//     //     //     console.log('slug already exists')
//     //     // }

//     // });
//     //next(err, doc);
// });

exports.CVSchema = CVSchema;
exports.CLSchema = CLSchema;
exports.ProjectSchema = ProjectSchema;
exports.CategoriesSchema = CategoriesSchema;
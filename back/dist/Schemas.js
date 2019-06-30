'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CategoriesSchema = exports.ProjectSchema = exports.CLSchema = exports.CVSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSlugGenerator = require('mongoose-slug-generator');

var _mongooseSlugGenerator2 = _interopRequireDefault(_mongooseSlugGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
_mongoose2.default.plugin(_mongooseSlugGenerator2.default);

// CV
var CVSchema = new Schema({
    _id: _mongoose2.default.Schema.ObjectId,
    name: { type: String },
    summary: { type: String },
    slug: { type: String, slug: "name", lowercase: true, unique: true },
    pdf: { type: Array },
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
    slug: { type: String, slug: "name", lowercase: true, unique: true },
    pdf: { type: Array },
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
    slug: { type: String, slug: "name", lowercase: true, unique: true },
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

exports.CVSchema = CVSchema;
exports.CLSchema = CLSchema;
exports.ProjectSchema = ProjectSchema;
exports.CategoriesSchema = CategoriesSchema;
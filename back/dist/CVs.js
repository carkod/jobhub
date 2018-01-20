'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CVs;

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
var CVModel = _mongoose2.default.model('CVModel', _Schemas.CVSchema);

function CVs(app, db) {

    app.get('/api/cvs', function (req, res) {

        CVModel.find({}, null, { sort: { updatedDate: -1 }, new: true }, function (err, content) {
            if (err) throw err;
            //console.log(content)
            res.json(content);
        });
    });

    app.post('/api/cvs', function (req, res) {
        var r = req.body,
            cv = void 0,
            slugger = void 0;

        // TODO if slug exists change it add "name-1"
        // if slug number exists, increment it "name-2"
        // if slug does not exist, create normal slug (below)

        slugger = (0, _slug2.default)(r.name.toLowerCase());
        CVModel.find({ slug: slugger }, function (err, doc) {
            if (!err) {
                return slugger = slugger + '-' + _shortid2.default.generate();
            } else {
                console.log('slug doesn´t exist');
            }
        });

        if (!r._id) {
            // Create New

            cv = new CVModel({
                _id: _mongoose2.default.Types.ObjectId(),
                name: r.name,
                slug: slugger
            });
        } else {
            // Update
            cv = new CVModel({
                name: r.name,
                summary: r.summary,
                slug: slugger,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                    status: r.cats.status
                },
                image: r.image,
                persdetails: r.persdetails,
                workExp: r.workExp,
                educ: r.educ,
                langSkills: r.langSkills,
                webdevSkills: r.webdevSkills,
                itSkills: r.itSkills,
                other: r.other
            });
        }

        var id = r._id || cv._id;
        delete r._id;

        CVModel.update({ _id: id }, cv, { upsert: true }, function (err, msg) {
            console.log(cv);
            if (err) {
                throw err;
            } else {
                if (msg.ok) {
                    var savedID = id;
                    res.json({ _id: savedID, status: !!msg.ok });
                    console.log('changes saved!');
                } else {
                    res.json({ status: !!msg.ok });
                    console.log('No changes');
                }
            }
        });
    });

    // Copy action
    app.post('/api/cvs/:_id', function (req, res) {
        var r = req.body,
            cv = void 0;

        if (req.params._id) {

            cv = new CVModel({
                _id: _mongoose2.default.Types.ObjectId(),
                name: r.name,
                summary: r.summary,
                slug: r.slug,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                    status: r.cats.status
                },
                image: r.image,
                persdetails: r.persdetails,
                workExp: r.workExp,
                educ: r.educ,
                langSkills: r.langSkills,
                webdevSkills: r.webdevSkills,
                itSkills: r.itSkills,
                other: r.other
            });

            var id = r._id || cv._id;
            delete r._id;
            CVModel.update({ _id: id }, cv, { upsert: true }, function (err, msg) {

                if (err) {
                    throw err;
                } else {

                    if (msg.ok) {
                        var savedID = id;
                        res.json({ _id: savedID, status: !!msg.ok });
                        //console.log('changes saved!')  
                    } else {
                        res.json({ status: !!msg.ok });
                        //console.log('No changes')  
                    }
                }
            });
        } else {
            var response = {
                message: "Todo could not be copied"
            };

            res.send(response);
        }
    });

    app.get('/api/cvs/:_id', function (req, res) {
        if (req.params._id) {
            CVModel.findById(req.params._id, function (err, cv) {
                if (!err) {
                    res.json({ cv: cv });
                } else {
                    res.json({ message: err });
                }
            });
        } else {

            var response = {
                message: "Todo could not be deleted deleted"
            };

            res.send(response);
        }
    });

    app.delete('/api/cvs/:_id', function (req, res) {
        if (req.params._id) {
            CVModel.findByIdAndRemove(req.params._id, function (err, cv) {
                if (!err) {
                    var deletedID = req.params._id;
                    res.json({ _id: deletedID });
                } else {

                    res.json({ message: err });
                }
            });
        } else {

            var response = {
                message: "Todo could not be deleted deleted"
            };

            res.send(response);
        }
    });
}
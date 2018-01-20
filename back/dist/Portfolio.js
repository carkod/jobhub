'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Portfolio;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _Schemas = require('./Schemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Compile model from schema
//import { ObjectId } from 'mongodb';
var ProjectModel = _mongoose2.default.model('ProjectModel', _Schemas.ProjectSchema);

var fileDir = 'uploads/';
var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        console.log(req.body);
        cb(null, fileDir);
    },
    filename: function filename(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = (0, _multer2.default)({ storage: storage });
var fileUpload = upload.single('fieldname');

function Portfolio(app, db) {

    app.get('/api/portfolio', function (req, res) {

        ProjectModel.find({}, null, { sort: { updatedDate: -1 }, new: true }, function (err, content) {
            if (err) throw err;
            res.json(content);
        });
    });

    app.post('/api/portfolio/upload', function (req, res) {
        var f = req.file;
        // file upload
        fileUpload(req, res, function (err) {
            if (err) throw err;
            if (req.file) {
                var path = req.file.path;

                req.file.url = req.protocol + '://' + req.get('host') + '/' + path;
                res.json(req.file);
            }
        });
    });

    app.post('/api/portfolio/deupload', function (req, res) {
        var doc = req.body;
        var fileDir = __dirname + '/' + fileDir + doc.fileRawName;
        _fs2.default.unlink(fileDir, function (err) {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        });
    });

    app.post('/api/portfolio/project', function (req, res) {
        var r = req.body,
            project = void 0;
        if (!r._id) {
            // Create New
            project = new ProjectModel({
                _id: _mongoose2.default.Types.ObjectId(),
                name: r.name || 'Enter name'
            });
        } else {
            // Update
            project = new ProjectModel({
                _id: r._id,
                name: r.name,
                slug: r.slug,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                    status: r.cats.status
                },
                image: r.image,
                desc: r.desc,
                documents: r.documents,
                links: r.links
            });
        }
        var id = r._id || project._id;
        delete r._id;
        ProjectModel.update({ _id: id }, project, { upsert: true }, function (err, msg) {

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
    });

    app.get('/api/project/:_id', function (req, res) {
        if (req.params._id) {
            ProjectModel.findById(req.params._id, function (err, project) {
                if (!err) {
                    throw err;
                } else {
                    res.json({ message: err });
                }
            });
        } else {

            var response = {
                message: "Item could not be found"
            };

            res.send(response);
        }
    });

    // Copy action
    app.post('/api/portfolio/:_id', function (req, res) {
        var r = req.body,
            id = req.params._id,
            project = void 0;

        if (id) {
            project = new ProjectModel({
                _id: _mongoose2.default.Types.ObjectId(),
                name: r.name,
                slug: r.slug,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry
                },
                image: r.image,
                desc: r.desc,
                documents: r.documents,
                links: r.links
            });
            ProjectModel.create(project, function (err, msg) {

                if (err) {
                    throw err;
                } else {

                    if (msg.ok) {
                        var savedID = id;
                        res.json({ _id: savedID, status: !!msg.ok });
                    } else {
                        res.json({ status: !!msg.ok });
                    }
                }
            });
        } else {
            var response = {
                message: "Are you sure you are passing a project with _id?"
            };

            res.send(response);
        }
    });

    app.delete('/api/project/:_id', function (req, res) {
        //console.log(req.params)
        if (req.params._id) {
            ProjectModel.findByIdAndRemove(req.params._id, function (err, project) {
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
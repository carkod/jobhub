//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import { ProjectSchema } from './Schemas';

// Compile model from schema
let ProjectModel = mongoose.model('ProjectModel', ProjectSchema);


const fileDir = path.join(__dirname, '../', '/uploads');


// Create file directory if not exists
if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
}
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, fileDir);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ filesize: 500000, storage: storage });
const fileUpload = upload.single('fieldname');

export default function Portfolio(app, db) {
    app.get('/api/portfolio', (req, res) => {

        ProjectModel.find({}, null, { sort: { updatedDate: -1 }, new: true }, function (err, content) {
            if (err) throw err;
            res.status(200).json(content)
        });
    });

    app.post('/api/portfolio/upload', fileUpload, (req, res) => {
        let f = req.file;
        if (!f) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            res.status(400).json(error)
        }
        const { path } = f;
        f.url = req.protocol + '://' + req.get('host') + '/' + path;
        res.json(f)
    });

    app.post('/api/portfolio/deupload', (req, res) => {
        let doc = req.body;
        const foundDir = __dirname + '/' + fileDir + doc.fileRawName;
        fs.unlink(foundDir, (err) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(doc)
            }

        });
    });


    app.post('/api/portfolio/project', (req, res) => {
        let r = req.body,
            project;
        if (!r._id) {
            // Create New
            project = new ProjectModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name || 'Enter name',
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
                links: r.links,
            });

        }
        const id = r._id || project._id;
        delete r._id;
        ProjectModel.update({ _id: id }, project, { upsert: true }, (err, msg) => {

            if (err) {
                throw err;

            } else {

                if (msg.ok) {
                    const savedID = id;
                    res.json({ _id: savedID, status: !!msg.ok });
                    //console.log('changes saved!')  
                } else {
                    res.json({ status: !!msg.ok });
                    //console.log('No changes')  
                }
            }
        });

    });

    app.get('/api/project/:_id', (req, res) => {
        if (req.params._id) {
            ProjectModel.findById(req.params._id, (err, project) => {
                if (!err) {
                    throw err;
                } else {
                    res.json({ message: err })
                }
            });
        } else {

            let response = {
                message: "Item could not be found",
            };

            res.send(response)

        }

    });

    // Copy action
    app.post('/api/portfolio/:_id', (req, res) => {
        let r = req.body,
            id = req.params._id,
            project;

        if (id) {
            project = new ProjectModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name,
                slug: r.slug,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                },
                image: r.image,
                desc: r.desc,
                documents: r.documents,
                links: r.links,
            });
            ProjectModel.create(project, (err, msg) => {

                if (err) {
                    throw err;

                } else {

                    if (msg.ok) {
                        const savedID = id;
                        res.json({ _id: savedID, status: !!msg.ok });
                    } else {
                        res.json({ status: !!msg.ok });
                    }
                }
            });

        } else {
            let response = {
                message: "Are you sure you are passing a project with _id?",
            };

            res.send(response)
        }

    });

    app.delete('/api/project/:_id', (req, res) => {
        //console.log(req.params)
        if (req.params._id) {
            ProjectModel.findByIdAndRemove(req.params._id, (err, project) => {
                if (!err) {
                    const deletedID = req.params._id;
                    res.json({ _id: deletedID })
                } else {

                    res.json({ message: err })
                }
            });
        } else {

            let response = {
                message: "Todo could not be deleted deleted",
            };

            res.send(response)

        }

    });


}
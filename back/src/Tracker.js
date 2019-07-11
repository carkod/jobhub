//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import { ApplicationSchema, ContactsSchema, StagesSchema } from './Schemas';

// Compile model from schema
let ApplicationModel = mongoose.model('ApplicationModel', ApplicationSchema);
let ContactsModel = mongoose.model('ContactsModel', ContactsSchema);
let StagesModel = mongoose.model('StagesModel', StagesSchema);


const fileDir = 'uploads/applications'
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, fileDir);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
const fileUpload = upload.single('fieldname');

function fillModel(r) {
    const stages = new StagesModel({
        _id: r._id || mongoose.Types.ObjectId(),
        order: r.order,
        completed: r.completed,
        action: r.action,
        dept: r.dept,
        startDate: r.startDate,
        endDate: r.endDate,
    })
    console.log(r)
    return {
        // Create new || Update
        _id: r._id || mongoose.Types.ObjectId(),
        company: r.company,
        status: {
            value: r.status.value,
            text: r.status.text
        },
        role: r.role,
        salary: r.salary,
        contacts: r.contacts,
        description: r.description,
        files: r.files,
        stages: r.stages,
        location: r.location
    }
}

export default function Tracker(app, db) {

    app.get('/api/applications', (req, res) => {
        ApplicationModel.find({}, null, { sort: { updatedDate: -1 }, new: true }, function (err, content) {
            if (err) throw err;
            res.json(content)
        });
    });

    app.post('/api/applications/upload', (req, res) => {
        let f = req.file;
        // file upload
        fileUpload(req, res, (err) => {
            if (err) throw err;
            if (req.file) {

                const { path } = req.file;
                req.file.url = req.protocol + '://' + req.get('host') + '/' + path;
                res.json(req.file)
            }
        })
    });

    app.post('/api/applications/deupload', (req, res) => {
        let doc = req.body;
        const fileDir = __dirname + '/' + fileDir + doc.fileRawName;
        fs.unlink(fileDir, (err) => {
            if (err) {
                res.json(err)
            } else {
                res.json(doc)
            }

        });
    });


    app.post('/api/application', (req, res) => {
        let r = req.body,
            applications = new ApplicationModel(fillModel(r));
        const id = r._id || applications._id;
        delete r._id;
        ApplicationModel.updateOne({ _id: id }, applications, { upsert: true }, (err, msg) => {
            console.log('upsert', msg, applications)
            if (err) {
                throw err;

            } else {

                if (msg.ok) {
                    const savedID = id;
                    res.json({ _id: savedID, status: !!msg.ok });
                    console.log('changes saved!')
                } else {
                    res.json({ status: !!msg.ok });
                    console.log('No changes')
                }
            }
        });

    });

    app.get('/api/applications/:_id', (req, res) => {
        if (req.params._id) {
            ApplicationModel.findById(req.params._id, (err, applications) => {
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
    app.post('/api/applications/:_id', (req, res) => {
        let r = req.body,
            id = req.params._id,
            applications;

        if (id) {
            applications = new ApplicationModel(fillModel(r));
            ApplicationModel.create(applications, (err, msg) => {

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
                message: "Are you sure you are passing a applications with _id?",
            };

            res.send(response)
        }

    });

    app.delete('/api/application/:_id', (req, res) => {
        console.log(req.params)
        if (req.params._id) {
            ApplicationModel.findByIdAndRemove(req.params._id, (err, applications) => {
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
//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import { ApplicationSchema } from './Schemas';

// Compile model from schema
let ApplicationModel = mongoose.model('ApplicationModel', ApplicationSchema);


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
            applications = new ApplicationModel({
                // Create new || Update
                _id: r._id || mongoose.Types.ObjectId(),
                company: r.company,
                contacts: {
                    contactId: r.contactId || mongoose.Types.ObjectId(),
                    contactName: r.contacts.contactName,
                    contactEmail: r.contacts.contactEmail,
                    contactPhone: r.contacts.contactPhone,
                },
                description: r.description,
                files: r.files,
                stages: r.stages,
                status: {
                    value: r.status.value,
                    name: r.status.name
                },
                location: r.location
            });
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
            applications = new ApplicationModel({
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

    app.delete('/api/applications/:_id', (req, res) => {
        //console.log(req.params)
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
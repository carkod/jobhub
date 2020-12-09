import moment from 'moment';
import mongoose from 'mongoose';
import { generatePDF } from './generator';
import { CVSchema } from './Schemas';

// Compile model from schema
const CVModel = mongoose.model('CVModel', CVSchema);
const compare = (a, b) => {
    const splitA = a.date.split('–')[0];
    const A = moment(splitA.split('/').reverse());
    const splitB = b.date.split('–')[0];
    const B = moment(splitB.split('/').reverse());
    return B.diff(A);
}

export default function CVs(app, db) {
    app.get('/api/cvs', (req, res) => {

        CVModel.find({}, null, { sort: { updatedDate: -1 }, new: true }, function (err, content) {
            if (err) throw err;
            res.status(200).json(content)
        });
    });

    app.post('/api/cvs', async (req, res) => {
        let r = req.body;
        let pdfPreview;

        // Sort by date            
        const workExp = r.workExp.sort(compare)
        const educ = r.educ.sort(compare)

        // Upsert model
        const cv = new CVModel({
            name: r.name,
            summary: r.summary,
            pdf: r.pdf,
            fullprint: {
                previewUrl: pdfPreview,
                file: file.toString(),
            },
            cats: {
                position: r.cats.position,
                locale: r.cats.locale,
                cvCountry: r.cats.cvCountry,
                status: r.cats.status,
            },
            image: r.image,
            persdetails: r.persdetails,
            workExp: workExp,
            educ: educ,
            langSkills: r.langSkills,
            webdevSkills: r.webdevSkills,
            itSkills: r.itSkills,
            other: r.other,
        });
        if (!r._id) {
            // Create New
            cv._id = mongoose.Types.ObjectId()
        }

        const id = r._id || cv._id;
        delete r._id;


        await CVModel.update({ _id: id }, cv, { upsert: true }, (err, msg) => {
            if (err) {
                throw err;

            } else {
                if (msg.ok) {
                    const savedID = id;
                    res.json({ status: !!msg.ok, message: "CV changes saved!" });
                } else {
                    res.json({ status: !!msg.ok });
                    console.log('No changes')
                }
            }
        });

    });

    // Copy action
    app.post('/api/cvs/:_id', (req, res) => {
        let r = req.body,
            cv;

        if (req.params._id) {

            cv = new CVModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name,
                summary: r.summary,
                pdf: r.pdf,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                    status: r.cats.status,
                },
                image: r.image,
                persdetails: r.persdetails,
                workExp: r.workExp,
                educ: r.educ,
                langSkills: r.langSkills,
                webdevSkills: r.webdevSkills,
                itSkills: r.itSkills,
                other: r.other,
            });

            const id = cv._id;
            delete r._id;
            CVModel.create(cv, (err, content) => {

                if (err)
                    throw err;

                if (content !== undefined) {
                    res.json({ _id: content._id, status: true });
                    console.log('changes saved!')
                } else {
                    res.json({ status: false });
                    console.log('No changes')
                }
            });

        } else {
            const response = {
                message: "Todo could not be copied",
            };

            res.send(response)
        }

    });

    app.get('/api/cvs/:_id', (req, res) => {
        if (req.params._id) {
            CVModel.findById(req.params._id, (err, cv) => {
                if (!err) {
                    res.status(200).json({ cv })
                } else {
                    res.status(200).json({ message: err })
                }
            });
        } else {

            const response = {
                message: "CV could not be found",
            };

            res.send(response)

        }

    });

    app.delete('/api/cvs/:_id', (req, res) => {
        if (req.params._id) {
            CVModel.findByIdAndRemove(req.params._id, (err, cv) => {
                if (!err) {
                    const deletedID = req.params._id;
                    res.json({ _id: deletedID })
                } else {

                    res.json({ message: err })
                }
            });
        } else {

            const response = {
                message: "Todo could not be deleted deleted",
            };

            res.send(response)

        }

    });


}
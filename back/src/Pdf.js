import express from 'express';
import mongoose from 'mongoose';
import { CVSchema, CLSchema } from './Schemas';
import { generatePDF } from './generator';

// Compile model from schema
let CVModel = mongoose.model('CVModel', CVSchema);
let CLModel = mongoose.model('CLModel', CLSchema);

export default function Pdf(app, db) {
    app.use('/pdf/assets', express.static(__dirname + '/pdf/assets'));
    app.use('/pdf/assets/vendor', express.static(__dirname + '/node_modules/semantic-ui-css'));
    app.set('views', __dirname + '/pdf/views');
    app.set('view engine', 'jsx');
    app.engine('jsx', require('express-react-views').createEngine());

    app.get('/pdf/fullprint/:id', (req, res, next) => {
        const { id } = req.params;
        CVModel.findOne({ _id: id }, (findErr, content) => {
            if (findErr) throw findErr;
            res.render('FullPrint.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })

        })
    })

    app.get('/pdf/quickprint/:id', (req, res, next) => {
        const { id } = req.params;
        CVModel.findOne({ _id: id }, (findErr, content) => {
            if (findErr) throw findErr;
            res.render('QuickPrint.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })

        })
    })

    app.get('/pdf/fullprint-esp/:id', (req, res, next) => {
        const { id } = req.params;
        CVModel.findOne({ _id: id }, (findErr, content) => {
            if (findErr) throw findErr;
            res.render('FullPrint.esp.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })

        })
    })

    app.get('/pdf/quickprint-esp/:id', (req, res, next) => {
        const { id } = req.params;
        CVModel.findOne({ _id: id }, (findErr, content) => {
            if (findErr) throw findErr;
            res.render('QuickPrint.esp.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })

        })
    })

    app.get('/pdf/generate/:id', (req, res, next) => {

        const { id } = req.params;

        CVModel.findOne({ _id: id }, async (err, content) => {
            if (err) throw err;
            let pdfPreview = `${req.protocol}://${req.get('host')}/pdf/fullprint/${content._id}`;

            if (content.locale === 'es-ES') {
                pdfPreview = `${req.protocol}://${req.get('host')}/pdf/fullprint-esp/${content._id}`
            }
            const file = await generatePDF(pdfPreview)

            res.set({
                'Content-Type': 'application/pdf', 'Content-Length': file.length
            });
            res.status(200).send(file);
        })
    });

    app.get('/pdf/coverletter/:id', (req, res, next) => {
        const { id } = req.params;
        CLModel.findOne({ _id: id }, function (findErr, content) {
            if (findErr) throw findErr;
            res.render('CoverLetter.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })

        })
    })

    app.get('/pdf/generateCl/:id', (req, res, next) => {
        const { id } = req.params;

        CLModel.findOne({ _id: id }, function (err, content) {
            if (err) throw err;
            console.log(content)
            const printType = 'cl';
            const headerText = 'Cover Letter';
            Promise.all([generatePDF(req, content, printType, headerText)]).then(links => {
                content.pdf = links[0].link;
                res.status(200).send(content)
            })
            .catch((e) => {
                console.log('hello Error', e)
            })
        })
    });
}
    
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

    app.get('/pdf/view/:type/:id/:locale?', (req, res, next) => {
        const { type, locale, id } = req.params;
        let Model = CVModel;
        let template = 'FullPrint.jsx';
        if (locale === "es-ES") {
            template = `${locale}/CV.jsx`
        }
        if (type === "cover-letter") {
            Model = CLModel
            template = "CoverLetter.jsx"
            if (locale === "es-ES") {
                template = "Carta.jsx"
            }
        }
        
        Model.findOne({ _id: id }, (findErr, content) => {
            if (findErr) {
                res.send(`Error: ${findErr}`)
            } else if (content === null) {
                res.send(`No item found`)
            } else {
                res.render(template, content, (err, html) => {
                    if (err) res.send(`Error: ${err}`)
                    res.send(html)
                })
            }
            
        })
    })

    app.get('/pdf/generate/:type/:id', (req, res, next) => {

        const { type, id } = req.params;
        let Model = CVModel;
        let title = type.replace("-", " ")
        if (type === "cover-letter") {
            Model = CLModel
        }
        Model.findOne({ _id: id }, async (err, content) => {
            if (err) throw err;
            const url = `${req.protocol}://${req.get('host')}/pdf/view/${type}/${content._id}/${content.locale}`;
            var updatedDate = new Date(content.updatedAt)
            updatedDate = `${updatedDate.getDate()}/${updatedDate.getMonth()}/${updatedDate.getFullYear()}`

            const file = await generatePDF(url, title, updatedDate)

            res.set({
                'Content-Type': 'application/pdf', 
                'Content-Length': file.length
            });
            res.status(200).send(file);
        })
    });

}

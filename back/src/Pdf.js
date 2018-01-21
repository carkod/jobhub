import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { CVSchema } from './Schemas';
import sassMiddleware from 'node-sass-middleware';
import wkhtmltopdf from 'wkhtmltopdf';
// Compile model from schema
let CVModel = mongoose.model('CVModel', CVSchema );

const generatePDF = (req, data) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const footerURL = 'www.carloswu.xyz'
    const name = data.name;
    const position = data.cats.position;
    const options = {
      output : `docs/CarlosWu-${name}.pdf`,
      ignore: ['QFont::setPixelSize: Pixel size <= 0 (0)', 'QPainter::begin():'],
      footerLeft : `${footerURL}`,
      footerRight: '[page]',
      headerLeft: `Curriculum Vitae - ${position}`
    }
    
    const asycGen = new Promise((ok,fail) => {
        const pdfURL = req.protocol + '://' + req.get('host') + `/docs/CarlosWu-${name}.pdf`;
        wkhtmltopdf(url, options, (err) => {
            if (err) {
                fail(err)
            } else {
                ok(pdfURL);        
            }
            
        });
    });
    return asycGen;
    
}

export default function Pdf (app,db) {
    app.use('/pdf/assets', express.static(__dirname + '/pdf/assets'));
    app.use('/pdf/assets/vendor', express.static(__dirname + '/node_modules/semantic-ui-css'));
    app.set('views', __dirname + '/pdf/views');
    app.set('view engine', 'jsx');
    app.engine('jsx', require('express-react-views').createEngine()); 
    
    app.get('/pdf/:type/:id', (req, res) => {
        const {type, id} = req.params;
        CVModel.findOne({_id: id}, function(err, content) {
           if (err) throw err;
           if (type === 'fullprint') {
               res.render('FullPrint', content)
           } else if (type === 'quickprint') {
                res.render('QuickPrint', content)    
           }
        }).then((data) => generatePDF(req, data).then(pdf => res.send(pdf)) )
        
    });
}



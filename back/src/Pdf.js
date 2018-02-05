import express from 'express';
import mongoose from 'mongoose';
import { CVSchema } from './Schemas';
import wkhtmltopdf from 'wkhtmltopdf';
import moment from 'moment';
import path from 'path';
import axios from 'axios';

// Compile model from schema
let CVModel = mongoose.model('CVModel', CVSchema );

const generatePDF = (url, req, data, printType, headerText) => {
    //const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const footerURL = 'www.carloswu.xyz';
    const name = data.name.replace(/\s/g, '');;
    const position = data.cats.position;
    const updated = 'Updated ' + moment(data.updatedAt).year();
    const folder = path.join(__dirname, '../', '/docs');
    const uri = folder + `/CarlosWu-${name}(${printType}).pdf`;
    const options = {
      output : uri,
      ignore: ['QFont::setPixelSize: Pixel size <= 0 (0)', 'QPainter::begin():'],
      headerRight : `${footerURL}`,
      footerRight: '[page]',
      headerLeft: `${headerText} - ${position}`,
      footerLeft: `${updated}`
    }
    
    const pdfURL = {
        name: printType === 'q' ? 'Quick Version' : printType === 'f' ? 'Full Version' : '',
        value: printType,
        link: req.protocol + '://' + req.get('host') + `/docs/CarlosWu-${name}(${printType}).pdf`,
        
    }
   
    return new Promise((ok,fail) => {
        wkhtmltopdf(url, options, (err) => {
            if (err) {
                
                fail(err);
            } else {
                ok(pdfURL);        
            }
            
        });
    });
    
}

export default function Pdf (app,db) {
    app.use('/pdf/assets', express.static(__dirname + '/pdf/assets'));
    app.use('/pdf/assets/vendor', express.static(__dirname + '/node_modules/semantic-ui-css'));
    app.set('views', __dirname + '/pdf/views');
    app.set('view engine', 'jsx');
    app.engine('jsx', require('express-react-views').createEngine()); 
    
    app.get('/pdf/fullprint/:id', (req, res, next) => {
        const {id} = req.params;
        CVModel.findOne({_id: id}, (findErr, content) => {
        if (findErr) throw findErr;
            res.render('FullPrint.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })    
        
        })
    })
    
    app.get('/pdf/quickprint/:id', (req, res, next) => {
        const {id} = req.params;
        CVModel.findOne({_id: id}, (findErr, content) => {
        if (findErr) throw findErr;
            res.render('QuickPrint.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })    
        
        })
    })
    
    app.get('/pdf/generate/:id', (req, res, next) => {
        const {id} = req.params;
        
        CVModel.findOne({_id: id}, function(err, content) {
            if (err) throw err;
            
            const printType = 'f';  
            const printType2 = 'q';  
            const headerText = 'Currilum Vitae';
            const url = req.protocol + '://' + req.get('host') + '/pdf/fullprint/' + id;
           
            
            Promise.all([generatePDF(url, req, content, printType, headerText), generatePDF(url, req, content, printType2, headerText)]).then(links => res.send(links))
            
        })
        //return next();
    });
    
    app.get('/pdf/generateCL/:id', (req, res) => {
        const {id} = req.params;
        CVModel.findOne({_id: id}, function(err, content) {
            if (err) throw err;
            let objPDF = {};
            
            app.render('FullPrint.jsx', content, (err, html) => {
                if (err) throw err;
                const printType = 'coverletter';
                const headerText = 'Cover Letter';
                generatePDF(req, content, printType, headerText).then(url => { objPDF.Fpdf = url; });
            })
            
           return res.json(objPDF);
        })
        
    });
}



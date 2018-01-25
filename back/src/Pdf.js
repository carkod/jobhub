import express from 'express';
import mongoose from 'mongoose';
import { CVSchema } from './Schemas';
import wkhtmltopdf from 'wkhtmltopdf';
import moment from 'moment';
import path from 'path';

// Compile model from schema
let CVModel = mongoose.model('CVModel', CVSchema );

const generatePDF = (req, data, printType, headerText) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const footerURL = 'www.carloswu.xyz'
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
    
    const pdfURL = req.protocol + '://' + req.get('host') + `/docs/CarlosWu-${name}(${printType}).pdf`; 
   
    return new Promise((ok,fail) => {
        console.log(url)
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
    
    app.get('/pdf/generate/:id', (req, res) => {
        const {id} = req.params;
        
        
        CVModel.findOne({_id: id}, function(err, content) {
            if (err) throw err;
            
            
            function fullPrint() {
                return new Promise((a,f) => {
                    app.render('FullPrint.jsx', content, (err, html) => {
                    if (err) {f(err)} else {a(content)} 
                    })               
                })
            }
            
            function quickPrint() {
                return new Promise((a,f) => {
                    app.render('QuickPrint.jsx', content, (err, html) => {
                    if (err) {f(err)} else {a(content)} 
                    })               
                })
            }
            
            let pdfObj = []
            
            /*
                1. Render Fullprint page.
                2. Print fullprint page PDF
                3. Render Quickprint page.
                4. Print quickprint page.
            */
            
            fullPrint().catch(e => console.log(e)).then(data => {
               const printType = 'f';  
               const headerText = 'Currilum Vitae';
               generatePDF(req, data, printType, headerText).catch(e => console.log('error generating full CV')).then(e => {
                pdfObj.push({name: 'Full Version', value:printType, link:e});
                quickPrint().catch(e => console.log(e)).then(data2 => {
                const printType2 = 'q';  
                generatePDF(req, data2, printType2, headerText).catch(e => console.log('error generating quick CV')).then(e2 => { pdfObj.push({name:'Short Version', value: printType2, link:e2}); res.json(pdfObj)})
                })
               })
            })
        })
        return;
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



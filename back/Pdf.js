import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { CVSchema } from './Schemas';
import sassMiddleware from 'node-sass-middleware';

// Compile model from schema
let CVModel = mongoose.model('CVModel', CVSchema );

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
                //res.render('quickprint', content)    
           }
        });
        
    });
    
    app.get('/pdf/quickprint', (req, res) => {
        res.render('quickprint', { title: 'Hey', message: 'Hello there!' })
    });

}



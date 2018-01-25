import bodyParser from 'body-parser';
import express from 'express';
import expressValidator from 'express-validator';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const dbName = 'cv_generator';
//const dbLive = 'jobhub';
const PORT = 8081;
let dbUrl;


//Live Digital ocean MongoDB only allows to connect from c9.io IP (dev environment)
dbUrl = 'mongodb://carkod:48295620-j@www.carloswu.xyz:27017/' + dbName;

import CVs from './CVs.js';
import CoverLetters from './CoverLetters.js';
import Portfolio from './Portfolio.js';
import Categories from './Categories.js';
import Pdf from './Pdf';

let promise = mongoose.connect(dbUrl, { useMongoClient: true });

let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

promise.then((db) => {
    
    //Parser Middlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use(cors());
    
    
    //Download static files in uploads folder
    app.use(express.static(path.join(__dirname, '../', '/uploads')));
    app.get('/uploads/:filename', (req, res) => {
        res.download(path.join(__dirname, '../', req.url));
    });
    
    // PDF generator folder
    app.use(express.static(path.join(__dirname, '../', '/docs')));    
    app.get('/docs/:filename', (req, res) => {
        res.download(path.join(__dirname, '../', req.url));
    });
    
    //3rd party APIs
    //IN(app);
    
    //CRUD
    CVs(app, db);
    CoverLetters(app, db);
    Portfolio(app, db);
    Categories(app, db);
    
    //Other applications
    Pdf(app, db);
    
   app.listen(PORT, () => console.log('Server is running on localhost:' + PORT)); 
   
});

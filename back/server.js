import bodyParser from 'body-parser';
import express from 'express';
import expressValidator from 'express-validator';
import cors from 'cors';
import mongodb from 'mongodb';
import mongoose from 'mongoose';


const app = express();
const Schema = mongoose.Schema;
const dbName = 'cv_generator';
//const dbLive = 'jobhub';
const PORT = 8081;
let dbUrl;
/*if (process.env.NODE_ENV !== 'production') {
    dbUrl = 'mongodb://carloswu.xyz:27017/' + dbName;
} else {
    dbUrl = 'mongodb://localhost:27017/' + dbName;        
}*/

//Live Digital ocean MongoDB only allows to connect from c9.io IP (dev environment)
dbUrl = 'mongodb://carkod:48295620-j@www.carloswu.xyz:27017/' + dbName;

import CVs from './CVs.js';
import CoverLetters from './CoverLetters.js';
import Portfolio from './Portfolio.js';
import {IN} from './linkedin';

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
    app.use(express.static(__dirname + '/uploads'));
    app.get('/uploads/:filename', (req, res) => {
        res.download(__dirname + req.url);
    });

    //3rd party APIs
    IN(app);
    
    //CRUD
    CVs(app, db);
    CoverLetters(app, db);
    Portfolio(app, db);
    
   app.listen(PORT, () => console.log('Server is running on localhost:' + PORT)); 
   
});

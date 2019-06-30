import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';
import Categories from './Categories.js';
import CoverLetters from './CoverLetters.js';
import CVs from './CVs.js';
import Login from './Login.js';
import Pdf from './Pdf';
import Portfolio from './Portfolio.js';

dotenv.config();
const app = express();
const PORT = 8081;
const dbUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
let promise = mongoose.connect(dbUrl, { useNewUrlParser: true });
let db = mongoose.connection;


//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

promise.then((db) => {
    
    //Security
    app.use(helmet())
    
    //Parser Middlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // app.use(expressValidator());
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
    Login(app, db);
    
    //Other applications    
    Pdf(app, db);
    
   app.listen(PORT, () => console.log('Server is running on localhost:' + PORT)); 
   
});

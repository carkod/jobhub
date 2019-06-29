import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressValidator from 'express-validator';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';
import Categories from './Categories.js';
import CoverLetters from './CoverLetters.js';
import credentials from './credentials';
import CVs from './CVs.js';
import Pdf from './Pdf';
import Portfolio from './Portfolio.js';
const app = express();
const PORT = 8081;
const dbUrl = `mongodb://${credentials.user}:${credentials.pass}@${credentials.host}:${credentials.port}/${credentials.db}`;

<<<<<<< HEAD
=======
import CVs from './CVs.js';
import CoverLetters from './CoverLetters.js';
import Portfolio from './Portfolio.js';
import Categories from './Categories.js';
import Pdf from './Pdf';
import Login from './Login';
>>>>>>> fba7f0530dc9e208b3335df8602b36bd8fda325a

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
<<<<<<< HEAD
    
    //Other applications    
=======
    Login(app,db)
    //Other applications
>>>>>>> fba7f0530dc9e208b3335df8602b36bd8fda325a
    Pdf(app, db);
    
   app.listen(PORT, () => console.log('Server is running on localhost:' + PORT)); 
   
});

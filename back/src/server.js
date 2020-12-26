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
import Tracker from './Tracker.js';
import Api from './Api';
import Blog from './Blog.js';

dotenv.config({path:'../.env'});
const app = express();
const dbUrl = process.env.MONGO_CONNECTION_STRING
let promise = mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

promise.then((db) => {

	//Security
	app.use(helmet())

	//Parser Middlewares
	app.use(cors());
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	
	// app.use(expressValidator());

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

	// Unprotected route
	Login(app, db);
	Pdf(app, db);

	//CRUD
	Api(app);
	CVs(app, db);
	CoverLetters(app, db);
	Portfolio(app, db);
	Categories(app, db);
	Tracker(app, db);
	Blog(app, db);

});



app.listen(process.env.BACK_PORT, () => console.log('Server is running on localhost:' + process.env.BACK_PORT));
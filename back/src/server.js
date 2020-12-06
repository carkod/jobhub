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

dotenv.config({path:__dirname+'./.env'});
const app = express();
const dbUrl = process.env.MONGO_CONNECTION_STRING
let promise = mongoose.connect(dbUrl, { useNewUrlParser: true });
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

	
	// app.use((req, res, next) => {
	// 	try {
	// 		if (!req.headers.authorization) {
	// 			res.status(401).json({ message: 'No authorization bearer in request headers', ok: false })
	// 		}
	// 		const token = req.headers.authorization.split(" ")[1]
	// 		const secret = process.env.JWT_SECRET
	// 		jwt.verify(token, secret, function (err, payload) {
	// 			console.log(token)
	// 			if (err) {
	// 				res.status(401).json({ name: err.name, message: err.message, ok: false })
	// 			}
	// 			if (payload) {
	// 				//CRUD
	// 				next()
	// 			}
	// 		})
	// 	} catch (e) {
	// 		res.status(401).json({ message: 'Not authorized', ok: false })
	// 		console.log('catch error', e)
	// 		// next()
	// 	}
	// })


});



app.listen(process.env.BACK_PORT, () => console.log('Server is running on localhost:' + process.env.BACK_PORT));
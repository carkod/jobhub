import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

const app = express();

const dbName = 'vkgirls';
const dbUrl = 'mongodb://localhost:27017/' + dbName;

const PORT = 8081;
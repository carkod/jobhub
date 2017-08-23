var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

import mongoose from 'mongoose';


const Schema = mongoose.Schema;
var CVSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, unique: true},
    name: {type: String, required: [true, 'Name is empty' ]},
    workRepeat: [
        {
            id: {type: String },
            date: {type: String },
            position: {type: String },    
        }
    ],
    
    
});

// Compile model from schema
let CVModel = mongoose.model('CVModel', CVSchema );

export default function CVs (app, db) {

    app.get('/api/cvs', (req, res) => {
       
       CVModel.find({}, function(err, content) {
           if (err) throw err;
           res.json(content)
       });
       
    });

    app.post('/api/cvs', (req, res) => {

        var cv = new CVModel({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            date: req.body.date,
            position: req.body.position,
            workRepeat: req.body.workRepeat
        });
        
        
        cv.save((err) => {
          if (err) {
              return console.log('there was an error saving CVModel' +  err);
          } else {
              console.log('saved: ' + cv);
          }
        });

    });
    
}

var obj = {
            _id : ObjectId(),
            slug:'front-end-developer-cv',
            lang: 'en',
            lastModified: new Date(Date.now()).toISOString(),
            name: 'CV front-end developer',
            position: [
                {
                    title: 'front-end',
                    lang:'en'
                },
                {
                    title: 'business',
                    lang:'en'
                }
            ],
            content: {
                summary: ['123456', '456789'],
                details: {
                    name: 'Carlos',
                    surname: 'Wu Fei',
                    phone: '07926734842',
                    photo: 'foto-cv.jpg',
                    nationality: 'Spanish',
                    Address: '40 Millrise',
                },
                work_exp: [
                        {
                        date: '08/2016 – now',
                        company: 'Eventure Internet Ltd.',
                        jobtitle: 'Front-end developer. Web designer. Project support.',
                        description: 'Design team, front-end developer and web designer (C# MVC, Javascript, HTML5, CSS3). Offshore team management. Project support (issue tracking, quality assurance, stakeholder&#39;s management). Agile development.',
                        },
                        {
                          date: '05/2015 – 12/2015',
                          company: 'Fourcats Media S.L.',
                          jobtitle: 'Front-end developer / Web designer at Fourcats Media.',
                          description: 'Successfully implemented graphic design mockups into HTML5 and CSS in www.todopapas.com and www.canastilladelembarazo.com both responsive as of now. jQuery was used for improved interactions with user, Bootstrap for responsive design, on a cakePHP back-end architecture. Newsletters were sent to clients through OpenX and PHP list.',
                        },
                    ],
                education : [ 
                        {
                        date: '08/2016 – now',
                        institution: 'BCSM',
                        diploma: 'Master’s degree in Business Management Consulting',
                        description: 'Design team, front-end developer and web designer (C# MVC, Javascript, HTML5, CSS3). Offshore team management. Project support (issue tracking, quality assurance, stakeholder&#39;s management). Agile development.',
                        },
                        {
                          date: '05/2015 – 12/2015',
                          institution: 'University Carlos III of Madrid',
                          diploma: 'Bachelor\'s degree in Business Management (English)',
                          description: 'Successfully implemented graphic design mockups into HTML5 and CSS in www.todopapas.com and www.canastilladelembarazo.com both responsive as of now. jQuery was used for improved interactions with user, Bootstrap for responsive design, on a cakePHP back-end architecture. Newsletters were sent to clients through OpenX and PHP list.',
                        },
                    ],
                webdev: [
                        {
                            name: 'HTML',
                            description: 'HTML5',
                            level: '95%',
                        },
                        {
                        name: 'CSS',
                            description: 'CSS3',
                            level: '95%'
                        },
                        {
                            name: 'Javascript',
                            description: 'DOM Manipulation, ES6',
                            level: '85%'
                        },
                    ],
            }
        };
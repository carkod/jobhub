import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

import { CVSchema } from './Schemas';

// Compile model from schema
let CVModel = mongoose.model('CVModel', CVSchema );

export default function CVs (app, db) {
    
    app.get('/api/cvs', (req, res) => {
       
       CVModel.find({}, null, {sort: {updatedDate: -1}} ,function(err, content) {
           if (err) throw err;
           
           res.json(content)
       });
    });
        
    app.post('/api/cvs', (req, res) => {
        var r = req.body,
            cv;
        if (r.name) {
            console.log('r.length passed')
            cv = new CVModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name,
            });    
        } else {
            console.log('else')
            cv = new CVModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name,
                persdetails: {
                    name: r.persdetails ? r.persdetails.name : '',    
                    lastname: r.persdetails ? r.persdetails.lastname : '',    
                },
                workExp: r.workExp
            
            });    
        }
        const id = r._id;
        //delete r._id;
        CVModel.update({_id: id}, cv, {upsert: true, setDefaultsOnInsert: true}, (err, cv) => {
          if (err) {
              console.log(err);
              
          } else {
              const savedID = cv._id;
              res.json({ _id: savedID })
          }
        });

    });
    
    app.get('/api/cvs/:_id', (req, res) => {
       console.log(req.params)
       if (req.params._id) {
            CVModel.findById(req.params._id, (err, cv) => {  
                if(!err) {
                    console.log(cv)
                    
                    res.json({ cv })
                } else {
                    
                    res.json({ message: err })
                }
            });
        } else {
            
            let response = {
                message: "Todo could not be deleted deleted",
            };
            
            res.send(response)
            
        }
        
    });
    
    app.delete('/api/cvs/:_id', (req, res) => {
       console.log(req.params)
       if (req.params._id) {
            CVModel.findByIdAndRemove(req.params._id, (err, cv) => {  
                if(!err) {
                    const deletedID = req.params._id;
                    res.json({ _id: deletedID })
                } else {
                    
                    res.json({ message: err })
                }
            });
        } else {
            
            let response = {
                message: "Todo could not be deleted deleted",
            };
            
            res.send(response)
            
        }
        
    });
    
    
}

var obj = {
            _id : ObjectId(),
            slug:'front-end-developer-cv',
            lang: 'en',
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
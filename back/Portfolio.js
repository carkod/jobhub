//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import multer from 'multer';

import { ProjectSchema } from './Schemas';

// Compile model from schema
let ProjectModel = mongoose.model('ProjectModel', ProjectSchema );
const storage = multer.diskStorage({
  destination(req, file, cb) {
    
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})


const upload = multer({ storage: storage })

const fileUpload = upload.single('fieldname')  


export default function Portfolio (app, db) {
    
    app.get('/api/portfolio', (req, res) => {
       
       ProjectModel.find({}, null, {sort: {updatedDate: -1}, new: true} ,function(err, content) {
           if (err) throw err;
           //console.log(content)
           res.json(content)
       });
    });
        
    app.post('/api/portfolio', (req, res) => {
        let r = req.body,
            f = req.file,
            project;
            
            // file upload
            fileUpload(req, res, (err) => {
                if (err) throw err;
                
                if (req.file) {
                    const {path} = req.file;
                    req.file.url = req.protocol + '://' + req.get('host') + '/' + path;
                    res.json(req.file)                    
                }
            })
            
        if (!r._id) {
            // Create New
            project = new ProjectModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name || 'Enter name',
            });    
        } else {
            // Update
            project = new ProjectModel({
                
                _id: '',
                name: '',
                slug: '',
                cats: {
                    position: '',
                    cvLang: '',
                    cvCountry:'',
                },
                image: '',
                description: '',
                documents: []
            });
            
        }
        console.log(project)
        const id = r._id || project._id;
        delete r._id;
        ProjectModel.update({_id: id}, project, {upsert: true }, (err, msg) => {
            
          if (err) {
              console.log(err);
              
          } else {
              
              if (msg.ok) {
                const savedID = id;   
                res.json({ _id: savedID, status: !!msg.ok });
                console.log('changes saved!')  
              } else {
                  res.json({ status: !!msg.ok });
                  console.log('No changes')  
              }
          }
        });

    });
    
    app.get('/api/portfolio/:_id', (req, res) => {
       console.log(req.params)
       if (req.params._id) {
            ProjectModel.findById(req.params._id, (err, project) => {  
                if(!err) {
                    console.log(project)
                    
                    res.json({ project })
                } else {
                    
                    res.json({ message: err })
                }
            });
        } else {
            
            let response = {
                message: "Item could not be deleted deleted",
            };
            
            res.send(response)
            
        }
        
    });
    
    app.delete('/api/portfolio/:_id', (req, res) => {
       console.log(req.params)
       if (req.params._id) {
            ProjectModel.findByIdAndRemove(req.params._id, (err, project) => {  
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
/*
var obj = {
            _id : '',
            slug:'front-end-developer-project',
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
                    photo: 'foto-project.jpg',
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
        };*/
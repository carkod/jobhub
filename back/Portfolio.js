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
           res.json(content)
       });
    });
    
    app.post('/api/portfolio/upload', (req, res) => {
        let f = req.file;
        // file upload
        fileUpload(req, res, (err) => {
            if (err) throw err;
            
            if (req.file) {
                const {path} = req.file;
                req.file.url = req.protocol + '://' + req.get('host') + '/' + path;
                res.json(req.file)                    
            }
        })    
    });
    
    app.get('/api/portfolio/deupload', (req, res) => {
        let fileURL = req.body;
        console.log(fileURL)
    });
    
    
    app.post('/api/portfolio/project', (req, res) => {
        let r = req.body,
            project;
        if (!r._id) {
            // Create New
            project = new ProjectModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name || 'Enter name',
            });    
        } else {
            // Update
            project = new ProjectModel({
                
                _id: r._id,
                name: r.name,
                slug: r.slug,
                cats: {
                    position: r.cats.position,
                    cvLang: r.cats.cvLang,
                    cvCountry: r.cats.cvCountry,
                },
                image: r.image,
                description: r.description,
                documents: r.documents
            });
            
        }
        console.log(project)
        const id = r._id || project._id;
        delete r._id;
        ProjectModel.update({_id: id}, project, {upsert: true }, (err, msg) => {
            
          if (err) {
              throw err;
              
          } else {
              
              if (msg.ok) {
                const savedID = id;   
                res.json({ _id: savedID, status: !!msg.ok });
                //console.log('changes saved!')  
              } else {
                  res.json({ status: !!msg.ok });
                  //console.log('No changes')  
              }
          }
        });

    });
    
    app.get('/api/project/:_id', (req, res) => {
       if (req.params._id) {
            ProjectModel.findById(req.params._id, (err, project) => {  
                if(!err) {
                    throw err;
                } else {
                    res.json({ message: err })
                }
            });
        } else {
            
            let response = {
                message: "Item could not be found",
            };
            
            res.send(response)
            
        }
        
    });
    
    app.delete('/api/project/:_id', (req, res) => {
       //console.log(req.params)
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
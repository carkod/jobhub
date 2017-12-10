//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

import { CVSchema } from './Schemas';

// Compile model from schema
let CVModel = mongoose.model('CVModel', CVSchema );

export default function CVs (app, db) {
    
    app.get('/api/cvs', (req, res) => {
       
       CVModel.find({}, null, {sort: {updatedDate: -1}, new: true} ,function(err, content) {
           if (err) throw err;
           //console.log(content)
           res.json(content)
       });
    });
        
    app.post('/api/cvs', (req, res) => {
        let r = req.body,
            cv;
         
        
            
        if (!r._id) {
            // Create New
            cv = new CVModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name,
            });        
            
        } else {
            // Update
            cv = new CVModel({
                name: r.name,
                summary: r.summary,
                slug: r.slug,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                },
                image: r.image,
                persdetails: r.persdetails,
                workExp: r.workExp,
                educ: r.educ,
                langSkills: r.langSkills,
                webdevSkills: r.webdevSkills,  
                itSkills: r.itSkills,
                other: r.other,
            });
            console.log(r)
        }
        
        const id = r._id || cv._id;
        delete r._id;
        CVModel.update({_id: id}, cv, {upsert: true }, (err, msg) => {
            
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
    
    // Copy action
    app.post('/api/cvs/:_id', (req, res) => {
        let r = req.body,
            cv;
            
        if (req.params._id) {
        
            cv = new CVModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name,
                summary: r.summary,
                slug: r.slug,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                },
                image: r.image,
                persdetails: r.persdetails,
                workExp: r.workExp,
                educ: r.educ,
                langSkills: r.langSkills,
                webdevSkills: r.webdevSkills,  
                itSkills: r.itSkills,
                other: r.other,
            });    
        
        const id = r._id || cv._id;
        delete r._id;
        CVModel.update({_id: id}, cv, {upsert: true }, (err, msg) => {
            
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
        
        } else {
            let response = {
                message: "Todo could not be copied",
            };
            
            res.send(response)
        }
        
    });
    
    app.get('/api/cvs/:_id', (req, res) => {
       if (req.params._id) {
            CVModel.findById(req.params._id, (err, cv) => {  
                if(!err) {
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
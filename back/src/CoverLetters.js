//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

import { CLSchema } from './Schemas';

// Compile model from schema
let CLModel = mongoose.model('CLModel', CLSchema );

export default function CLs (app, db) {
    
    app.get('/api/cls', (req, res) => {
       
       CLModel.find({}, null, {sort: {updatedDate: -1}, new: true} ,function(err, content) {
           if (err) throw err;
           //console.log(content)
           res.json(content)
       });
    });
        
    app.post('/api/cls', (req, res) => {
        var r = req.body,
            cl = new CLModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name || 'Enter name',
            });   

        CLModel.update({_id: r._id}, cl, {upsert: true }, (err, msg) => {
            
          if (err) {
              throw err;
              
          } else {
              
              if (msg.ok) {
                const savedID = id;   
                res.json({ _id: msg.id, status: !!msg.ok });
                //console.log('changes saved!')  
              } else {
                  res.json({ status: !!msg.ok });
                  //console.log('No changes')  
              }
          }
        });

    });

    app.put('/api/cls', (req, res) => {
        let r = req.body,
            // Update
            cl = new CLModel({
                _id: r._id,
                name: r.name,
                pdf: r.pdf,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                },
                image: r.image,
                desc: r.desc,
            });

        CLModel.findByIdAndUpdate(r._id, cl, (err, msg) => {

            if (err) {
                const newError = new Error(err)
                res.json({ status: false, message: newError });
            } else {

                if (msg.ok) {
                    res.status(200).json({ _id: msg.id, status: !!msg.ok });
                    //console.log('changes saved!')  
                } else {
                    res.json({ status: !!msg.ok });
                    //console.log('No changes')  
                }
            }
        });

    });
    
    app.get('/api/cls/:_id', (req, res) => {
       if (req.params._id) {
            CLModel.findById(req.params._id, (err, cv) => {  
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
    
    // Copy action
    app.post('/api/cls/:_id', (req, res) => {
        let r = req.body,
            cl;
            
        if (req.params._id) {
        
            cl = new CLModel({
                _id: mongoose.Types.ObjectId(),
                name: r.name,
                pdf: r.pdf,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                },
                image: r.image,
                desc: r.desc,
            });    
        
        const id = r._id || cl._id;
        delete r._id;
        CLModel.update({_id: id}, cl, {upsert: true }, (err, msg) => {
            
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
    
    app.delete('/api/cls/:_id', (req, res) => {
       if (req.params._id) {
            CLModel.findByIdAndRemove(req.params._id, (err, cv) => {  
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
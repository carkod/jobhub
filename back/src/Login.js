/**
 * @params {string} mongoose - ODCM used
 */

import mongoose from 'mongoose';
import shortid from 'shortid';
import moment from 'moment';
import {UserSchema} from './Schemas';

let UserModel = mongoose.model('HubUsers', UserSchema );

export default function Login (app, db) {
    
    // app.get('/api/cvs', (req, res) => {
       
    //    CVModel.find({}, null, {sort: {updatedDate: -1}, new: true} ,function(err, content) {
    //        if (err) throw err;
    //        //console.log(content)
    //        res.json(content)
    //    });
    // });
        
    app.post('/login', (req, res) => {
        let r = req.body;
        console.log(r)
        
        UserModel.findOne({username: r.username, password: r.password}, (err, user) => {
            if (err) {
                throw err;
                
            } else {
                if (msg.ok) {
                  const savedID = id;   
                  res.json({ _id: savedID, status: !!msg.ok });
                      console.log('login details correct!')  
                } else {
                    res.json({ status: !!msg.ok });
                    console.log('login details are wrong...')  
                }
            }
        })

        
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
                pdf: r.pdf,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry,
                    status: r.cats.status,
                },
                image: r.image,
                persdetails: r.persdetails,
                workExp: workExp,
                educ: educ,
                langSkills: r.langSkills,
                webdevSkills: r.webdevSkills,  
                itSkills: r.itSkills,
                other: r.other,
            });
            
        }
        
        const id = r._id || cv._id;
        delete r._id;
        
        
        
    });
    
    
    
    
}
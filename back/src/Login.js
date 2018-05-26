/**
 * @params {string} mongoose - ODCM used
 */

import mongoose from 'mongoose';
import shortid from 'shortid';
import moment from 'moment';
import {UserSchema} from './Schemas';

let UserModel = mongoose.model('HubUsers', UserSchema );

export default function Login (app, db) {
    
    // app.get('/api/login', (req, res) => {
       
    //     UserModel.findOne({username: r.username, password: r.password}, (err, user) => {
    //         if (err) {
    //             throw err;
                
    //         } else {
    //             if (msg.ok) {
    //               const savedID = id;   
    //               res.json({ _id: savedID, status: !!msg.ok });
    //                   console.log('login details correct!')  
    //             } else {
    //                 res.json({ status: !!msg.ok });
    //                 console.log('login details are wrong...')  
    //             }
    //         }
    //     })
    // });
    
    app.post('/api/login', (req, res) => {
        let r = req.body;
        
        // console.log(UserModel)
        UserModel.findOne({username: r.username, password: r.password}, (err, user) => {
            if (err) 
                throw err;

            if (user === null) {
                // Not found user (either user or pass is wrong)
                const notfound = new Error('Either user or pass is wrong');
                res.json({_id: "error", status: false, error: notfound})
            } else {
                // Found user with same username and password
                const savedID = user._id;   
                res.json({ _id: savedID, status: true });
            }
        })

    });
}
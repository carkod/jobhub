/**
 * @params {string} mongoose - ODCM used
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from './Schemas';

let UserModel = mongoose.model('HubUsers', UserSchema);

export default function Login(app, db) {
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
        UserModel.findOne({ email: r.email }, (err, user) => {
            if (err)
                throw err;

            if (user === null) {
                // Not found user (either user or pass is wrong)
                const notfound = new Error('Either user or pass is wrong');
                res.json({ _id: null, status: false, error: notfound })
            } else {
                console.log('user found', user);
                bcrypt.compare(r.password, user.password, function (err, same) {
                    if (err) {
                        console.log('errored pass', err);
                        //   callback(err);
                    } else {
                        const savedID = user._id;
                        const secret = bcrypt.hash(r.password, 10);
                        const token = jwt.sign({email: r.email}, r.password, { expiresIn: '10h' });
                        console.log('correct pass', token);
                        res.status(200).cookie('hubToken', token, { httpOnly: true }).json({ _id: savedID, status: true, token: token })

                        //   callback(err, same);

                    }
                });
                // Found user with same username and password

            }
        })

    });
}
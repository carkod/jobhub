/**
 * @params {string} mongoose - ODCM used
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserSchema } from './Schemas';
import dotenv from 'dotenv';

dotenv.config();

let UserModel = mongoose.model('HubUsers', UserSchema);

export default function Login(app, db) {

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
				bcrypt.compare(r.password, user.password, function (err, same) {
					if (err)
						throw err;
					if (same) {
						const savedID = user._id;
						const secret = process.env.JWT_SECRET
						const token = jwt.sign({ email: r.email }, secret, { expiresIn: '10h' });
						res.status(200).json({ _id: savedID, status: true, token: token, message: 'Login successful!' })

						//   callback(err, same);
					} else {
						res.status(400).json({ _id: user._id, status: false, message: 'Login credentials are not correct.' })
					}
				});
				// Found user with same username and password

			}
		})

	});
}
//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { CategoriesSchema } from './Schemas';
import slug from 'slug';
import shortid from 'shortid';

// Compile model from schema
let cats = mongoose.model('categories', CategoriesSchema );

export default function Categories (app, db) {
    
    app.get('/api/cats', (req, res) => {
       
       cats.find({} ,function(err, content) {
           if (err) throw err;
           //console.log(content)
           res.json(content)
       });
    });
        
    
    
    
}
//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { CategoriesSchema } from './Schemas';

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
    
    
    
    app.post('/api/cats', (req, res) => {
        const r = req.body;
        const id = r._id;
        const item = new cats({
            _id: r._id,
            title: r.title,
            label: r.label,
            singLabel: r.singLabel,
            children: r.children,
        });
        
        cats.updateOne({_id: id}, item, (err, msg) => {
            if (err) throw err;
            if (msg.ok > 0) {
                res.json({ status: !!msg.ok, message: `Categories Update many successful! Updated entriees: ${msg.n}` });
            } else {
                res.json({ error: !!msg.ok, message: "Failed to Update Many" });
            }
        });
    });
    
}
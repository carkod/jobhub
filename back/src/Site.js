import mongoose from 'mongoose';
import { SiteSchema } from './Schemas';

// Compile model from schema
let SiteModel = mongoose.model('site', SiteSchema);

export default function Categories (app, db) {
    
    app.get('/api/site', (req, res) => {
       
       SiteModel.find({} ,function(err, content) {
           if (err) throw err;
           res.json(content)
       });
    });
    
    
    
    app.put('/api/site/:view', (req, res) => {
        const r = req.body;
        const view = req.params.view
        const id = r._id;
        const item = new SiteModel({
          view: view,
          content: r.content
          
        });
        
        SiteModel.updateOne({_id: id}, item, (err, msg) => {
            if (err) throw err;
            if (msg.ok > 0) {
                res.json({ status: !!msg.ok, message: `Update of ${view} was successful!` });
            } else {
                res.json({ error: !!msg.ok, message: `Failed to Update ${view}` });
            }
        });
    });
    
}
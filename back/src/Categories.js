//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { CategoriesSchema } from './Schemas';
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
    
    
    
    app.post('/api/cats', (req, res) => {
        let r = req.body,
            item,
            slugger;
        /*// TODO if slug exists change it add "name-1"
        // if slug number exists, increment it "name-2"
        // if slug does not exist, create normal slug (below)
        
        slugger = slug(r.title.toLowerCase());
        cats.find({slug: slugger}, (err, doc) => {
            if (!err) {
                return slugger = slugger + '-' + shortid.generate();
            } else {
                console.log('slug doesn\'t exist')
            }
            
        });
        
        if (!r._id) {
            // Create New
            
            item = new cats({
                _id: mongoose.Types.ObjectId(),
                title: r.title,
                slug:slugger,
            });
            
        } else {
            // Update
            item = new cats({
                title: r.title,
                label: r.label,
                slug: slugger,
                singLabel: r.singLabel,
                children: r.children,
            });
            
        }
        
        const id = r._id || item._id;
        delete r._id;
        
        
        cats.update({_id: id}, item, {upsert: true }, (err, msg) => {
          if (err) {
              throw err;
              
          } else {
              if (msg.ok) {
                const savedID = id;   
                res.json({ _id: savedID, status: !!msg.ok });
                console.log('changes saved!')  
              } else {
                  res.json({ status: !!msg.ok });
                  console.log('No changes')  
              }
          }
        });*/

    });
    
}
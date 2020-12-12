//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { CategoriesSchema } from './Schemas';

// Compile model from schema
let cats = mongoose.model('categories', CategoriesSchema );

const updateCategories = (id, item, res) => {
    cats.update({_id: id}, item, {multi: true},(err, msg) => {
      if (err) {
          throw err;
          
      } else {
          if (msg.ok) {
            const savedID = id;   
            console.log('changes saved!')  
            res.json({ _id: savedID, status: !!msg.ok });
          } 
      }
    });
}

export default function Categories (app, db) {
    
    app.get('/api/cats', (req, res) => {
       
       cats.find({} ,function(err, content) {
           if (err) throw err;
           //console.log(content)
           res.json(content)
       });
    });
    
    
    
    app.post('/api/cats', (req, res) => {
        let r = req.body.cats,
            item,
            slugger;
            
        r.map((el,i) => {
            let id = el._id;
            console.log(el)
            item = new cats({
                _id: el._id,
                title: el.title,
                label: el.label,
                singLabel: el.singLabel,
                children: el.children,
            });
            
            cats.updateMany({_id: id}, item, (err, msg) => {
              if (err) throw err;
              console.log(msg)
              /*const message = {state: 'saved'};
              res.write(message)*/
            });
        })
    });
    
}
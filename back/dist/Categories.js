'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Categories;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Schemas = require('./Schemas');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Compile model from schema
var cats = _mongoose2.default.model('categories', _Schemas.CategoriesSchema); //import { ObjectId } from 'mongodb';
function Categories(app, db) {

    app.get('/api/cats', function (req, res) {

        cats.find({}, function (err, content) {
            if (err) throw err;
            //console.log(content)
            res.json(content);
        });
    });

    app.post('/api/cats', function (req, res) {
        var r = req.body,
            item = void 0,
            slugger = void 0;
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
import mongoose from 'mongoose';
import slug from 'slug';

const Schema = mongoose.Schema;

var print = console.log.bind(console, '>')
 
//print(slug('Front-end developer', {lowercase: true}).toLowerCase())

// CV
const CVSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String },
    summary: { type: String },
    slug: { type: String, slug: "name", unique: true },
    cats: {
        position: { type: String },
        locale: { type: String },
        cvCountry: { type: String },
        status: { type: String },
    },
    persdetails: { type: Schema.Types.Mixed },
    workExp: { type: Schema.Types.Mixed },
    educ: { type: Schema.Types.Mixed },
    langSkills: { type: Schema.Types.Mixed },
    webdevSkills: { type: Schema.Types.Mixed },  
    itSkills: { type: Schema.Types.Mixed },
    other: { type: Schema.Types.Mixed },
    
},{timestamps: true}, {strict: false} );

// Cover Letters
const CLSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String },
    slug: { type: String, lowercase: true, trim: true },
    cats: {
        position: { type: String },
        locale: { type: String },
        cvCountry: { type: String },
    },
    image: { type: String },
    desc: { type: Schema.Types.Mixed },
    other: { type: Schema.Types.Mixed },
    
},{timestamps: true}, {strict: false} );

// Projects
const ProjectSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String },
    slug: { type: String, lowercase: true, trim: true },
    cats: {
        position: { type: String },
        locale: { type: String },
        cvCountry: { type: String },
    },
    image: { type: String },
    desc: { type: Schema.Types.Mixed },
    documents: [],
    links: [],
    other: { type: Schema.Types.Mixed },
    
},{timestamps: true}, {strict: false} );


const CategoriesSchema = new Schema({},{timestamps: true}, {strict: false} );


// CVSchema.pre('update', function(next){
//     const slugger = slug(this._update.$set.name.toLowerCase());
//     // this._findOne({id: '5a2b3658c54dd20bd20ee3f9'},function(err, doc) {
//     //     console.log(doc)
//     //     // if (err) {
//     //     //     this._update.$set.slug = slugger;
//     //     // } else {
//     //     //     console.log('slug already exists')
//     //     // }
        
//     // });
//     //next(err, doc);
// });

export { CVSchema, CLSchema, ProjectSchema, CategoriesSchema };
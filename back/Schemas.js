import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// CV
const CVSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String },
    slug: { type: String, lowercase: true, trim: true },
    cats: {
        position: { type: String },
        cvLang: { type: String },
        cvCountry: { type: String },
    },
    persdetails: { 
        name: { type: String },
        lastname: { type: String },
    },
    
    workExp: { type: Schema.Types.Mixed },
    educ: { type: Schema.Types.Mixed },
    langSkills: { type: Schema.Types.Mixed },
    webdevSkills: { type: Schema.Types.Mixed },  
    itSkills: { type: Schema.Types.Mixed },
    other: { type: Schema.Types.Mixed },
    
},{timestamps: true}, {strict: false} );


// Projects
const ProjectSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String },
    slug: { type: String, lowercase: true, trim: true },
    cats: {
        position: { type: String },
        cvLang: { type: String },
        cvCountry: { type: String },
    },
    image: { type: String },
    desc: { type: Schema.Types.Mixed },
    documents: [],
    links: [],
    other: { type: Schema.Types.Mixed },
    
},{timestamps: true}, {strict: false} );

/*
CVSchema.pre('update', function(next){
    
  const now = new Date();
  this.updatedDate = now;
  if ( !this.createdDate ) {
    this.createdDate = now;
  }
  next();
  console.log(CVSchema.tree)
}); */

export { CVSchema, ProjectSchema };
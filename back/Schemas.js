import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// CV
const CVSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String },
    slug: { type: String, lowercase: true, trim: true },
    updatedDate: { type: Date },
    createdDate: { type: Date },
    cats: {
        position: { type: String },
        cvLang: { type: String },
        cvCountry: { type: String },
    },
    persdetails: { 
        name: { type: String },
        lastname: { type: String },
    },
    
    workRepeat: { type: Schema.Types.Mixed },
    educRepeat: { type: Schema.Types.Mixed },
    skills: { type: Schema.Types.Mixed },
    projects: { type: Schema.Types.Mixed },
    
}, {strict: false}, { timestamps: true });

CVSchema.pre('save', function(next){
  const now = new Date();
  this.updatedDate = now;
  if ( !this.createdDate ) {
    this.createdDate = now;
  }
  next();
});

export { CVSchema };
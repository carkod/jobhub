import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import { stringLiteral } from '@babel/types';

mongoose.plugin(slug);
const Schema = mongoose.Schema;

// Primitive Schemas
const ContactsSchema = new Schema({
    contactId: mongoose.Schema.ObjectId,
    contactName: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
}, { timestamps: true }, { strict: false })

const StagesSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    order: { type: Number },
    completed: { type: Boolean },
    action: { type: String },
    dept: { type: String },
    startDate: { type: String },
    endDate: { type: String },
}, { timestamps: true }, { strict: false })


// CV
const CVSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String },
    summary: { type: String },
    slug: { type: String, slug: "name", lowercase: true, unique: true },
    navName: { type: String },
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

}, { timestamps: true }, { strict: false });

// Cover Letters
const CLSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String },
    slug: { type: String, slug: "name", lowercase: true, unique: true },
    pdf: { type: Array },
    cats: {
        position: { type: String },
        locale: { type: String },
        cvCountry: { type: String },
    },
    image: { type: String },
    desc: { type: Schema.Types.Mixed },
    other: { type: Schema.Types.Mixed },

}, { timestamps: true }, { strict: false });

// Projects
const ProjectSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String },
    slug: { type: String, slug: "name", lowercase: true, unique: true },
    cats: {
        status: { type: String },
        position: { type: String },
        locale: { type: String },
        cvCountry: { type: String },
    },
    image: { type: Object },
    desc: { type: Schema.Types.Mixed },
    documents: [],
    links: [],
    other: { type: Schema.Types.Mixed },

}, { timestamps: true }, { strict: false });


const CategoriesSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    title: { type: String },
    label: { type: String },
    singLabel: { type: String },
    children: [],
}, { timestamps: true }, { strict: false });

const UserSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    username: { type: String, lowercase: true, required: true },
    password: { type: String, lowercase: true, required: true },
    email: { type: String },
    updatedAt: { type: Date, default: Date.now },
    role: []
}, { timestamps: true }, { strict: false });

// Applications
const ApplicationSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    company: { type: String, required: true },
    status: {
        value: { type: Number, required: true },
        text: { type: String, required: true }
    },
    role: { type: String },
    salary: { type: String },
    applicationUrl: { type: String },
    location: { type: String },
    contacts: [ContactsSchema],
    description: { type: Schema.Types.Mixed },
    files: { type: Array },
    stages: [StagesSchema],
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true }, { strict: false });

ApplicationSchema.pre('save', function (next) {
    if (this.contacts.length === 0) {

        this.contacts.push({
            contactId: '',
            contactName: '',
            contactPhone: ''
        })
    }
    next();
});

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

export { CVSchema, CLSchema, ProjectSchema, CategoriesSchema, UserSchema, ApplicationSchema, StagesSchema, ContactsSchema };
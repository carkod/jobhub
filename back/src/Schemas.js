import { Schema, plugin } from "mongoose";
import slug from "mongoose-slug-updater";

plugin(slug);

// Primitive Schemas
const ContactsSchema = new Schema(
  {
    contactId: Schema.ObjectId,
    contactName: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
  },
  { timestamps: true },
  { strict: false }
);

const StagesSchema = new Schema(
  {
    _id: Schema.ObjectId,
    order: { type: Number },
    completed: { type: Boolean },
    action: { type: String },
    dept: { type: String },
    startDate: { type: String },
    endDate: { type: String },
  },
  { timestamps: true },
  { strict: false }
);

// CV
const CVSchema = new Schema(
  {
    _id: Schema.ObjectId,
    name: { type: String },
    summary: { type: String },
    slug: { type: String, slug: "name", unique: true },
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
  },
  { timestamps: true },
  { strict: false }
);

// Cover Letters
const CLSchema = new Schema(
  {
    _id: Schema.ObjectId,
    name: { type: String },
    slug: { type: String, slug: "name", lowercase: true, unique: true },
    navName: { type: String },
    cats: {
      position: { type: String },
      locale: { type: String },
      cvCountry: { type: String },
      status: { type: String },
    },
    image: { type: String },
    desc: { type: Schema.Types.Mixed },
    other: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
  { strict: false }
);

// Projects
const ProjectSchema = new Schema(
  {
    _id: Schema.ObjectId,
    name: { type: String },
    slug: { type: String, slug: "name", lowercase: true, unique: true },
    cats: {
      status: { type: String },
      position: { type: String },
      locale: { type: String },
      cvCountry: { type: String },
      status: { type: String },
    },
    image: { type: Object },
    desc: { type: Schema.Types.Mixed },
    documents: [],
    links: [],
    other: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
  { strict: false }
);

const CategoryChildSchema = new Schema({
  key: Schema.ObjectId,
  value: { type: String, required: true, lowercase: true, unique: true },
  text: { type: String },
  rank: { type: String || Number },
});

const CategoriesSchema = new Schema(
  {
    _id: Schema.ObjectId,
    title: { type: String },
    label: { type: String, required: true, unique: true },
    singLabel: { type: String },
    children: [CategoryChildSchema],
  },
  { timestamps: true },
  { strict: false }
);

const UserSchema = new Schema(
  {
    _id: Schema.ObjectId,
    username: { type: String, lowercase: true, required: true },
    password: { type: String, lowercase: true, required: true },
    email: { type: String },
    updatedAt: { type: Date, default: Date.now },
    role: [],
  },
  { timestamps: true },
  { strict: false }
);

// Applications
/**
 * 
 * 0 - applied
 * 1 - in progress
 * 2 - rejected
 * 3 - success
 */
const ApplicationSchema = new Schema(
  {
    _id: Schema.ObjectId,
    company: { type: String, required: true, unique: true },
    status: {
      value: { type: Number, enum: [0, 1, 2, 3], default: 0 },
      text: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["applied", "in progress", "rejected", "success"],
        default: "applied",
      },
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
    emailId: { type: String | undefined }, // If data comes from email
  },
  { timestamps: true },
  { strict: false }
);

ApplicationSchema.pre("save", function (next) {
  switch (this.status.text) {
    case "applied":
      this.status.value = 0;
      break;
    
    case "in progress":
      this.status.value = 1;
      break;
    
    case "rejected":
      this.status.value = 2;
      break;
    
    case "success":
      this.status.value = 3;
      break;
  
    default:
      this.status.value = 0;
      break;
  }
  if (this.contacts.length === 0) {
    this.contacts.push({
      contactId: "",
      contactName: "",
      contactPhone: "",
    });
  }
  next();
});

const ServicesSchema = new Schema({
  publishedDate: { type: Schema.Types.Mixed },
  url: { type: String },
});

// Blog
const BlogSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, slug: "name", index: true },
    category: { type: String },
    status: { type: String },
    tags: { type: Array },
    linkedin: { type: ServicesSchema },
    medium: { type: ServicesSchema },
    content: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
  { strict: false }
);

export {
  CVSchema,
  CLSchema,
  ProjectSchema,
  CategoriesSchema,
  UserSchema,
  ApplicationSchema,
  StagesSchema,
  ContactsSchema,
  BlogSchema,
};

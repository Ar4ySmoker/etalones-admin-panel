import { Country } from "country-state-city";
import mongoose from "mongoose";






const managerShema = new mongoose.Schema({
  name:{
    type: String,
  },
  phone:{
    type:String,
    unique: true,
  },
  candidates:[{
    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  }],
})

const partnerShema = new mongoose.Schema({
  name:{
type: String,
  },
  phone:{
type: String,
unique:true
  },
  email:{
type: String,
unique: true
  },
  site:{
type: String,
  },
  companyName:{
type: String,
unique: true
  },
  numberDE:{
type: Number,
unique: true
  },
  vacancies:[{
name: String,
profession: String,
numberPeople: Number,
price: String,
country:String,
city:String,
  }],
  manager:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
    required: false
  },
  candidates:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Candidate',
    required: false
  }],
  contract: {
    type: {
      type: String,
      required: false
    },
    sum: {
      type: String,
      required: false
    }},
  status:{
    type: String
   },
   drivePermis:{
    type: String,
      },
  leaving:{
    type: Date,
  },
  workHours:{
    type: String,
  },
  langue:{
    name: String,
    level: String,
   },
  comment:{
type: String,
  }

},
{ timestamps: true })

const candidateSchema = new mongoose.Schema({
  name: {
type: String,
  },
  phone:{
    type: String,
    required: true,
    unique: true,
  },
  age:{
    type: String,
  },
  citizenship:{
type: String,
  },

  leaving:{
    type: Date,
  },
  drivePermis:{
type: String,
  },
  cardNumber:{
type: String,
  },
  workHours:{
    type: String,
  },
  locations: {
    type: String,
    
  },
  professions: [{
    name:  String,
    experience: String,
    
  }],
  documents: [{ 
    docType: String,
    dateExp: String,
    numberDoc: String
  }],
  langue:{
   name: String,
   level: String,
  },
  manager:{
type: mongoose.Schema.Types.ObjectId,
ref: 'Manager',
required: false
  },
  status:{
   type: String
  },
  comment:[{
    type: String
  }],
  commentMng: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommentMng'
  }]
  

},
{ timestamps: true }
)
const commentMngSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true
  }
}, { timestamps: true }); 
const langueShema = new mongoose.Schema({
  type:String
})
const locationSchema = new mongoose.Schema({
  name: {
type: String,
unique: true,
  }
}
)
const professionSchema = new mongoose.Schema({
  name: {
type: String,
unique: true,
  },
  experience: {
    type: String
  }
}
)
const dodumentShema = new mongoose.Schema({
  name:{
    type: String,
    unique: true,
  },
  dateExp:{
    type: String,
  
  },
  numberDoc: {
    type: String,
   
  }
})

const statusShema = new mongoose.Schema({
  name:{
    type: String
  }
})
export const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);
export const Profession = mongoose.models.Profession || mongoose.model("Profession", professionSchema);
export const Document = mongoose.models.Document || mongoose.model("Document", dodumentShema);
export const Langue = mongoose.models.Langue || mongoose.model("Langue", langueShema)
export const Status = mongoose.models.Status || mongoose.model("Status", statusShema)
export const Candidate = mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);
export const Manager = mongoose.models.Manager || mongoose.model("Manager", managerShema)
export const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerShema)
export const CommentMng = mongoose.models.CommentMng || mongoose.model("CommentMng", commentMngSchema)
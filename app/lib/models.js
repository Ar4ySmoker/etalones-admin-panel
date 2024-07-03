import mongoose from "mongoose";
import { type } from "os";


const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
      name: {
          type: String,
          required: true,
      },
      email: {
          type: String,
          unique: true, // Уникальный индекс для email
          required: true,
      },
      password: {
          type: String,
          required: false,
      },
  },
  { timestamps: true }
);

const managerShema = new mongoose.Schema({
  image: {
    name: String,
    data: Buffer,
    contentType: String
},
  name:{
    type: String,
  },
  phone:{
    type:String,
    unique: true,
  },
  telegram:{
type:String
  },
  viber:{
  type:String
      },
  whatsapp:{
 type:String
          },
  candidates:[{
    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  }],
})

const partnerShema = new mongoose.Schema({
  professions: [{
    name:  String,
    experience: String,    
  }],
  name:{
type: String,
  },
  phone:{
type: String,
unique:true,
sparse: true,
 },
  email:{
type: String,
unique: true,
sparse: true,
  },
  site:{
type: String
  },
  companyName:{
type: String,
unique: true
  },
  rentPrice:{
type: String
  },
  avans:{
    type:String
  },
  workwear:{
    type: String
  },
  workHours:{
    type: String
  },
  numberDE:{
type: String,
unique: true,
required: false
  },
  location:{
    type: String,
  },
  manager:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager'
  },
  candidates:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Candidate'
  }],
  contract:{
typeC: String,
sum: String,
  },
  documents:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  status:{
    type: String
  },
  drivePermis:{
    type: String,
      },
  leaving:{
    type: Date,
      },
  langue:{
     name: String,
     level: String,
       },
  comment:{
type: String,
  },
  brigade:[{
    mainBrigade: String,
    name: String,
    documents: [{ 
      docType: String,
      dateOfIssue: String,
      dateExp: String,
      numberDoc: String
    }],
    professions: [{
      name:  String,
      experience: String,
    }],
    cardNumber:{
      type: String,
        },
  }]

},
{ timestamps: true })

const candidateSchema = new mongoose.Schema({
  source:{
type: String
  },
  time:{
    type: String,  
    },
    currentPage:{
  type: String,
    },
  name: {
type: String,
  },
  partners:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner'
  },
  phone:{
    type: String,
    sparse: true,
    unique: true,
  },
  additionalPhones:[{
type: String,
unique: true,

  }],
  age:{
    type: Date,
  },
  ageNum:{
    type: String, 
  },
  citizenship:{
type: String,
  },

  leaving:{
    type: Date,
  },
  dateArrival:{
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
    dateOfIssue: String,
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
  }],
  statusFromPartner:{
    status: String,
    who: String,
    from: String,
    to: String,
    dismissalDate: String
  },
  invoice:[{
    hours: Number,
    bet: Number,
    with: Date,
    by: Date,
  }],
  brigade:[{
    mainBrigade: String,
    name: String,
    documents: [{ 
      docType: String,
      dateOfIssue: String,
      dateExp: String,
      numberDoc: String
    }],
    professions: [{
      name:  String,
      experience: String,
    }],
    cardNumber:{
      type: String,
        },
  }],
  invoices:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoices',
  }]

},
{ timestamps: true }
)

candidateSchema.pre('save', async function(next) {
  if (this.isModified('partners') || this.isNew) {
    const Partner = mongoose.model('Partner');
    const Candidate = mongoose.model('Candidate');

    if (!this.isNew) {
      const oldCandidate = await Candidate.findById(this._id).lean();
      if (oldCandidate && oldCandidate.partners && oldCandidate.partners.toString() !== this.partners.toString()) {
        await Partner.findByIdAndUpdate(oldCandidate.partners, { $pull: { candidates: this._id } });
      }
    }

    if (this.partners) {
      await Partner.findByIdAndUpdate(this.partners, { $addToSet: { candidates: this._id } });
    }
  }
  next();
});



const commentMngSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true
  }
}, { timestamps: true }); 

const professionSchema = new mongoose.Schema({
  name: {
type: String,
unique: true,
  },
  category: {
    type: String,
  },
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
const invoicesShema = new mongoose.Schema({
  invoiceNumber: {
    type: String
  },
  bet: {
    type: Number
  },
  hours: {
    type: Number
  },
  avans: {
    type: Number
  },
  homePrice: {
    type: Number
  },
  fines: {
    sum: Number,
    reason: String
  },
  awards: {
    sum: Number,
    reason: String
  },
  dateFrom: {
    type: Date
  },
  dateTo: {
    type: Date
  },
  status: {
    type: Boolean
  },
  partners: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partners'
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager'
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  },
  totalAmount: {
    type: Number
  }
}, { timestamps: true });

const vacancyShema = new mongoose.Schema({
  title:{
    type: String
  },
  town:{
    type: String
  },
  workHours:{
    type: String
  },
  workPrice:{
    type: String
  },
  image: {
    name: String,
    data: Buffer,
    contentType: String
}
})
const vacancyOnServerShema = new mongoose.Schema({
  image: {
    name: String,
    data: Buffer,
    contentType: String
},
  title:{
  type: String
},
  roof_type:{
  type: String
},
  location:{
  type:String
},
  auto:{
type: String
},
  positions_available:{
  type:String
},
  salary:{
  type:String
},
  homePrice:{
  type:String
},
  home_descr:{
  type:String
},
  work_descr:{
  type:String
},
  grafik:{
  type:String
},
  documents:{
  type:String
},
  manager:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager'},
category:{
type: String
}

})

export const User =  mongoose.models.User || mongoose.model("User", userSchema);
export const VacancyOnServer = mongoose.models.VacancyOnServer || mongoose.model("VacancyOnServer", vacancyOnServerShema)
export const Vacancy = mongoose.models.Vacancy || mongoose.model("Vacancy", vacancyShema)
export const Invoices = mongoose.models.Invoices || mongoose.model("Invoices", invoicesShema);
export const Profession = mongoose.models.Profession || mongoose.model("Profession", professionSchema);
export const Document = mongoose.models.Document || mongoose.model("Document", dodumentShema);
export const Status = mongoose.models.Status || mongoose.model("Status", statusShema)
export const Candidate = mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);
export const Manager = mongoose.models.Manager || mongoose.model("Manager", managerShema)
export const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerShema)
export const CommentMng = mongoose.models.CommentMng || mongoose.model("CommentMng", commentMngSchema)
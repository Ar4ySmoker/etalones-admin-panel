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
required: false
  },
  email:{
type: String,
unique: true,
required: false
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
  name: {
type: String,
  },
  partner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner'
  },
  phone:{
    type: String,
    required: true,
    unique: true,
  },
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
    from: Date,
    to: Date,
    dismissalDate: Date
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
  }]

},
{ timestamps: true }
)


// Хук для обновления партнёра перед сохранением кандидата
candidateSchema.pre('save', async function(next) {
  if (this.isModified('partner') || this.isNew) {
    const Partner = mongoose.model('Partner');
    const Candidate = mongoose.model('Candidate');
    
    // Удаляем кандидата из старого партнёра, если он существует и изменился
    if (!this.isNew) {
      const oldCandidate = await Candidate.findById(this._id);
      if (oldCandidate.partner && oldCandidate.partner.toString() !== this.partner.toString()) {
        await Partner.findByIdAndUpdate(oldCandidate.partner, {
          $pull: { candidates: this._id }
        });
      }
    }

    // Добавляем кандидата к новому партнёру
    await Partner.findByIdAndUpdate(this.partner, {
      $addToSet: { candidates: this._id }
    });
  }
  next();
});

// Хук для обновления партнёра после удаления кандидата
candidateSchema.post('remove', async function(doc) {
  const Partner = mongoose.model('Partner');
  if (doc.partner) {
    await Partner.findByIdAndUpdate(doc.partner, {
      $pull: { candidates: doc._id }
    });
  }
});

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
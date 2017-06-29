import Mongoose from 'mongoose';

const mongo = Mongoose.connect('mongodb://localhost/cumulus');

const ClaimSchema = Mongoose.Schema({
  risk: String,
  folio: String,
  number: String,
  adjuster: String,
  movement: String,
  birthplace: String,
  issueDate: String,
  occupation: String,
  initialDate: String,
  insuredName: String,
  sinisterDate: String,
  admissionDate: String,
  departureDate: String,
  institutionName: String,
  institutionAddress: String,
});

const InsuranceSchema = Mongoose.Schema({
  file: String,
  name: String,
  plan: String,
  type: String,
  taxed: Boolean,
  number: String,
  claim: ClaimSchema,
});

const PatientSchema = Mongoose.Schema({
  identityNumber: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  phoneAlt: String,
  // dateOfBirth: Date,
  gender: String,
  address: String,
  address2: String,
  zipcode: Number,
  city: String,
  state: String,
  country: String,
  insurance: InsuranceSchema
});

const Patient = Mongoose.model('patients', PatientSchema);

export { Patient };

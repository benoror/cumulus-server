import Mongoose from 'mongoose';
import versioning from './mongoose-plugins/versioning';

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
  identityNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  phoneAlt: String,
  // dateOfBirth: Date,
  gender: String,
  address: String,
  address2: String,
  zipcode: String,
  city: String,
  state: String,
  country: String,
  insurance: InsuranceSchema
}, {
  timestamps: true
});

PatientSchema.plugin(versioning);

const Patient = Mongoose.model('patients', PatientSchema);

export { Patient };

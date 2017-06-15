import Mongoose from 'mongoose';

const mongo = Mongoose.connect('mongodb://localhost/cumulus');

const PatientSchema = Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
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
  // insurance: Insurance
});

const Patient = Mongoose.model('patients', PatientSchema);

export { Patient };

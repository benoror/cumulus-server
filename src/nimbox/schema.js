import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Insurance {
  file: String
  name: String
  plan: String
  type: String
  taxed: Boolean
  number: String
  claimRisk: String
  claimFolio: String
  claimNumber: String
  claimAdjuster: String
  claimMovement: String
  claimBirthplace: String
  claimIssueDate: String
  claimOccupation: String
  claimInitialDate: String
  claimInsuredName: String
  claimSinisterDate: String
  claimAdmissionDate: String
  claimDepartureDate: String
  claimInstitutionName: String
  claimInstitutionAddress: String
}

type Patient {
  _id: ID!
  identityNumber: String!
  firstName: String!
  lastName: String!
  email: String!
  phone: String
  phoneAlt: String
  # dateOfBirth: Date
  gender: String
  address: String
  address2: String
  zipcode: Int
  city: String
  state: String
  country: String
  insuranceAttributes: Insurance
}

# type Event {
# }

type Query {
  patients: [Patient]
}

schema {
  query: Query
}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  allowUndefinedInResolve: true,
  printErrors: true,
});

export default schema;


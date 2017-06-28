import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Claim {
  risk: String
  folio: String
  number: String
  adjuster: String
  movement: String
  birthplace: String
  issueDate: String
  occupation: String
  initialDate: String
  insuredName: String
  sinisterDate: String
  admissionDate: String
  departureDate: String
  institutionName: String
  institutionAddress: String
}

type Insurance {
  file: String
  name: String
  plan: String
  type: String
  taxed: Boolean
  number: String
  claim: Claim
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
  insurance: Insurance
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
  allowUndefinedInResolve: false,
  printErrors: true,
});

export default schema;

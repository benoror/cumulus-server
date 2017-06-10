import { makeExecutableSchema, addMockFunctionsToSchema, } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
type Patient {
  id: ID!
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
}

type Query {
  patients: [Patient]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema });

export { schema };

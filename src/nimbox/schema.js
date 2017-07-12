import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

import Patient from './types/patient';
import Insurance from './types/insurance';

const typeDefs = [`
schema {
  query: Query
  mutation: Mutation
}

type Query {
  patients(
    identity_number: String
  ): [Patient]
}

type Patient {
  _id: ID!
  _revision: Int!
  ${Patient}
  person_attributes: PersonAttributes
}

type PersonAttributes {
  identity_number: String
  insurance_attributes: InsuranceAttributes
}

type InsuranceAttributes {
  ${Insurance}
}

type Mutation {
  upsertPatient (
    ${Patient}
    insuranceAttributes: InsuranceInput
  ): Patient
}

input InsuranceInput {
  ${Insurance}
}
`];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  allowUndefinedInResolve: true,
  printErrors: true,
});

export default schema;


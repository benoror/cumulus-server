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
    identityNumber: String
  ): [Patient]
}

type Patient {
  _id: ID!
  ${Patient}
  insuranceAttributes: Insurance
}

type Insurance {
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


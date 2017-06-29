import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

import Patient from './types/patient';
import Insurance from './types/insurance';
import Claim from './types/claim';

const typeDefs = [`
schema {
  query: Query
  mutation: Mutation
}

type Query {
  patients: [Patient]
}

type Patient {
  _id: ID!
  ${Patient}
  insurance: Insurance
}

type Insurance {
  ${Insurance}
  claim: Claim
}

type Claim {
  ${Claim}
}

type Mutation {
  upsertPatient (
    ${Patient}
    insurance: InsuranceInput
  ): Patient
}

input InsuranceInput {
  ${Insurance}
  claim: ClaimInput
}

input ClaimInput {
  ${Claim}
}
`];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  allowUndefinedInResolve: true,
  printErrors: true,
});

export default schema;

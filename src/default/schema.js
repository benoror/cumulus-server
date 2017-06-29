import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

import Patient from './types/patient';
import Insurance from './types/insurance';
import Claim from './types/claim';
import AddPatient from './types/add-patient';

const typeDefs = [`
schema {
  query: Query
  mutation: Mutation
}

type Query {
  patients: [Patient]
}

type Mutation {
  ${AddPatient}
}

type Patient {
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
`];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  allowUndefinedInResolve: true,
  printErrors: true,
});

export default schema;

import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

import Patient from './types/patient';
import Insurance from './types/insurance';

const typeDefs = [`
schema {
  query: Query
}

type Query {
  patients: [Patient]
}

type Patient {
  ${Patient}
  insuranceAttributes: Insurance
}

type Insurance {
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


import { makeExecutableSchema, addMockFunctionsToSchema, } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
type Patient {
  id: ID!
  firstName: String
}

type Query {
  patients: [Patient]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema });

export { schema };

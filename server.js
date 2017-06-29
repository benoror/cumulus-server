import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress, } from 'graphql-server-express';
import defaultSchema from './src/default/schema';
import nimboxSchema from './src/nimbox/schema';

import express from 'express';

const PORT = 4000;

const server = express();

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: defaultSchema,
  context: {},
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.use('/nimbox/graphql', bodyParser.json(), graphqlExpress({
  schema: nimboxSchema,
  context: {},
}));

server.use('/nimbox/graphiql', graphiqlExpress({
  endpointURL: '/nimbox/graphql'
}));

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`));

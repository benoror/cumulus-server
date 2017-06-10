import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress, } from 'graphql-server-express';
import { schema } from './src/schema';

import express from 'express';

const PORT = 4000;

const server = express();

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));

import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import items from './items.json';

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        categories: [Category!]!
      }

      type Category {
        label: String!
        value: ID!
      }
    `,
    resolvers: {
      Query: {
        categories: () =>
          items.data.map((item, index) => ({
            label: item,
            value: index.toString(),
          })),
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});

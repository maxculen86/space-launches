import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://apollo-fullstack-tutorial.herokuapp.com/graphql',
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launches: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;

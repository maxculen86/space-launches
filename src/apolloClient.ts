import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { GetLaunchesQuery } from './generated/graphql';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL || 'https://apollo-fullstack-tutorial.herokuapp.com/graphql',
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launches: {
          keyArgs: false,
          merge(existing: GetLaunchesQuery['launches'] | undefined, incoming: GetLaunchesQuery['launches']) {
            return {
              ...incoming,
              launches: [...(existing?.launches || []), ...incoming.launches],
            };
          },
        },
      },
    },
  },
});

/**
 * Apollo client instance.
 */
const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;

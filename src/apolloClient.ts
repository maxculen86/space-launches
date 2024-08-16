import { ApolloClient, InMemoryCache, HttpLink, FieldFunctionOptions } from '@apollo/client';
import { Launch } from './generated/graphql';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL || 'https://apollo-fullstack-tutorial.herokuapp.com/graphql',
});

interface LaunchConnection {
  cursor: string;
  hasMore: boolean;
  launches: Launch[];
}

/**
 * Apollo client cache.
 */
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launches: {
          keyArgs: false,
          merge(
            existing: LaunchConnection | undefined,
            incoming: LaunchConnection,
            options: FieldFunctionOptions<{ after?: string | null }>
          ): LaunchConnection {
            const merged = existing ? { ...existing } : { launches: [], cursor: '', hasMore: true };
            if (options.args?.after) {
              merged.launches = [...merged.launches, ...incoming.launches];
            } else {
              merged.launches = incoming.launches;
            }
            merged.cursor = incoming.cursor;
            merged.hasMore = incoming.hasMore;
            return merged;
          },
        },
      },
    },
  },
});

/**
 * Apollo Client instance for making GraphQL requests.
 */
const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  },
});

export default client;
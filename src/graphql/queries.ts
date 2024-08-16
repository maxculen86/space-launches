import { gql } from '@apollo/client';

/**
 * Retrieves a list of launches from the server.
 * 
 * @param after - Optional parameter to specify the cursor for pagination.
 * @returns A Promise that resolves to the list of launches.
 */
export const GET_LAUNCHES = gql`
  query GetLaunches($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        site
        mission {
          name
        }
        rocket {
          name
        }
      }
    }
  }
`;

import { gql } from '@apollo/client';

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

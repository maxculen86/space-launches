import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

interface Launch {
  id: string;
  site: string;
  mission: {
    name: string;
  };
  rocket: {
    name: string;
  };
}

const LaunchList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error :( {error.message}</p>;
  }

  console.log('Received data:', JSON.stringify(data, null, 2));

  if (!data || !data.launches || !Array.isArray(data.launches.launches)) {
    console.error('Invalid data structure:', data);
    return <p>Error: Invalid data structure</p>;
  }

  return (
    <div>
      {data.launches.launches.map((launch: Launch) => (
        <div key={launch.id}>
          <h3>{launch.mission.name}</h3>
          <p>Rocket: {launch.rocket.name}</p>
          <p>Launch Site: {launch.site}</p>
        </div>
      ))}
    </div>
  );
};

export default LaunchList;

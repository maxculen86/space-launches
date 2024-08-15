import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import LaunchItem from './LaunchItem';

const GET_LAUNCHES = gql`
  query GetLaunches($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        mission_name
        rocket {
          rocket_name
        }
        launch_site {
          site_name
        }
      }
    }
  }
`;

interface Launch {
  id: string;
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  launch_site: {
    site_name: string;
  };
}

const LaunchList: React.FC = () => {
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const launches: Launch[] = data?.launches?.launches || [];

  const loadMore = () => {
    if (!hasMore) return;

    fetchMore({
      variables: {
        after: data.launches.cursor,
      },
    }).then((fetchMoreResult) => {
      setHasMore(fetchMoreResult.data.launches.hasMore);
    });
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMore();
    }
  };

  return (
    <div style={{ height: '400px', overflowY: 'auto' }} onScroll={handleScroll}>
      {launches.map((launch) => (
        <LaunchItem key={launch.id} launch={launch} />
      ))}
      {loading && <p>Loading more...</p>}
    </div>
  );
};

export default LaunchList;

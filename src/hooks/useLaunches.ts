import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAUNCHES } from '../graphql/queries';
import { Launch } from '../types/types';

export const useLaunches = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCHES, {
    variables: { after: null },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      setLaunches(data.launches.launches);
      setCursor(data.launches.cursor);
      setHasMore(data.launches.hasMore);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchMore({
        variables: { after: cursor },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            launches: {
              ...fetchMoreResult.launches,
              launches: [
                ...prev.launches.launches,
                ...fetchMoreResult.launches.launches,
              ],
            },
          };
        },
      }).then((result) => {
        if (result.data) {
          setLaunches([...launches, ...result.data.launches.launches]);
          setCursor(result.data.launches.cursor);
          setHasMore(result.data.launches.hasMore);
        }
      });
    }
  }, [loading, hasMore, cursor, fetchMore, launches]);

  return { launches, loading, error, hasMore, loadMore };
};

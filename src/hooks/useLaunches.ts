import { useState, useCallback, useEffect } from 'react';
import { useGetLaunchesQuery, Launch } from '../generated/graphql';

/**
 * Custom hook for fetching and managing space launches.
 * @returns An object containing the launches, loading state, error state, whether there are more launches to load, and a function to load more launches.
 */
export const useLaunches = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, data, fetchMore } = useGetLaunchesQuery({
    variables: { after: null },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.launches.launches) {
      setLaunches(data.launches.launches.filter((launch): launch is Launch => launch !== null));
      setCursor(data.launches.cursor);
      setHasMore(data.launches.hasMore);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchMore({
        variables: { after: cursor },
      }).then((result) => {
        if (result.data?.launches.launches) {
          setLaunches([...launches, ...result.data.launches.launches.filter((launch): launch is Launch => launch !== null)]);
          setCursor(result.data.launches.cursor);
          setHasMore(result.data.launches.hasMore);
        }
      });
    }
  }, [loading, hasMore, cursor, fetchMore, launches]);

  return { launches, loading, error, hasMore, loadMore };
};

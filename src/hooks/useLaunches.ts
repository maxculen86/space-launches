import {  useCallback, useMemo } from 'react';
import { useGetLaunchesQuery, Launch } from '../generated/graphql';

/**
 * Custom hook for fetching and managing space launches.
 * @returns An object containing the launches, loading state, error state, whether there are more launches to load, and a function to load more launches.
 */

export const useLaunches = () => {
  const { loading, error, data, fetchMore } = useGetLaunchesQuery({
    variables: { after: null },
    notifyOnNetworkStatusChange: true,
  });

  const launches = useMemo(() => 
    data?.launches.launches.filter((launch): launch is Launch => launch !== null) || [],
    [data?.launches.launches]
  );

  const hasMore = useMemo(() => data?.launches.hasMore || false, [data?.launches.hasMore]);
  const cursor = useMemo(() => data?.launches.cursor || null, [data?.launches.cursor]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchMore({
        variables: { after: cursor },
      });
    }
  }, [loading, hasMore, cursor, fetchMore]);

  return { launches, loading, error, hasMore, loadMore };
};

import { useState, useCallback, useEffect } from 'react';
import { useGetLaunchesQuery, GetLaunchesQuery } from '../generated/graphql';

type LaunchItem = NonNullable<GetLaunchesQuery['launches']['launches'][number]>;

export const useLaunches = () => {
  const [launches, setLaunches] = useState<LaunchItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, data, fetchMore } = useGetLaunchesQuery({
    variables: { after: null },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.launches.launches) {
      setLaunches(data.launches.launches.filter((launch): launch is LaunchItem => launch !== null));
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
          setLaunches([...launches, ...result.data.launches.launches.filter((launch): launch is LaunchItem => launch !== null)]);
          setCursor(result.data.launches.cursor);
          setHasMore(result.data.launches.hasMore);
        }
      });
    }
  }, [loading, hasMore, cursor, fetchMore, launches]);

  return { launches, loading, error, hasMore, loadMore };
};
import React, { useCallback, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from './Spinner';
import { useWindowSize } from '../hooks/useWindowSize';
import { useLaunches } from '../hooks/useLaunches';
import { LaunchTable } from './LaunchTable';
import { LaunchGrid } from './LaunchGrid';

/**
 * Renders a list of launches.
 * 
 * @returns The LaunchList component.
 */
const LaunchList: React.FC = React.memo(() => {
  const { width } = useWindowSize();
  const isTableView = useMemo(() => width >= 640, [width]);
  const { launches, loading, error, hasMore, loadMore } = useLaunches();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, loadMore, hasMore]);

  const renderContent = useCallback(() => {
    if (loading && launches.length === 0) {
      return <Spinner />;
    }
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div className="container mx-auto px-4">
        {launches.length === 0 ? (
          <p>No launches found.</p>
        ) : isTableView ? (
          <LaunchTable launches={launches} />
        ) : (
          <LaunchGrid launches={launches} />
        )}
        {(loading || hasMore) && (
          <div ref={ref}>
            <Spinner message="Loading more..." />
          </div>
        )}
      </div>
    );
  }, [loading, error, launches, isTableView, hasMore, ref]);

  return renderContent();
});

export default LaunchList;
import React from 'react';
import { Launch } from '../generated/graphql';
import { LaunchItem } from './LaunchItem';

interface LaunchGridProps {
  launches: (Launch | null)[];
}

export const LaunchGrid: React.FC<LaunchGridProps> = ({ launches }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {launches.map((launch) => 
      launch && (
        <LaunchItem key={launch.id} launch={launch} isTableView={false} />
      )
    )}
  </div>
);

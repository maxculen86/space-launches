import React from 'react';
import { Launch } from '../types/types';
import { LaunchItem } from './LaunchItem';

export const LaunchGrid: React.FC<{ launches: Launch[] }> = ({ launches }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {launches.map((launch) => (
      <LaunchItem key={launch.id} launch={launch} isTableView={false} />
    ))}
  </div>
);

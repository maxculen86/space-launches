import React from 'react';
import { Launch } from '../types/types';
import { LaunchItem } from './LaunchItem';

export const LaunchTable: React.FC<{ launches: Launch[] }> = ({ launches }) => (
  <div className="overflow-x-auto">
    <table>
      <thead>
        <tr>
          <th>Mission</th>
          <th>ID</th>
          <th>Rocket</th>
          <th>Launch Site</th>
        </tr>
      </thead>
      <tbody>
        {launches.map((launch) => (
          <LaunchItem key={launch.id} launch={launch} isTableView={true} />
        ))}
      </tbody>
    </table>
  </div>
);

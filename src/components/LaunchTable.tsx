import React from 'react';
import { Launch } from '../generated/graphql';
import { LaunchItem } from './LaunchItem';

interface LaunchTableProps {
  launches: (Launch | null)[];
}

export const LaunchTable: React.FC<LaunchTableProps> = ({ launches }) => (
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
        {launches.map((launch) => 
          launch && (
            <LaunchItem key={launch.id} launch={launch} isTableView={true} />
          )
        )}
      </tbody>
    </table>
  </div>
);

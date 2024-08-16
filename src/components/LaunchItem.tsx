import React from 'react';
import { Launch } from '../generated/graphql';

interface LaunchItemProps {
  launch: Launch;
  isTableView: boolean;
}

/**
 * Renders a single launch item.
 * @param {Object} props - The component props.
 * @param {Launch} props.launch - The launch object to display.
 * @param {boolean} props.isTableView - Indicates whether the launch item should be rendered as a table row.
 * @returns {JSX.Element} The rendered launch item.
 */
export const LaunchItem: React.FC<LaunchItemProps> = React.memo(({ launch, isTableView }) => {
  if (isTableView) {
    return (
      <tr>
        <td>{launch.mission?.name ?? 'N/A'}</td>
        <td>{launch.id}</td>
        <td>{launch.rocket?.name ?? 'N/A'}</td>
        <td>{launch.site ?? 'N/A'}</td>
      </tr>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{launch.mission?.name ?? 'Unnamed Mission'}</h3>
      <p className="text-gray-600">ID: {launch.id}</p>
      <p className="text-gray-600">Rocket: {launch.rocket?.name ?? 'Unknown'}</p>
      <p className="text-gray-600">Launch Site: {launch.site ?? 'Unknown'}</p>
    </div>
  );
});

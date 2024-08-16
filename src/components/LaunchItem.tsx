import React from 'react';
import { Launch } from '../types/types';

export const LaunchItem: React.FC<{ launch: Launch; isTableView: boolean }> = ({ launch, isTableView }) => {
  if (isTableView) {
    return (
      <tr>
        <td>{launch.mission.name}</td>
        <td>{launch.id}</td>
        <td>{launch.rocket.name}</td>
        <td>{launch.site}</td>
      </tr>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{launch.mission.name}</h3>
      <p className="text-gray-600">ID: {launch.id}</p>
      <p className="text-gray-600">Rocket: {launch.rocket.name}</p>
      <p className="text-gray-600">Launch Site: {launch.site}</p>
    </div>
  );
};

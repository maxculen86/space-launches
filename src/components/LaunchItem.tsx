import React from 'react';

interface LaunchItemProps {
  launch: {
    id: string;
    mission_name: string;
    rocket: {
      rocket_name: string;
    };
    launch_site: {
      site_name: string;
    };
  };
}

const LaunchItem: React.FC<LaunchItemProps> = ({ launch }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{launch.mission_name}</h3>
      <p>ID: {launch.id}</p>
      <p>Rocket: {launch.rocket.rocket_name}</p>
      <p>Launch Site: {launch.launch_site.site_name}</p>
    </div>
  );
};

export default LaunchItem;

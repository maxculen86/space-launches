import React from 'react';

export const Spinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="text-center my-4">
    <div className="spinner"></div>
    <p>{message}</p>
  </div>
);

import React from 'react';

/**
 * A spinner component that displays a loading message.
 *
 * @component
 * @param {string} [message="Loading..."] - The message to display while loading.
 * @returns {JSX.Element} - The spinner component.
 */
export const Spinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="text-center my-4">
    <div className="spinner"></div>
    <p>{message}</p>
  </div>
);

import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { describe, it, expect } from 'vitest';
import LaunchList, { GET_LAUNCHES } from './LaunchList';

const mocks = [
  {
    request: {
      query: GET_LAUNCHES,
      variables: { after: null },
    },
    result: {
      data: {
        launches: {
          cursor: "1",
          hasMore: true,
          launches: [
            {
              id: "1",
              mission_name: "Mission 1",
              rocket: { rocket_name: "Rocket 1" },
              launch_site: { site_name: "Site 1" },
            },
          ],
        },
      },
    },
  },
];

describe('LaunchList', () => {
  it('renders launches and uses cached data on re-render', async () => {
    const { rerender } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LaunchList />
      </MockedProvider>
    );

    // Wait for the data to be loaded
    await screen.findByText('Mission 1');

    // Check if the launch data is rendered correctly
    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Rocket: Rocket 1')).toBeInTheDocument();
    expect(screen.getByText('Launch Site: Site 1')).toBeInTheDocument();

    // Re-render the component
    rerender(
      <MockedProvider mocks={[]} addTypename={false}>
        <LaunchList />
      </MockedProvider>
    );

    // Check if the data is still there (should be cached)
    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Rocket: Rocket 1')).toBeInTheDocument();
    expect(screen.getByText('Launch Site: Site 1')).toBeInTheDocument();

    // If the data is still there without providing mocks on re-render,
    // it means the data was served from the cache
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LaunchList from './LaunchList';
import { GET_LAUNCHES } from '../graphql/queries';

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private callback: IntersectionObserverCallback) {}

  observe(target: Element): void {
    // Simulate an intersection immediately
    this.callback([{
      isIntersecting: true,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 1,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      target,
      time: Date.now()
    }], this);
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

global.IntersectionObserver = MockIntersectionObserver as any;

const mocks = [
  {
    request: {
      query: GET_LAUNCHES,
      variables: { after: null },
    },
    result: {
      data: {
        launches: {
          cursor: "1583556631",
          hasMore: true,
          launches: [
            {
              __typename: 'Launch',
              id: "110",
              site: "KSC LC 39A",
              mission: { __typename: 'Mission', name: "CRS-21" },
              rocket: { __typename: 'Rocket', name: "Falcon 9" },
            },
            {
              __typename: 'Launch',
              id: "109",
              site: "CCAFS SLC 40",
              mission: { __typename: 'Mission', name: "Starlink-15 (v1.0)" },
              rocket: { __typename: 'Rocket', name: "Falcon 9" },
            },
          ],
        },
      },
    },
  },
];

describe('LaunchList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading state and then launches', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <LaunchList />
      </MockedProvider>
    );

    // Check for initial loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText('CRS-21')).toBeInTheDocument();
    });

    // Check if the launch data is rendered correctly
    expect(screen.getByText('Starlink-15 (v1.0)')).toBeInTheDocument();
    expect(screen.getAllByText('Falcon 9')).toHaveLength(2);
    expect(screen.getByText('KSC LC 39A')).toBeInTheDocument();
    expect(screen.getByText('CCAFS SLC 40')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    const errorMock = {
      request: {
        query: GET_LAUNCHES,
        variables: { after: null },
      },
      error: new Error('An error occurred'),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={true}>
        <LaunchList />
      </MockedProvider>
    );

    // Wait for the error state and check for the presence of the error message
    const errorElement = await screen.findByText('Error: An error occurred');
    expect(errorElement).toBeInTheDocument();
  });
});

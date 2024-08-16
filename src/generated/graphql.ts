import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type Launch = {
  __typename?: 'Launch';
  id: Scalars['ID']['output'];
  isBooked: Scalars['Boolean']['output'];
  mission: Maybe<Mission>;
  rocket: Maybe<Rocket>;
  site: Maybe<Scalars['String']['output']>;
};

/**
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type LaunchConnection = {
  __typename?: 'LaunchConnection';
  cursor: Scalars['String']['output'];
  hasMore: Scalars['Boolean']['output'];
  launches: Array<Maybe<Launch>>;
};

export type Mission = {
  __typename?: 'Mission';
  missionPatch: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
};


export type MissionMissionPatchArgs = {
  size: InputMaybe<PatchSize>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookTrips: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
  login: Maybe<User>;
};


export type MutationBookTripsArgs = {
  launchIds: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationCancelTripArgs = {
  launchId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: InputMaybe<Scalars['String']['input']>;
};

export enum PatchSize {
  Large = 'LARGE',
  Small = 'SMALL'
}

export type Query = {
  __typename?: 'Query';
  launch: Maybe<Launch>;
  launches: LaunchConnection;
  me: Maybe<User>;
  totalTripsBooked: Maybe<Scalars['Int']['output']>;
};


export type QueryLaunchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLaunchesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  pageSize: InputMaybe<Scalars['Int']['input']>;
};

export type Rocket = {
  __typename?: 'Rocket';
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  type: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  tripsBooked: Maybe<Scalars['Int']['output']>;
};

export type TripUpdateResponse = {
  __typename?: 'TripUpdateResponse';
  launches: Maybe<Array<Maybe<Launch>>>;
  message: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  profileImage: Maybe<Scalars['String']['output']>;
  token: Maybe<Scalars['String']['output']>;
  trips: Array<Maybe<Launch>>;
};

export type GetLaunchesQueryVariables = Exact<{
  after: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLaunchesQuery = { __typename?: 'Query', launches: { __typename?: 'LaunchConnection', cursor: string, hasMore: boolean, launches: Array<{ __typename?: 'Launch', id: string, site: string | null, mission: { __typename?: 'Mission', name: string | null } | null, rocket: { __typename?: 'Rocket', name: string | null } | null } | null> } };


export const GetLaunchesDocument = gql`
    query GetLaunches($after: String) {
  launches(after: $after) {
    cursor
    hasMore
    launches {
      id
      site
      mission {
        name
      }
      rocket {
        name
      }
    }
  }
}
    `;

/**
 * __useGetLaunchesQuery__
 *
 * To run a query within a React component, call `useGetLaunchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLaunchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLaunchesQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetLaunchesQuery(baseOptions?: Apollo.QueryHookOptions<GetLaunchesQuery, GetLaunchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GetLaunchesDocument, options);
      }
export function useGetLaunchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLaunchesQuery, GetLaunchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GetLaunchesDocument, options);
        }
export function useGetLaunchesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLaunchesQuery, GetLaunchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GetLaunchesDocument, options);
        }
export type GetLaunchesQueryHookResult = ReturnType<typeof useGetLaunchesQuery>;
export type GetLaunchesLazyQueryHookResult = ReturnType<typeof useGetLaunchesLazyQuery>;
export type GetLaunchesSuspenseQueryHookResult = ReturnType<typeof useGetLaunchesSuspenseQuery>;
export type GetLaunchesQueryResult = Apollo.QueryResult<GetLaunchesQuery, GetLaunchesQueryVariables>;
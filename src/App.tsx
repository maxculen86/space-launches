import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import LaunchList from './components/LaunchList';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Space Launches</h1>
        <LaunchList />
      </div>
    </ApolloProvider>
  );
};

export default App;
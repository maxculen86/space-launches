import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import LaunchList from './components/LaunchList';
import './index.css';
import './App.css';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Space Launches</h1>
        </header>
        <main className="App-content">
          <LaunchList />
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;
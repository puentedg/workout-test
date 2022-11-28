// import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Positive from './components/pages/Positive';
import Food from './components/pages/Food';
import Workout from './components/pages/Workout';
// import HomeContainer from './components/HomeContainer';
import NavTabs from './components/NavTabs';
import Header from './components/Header';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ApolloProvider client={client}>
          <Router>
            <div>
            <Header />
              <NavTabs />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/signup" element={<Signup />} />
                <Route path="/positive" element={<Positive />} />
                <Route path="/workout" element={<Workout />} />
                <Route path="/food" element={<Food />} />
                {/* <Route path="*" element={<NoMatch />} /> */}
              </Routes>
            </div>
          </Router>
        </ApolloProvider>
      </header>
    </div>
  );
}

export default App;

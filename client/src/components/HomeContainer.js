import React, { useState } from 'react';
import NavTabs from './NavTabs';
import Home from './pages/Home';
import Positive from './pages/Positive';
import Workout from './pages/Workout';
import Food from './pages/Food';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import './styles/HomeContainer.css';

export default function HomeContainer() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Login') {
      return <Login />;
    }
    if (currentPage === 'Signup') {
      return <Signup />;
    }
    if (currentPage === 'Positive') {
      return <Positive />;
    }
    if (currentPage === 'Workout') {
      return <Workout />;
    }
    return <Food />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="header">
      <h1 className="main-h1">Workout Buddy</h1>
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
    </div>
  );
}

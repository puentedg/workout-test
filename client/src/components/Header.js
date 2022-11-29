import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="header__container">
      
      <div>
          {Auth.loggedIn() ? (
            <button className="btn btn__logout" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn__login" to="/login">
                Login
              </Link>
              <Link className="btn btn__signup" to="/signup">
                Signup
              </Link>
            </>
          )}
      </div>
    </header>
  );
};

export default Header;
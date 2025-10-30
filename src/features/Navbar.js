import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import tickettoLogo from '../assets/Ticketto..svg';
import profileIcon from '../assets/profile.svg';



function Navbar({ className, currentUser }) {
  return (
    <header className={className}>
      <Link to="/" className="brand">
        <img src={tickettoLogo} alt="Ticketto Logo" />
      </Link>

      {currentUser ? (
        // When user is logged in
        <Link to="/profile" className="login">
          <img src={profileIcon} alt="Profile Icon" />
          <span>{currentUser.name}</span>
        </Link>
      ) : (
        // When user not logged in
        <Link to="/login" className="login">
          <img src={profileIcon} alt="Profile Icon" />
          <span>Login / Sign Up</span>
        </Link>
      )}
    </header>
  );
}

Navbar.propTypes = {
  className: PropTypes.string.isRequired,
  currentUser: PropTypes.object, 
};

export default styled(Navbar)`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0 3rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  border-bottom: 1px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);


  .brand img {
    height: 25px;
    width: auto;
    display: block;
  }

  .login {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1a1a1a;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: opacity 0.2s ease;
  }

  .login img {
    height: 22px;
    width: 22px;
  }

  .login:hover {
    opacity: 0.7;
  }
`;
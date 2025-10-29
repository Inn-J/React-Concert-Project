import React from "react";
import PropTypes from "prop-types";
import { Ticket, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Sidebar({ user, setCurrentUser, activeView, setActiveView, className }) {
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className={className}>
      <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      <h3 className="username">{user.name}</h3>
      <p className="email">{user.email}</p>

      <div className="divider" />

      <div className="menu">
        <button 
          className={`menuItem ${activeView === 'tickets' ? 'active' : ''}`}
          onClick={() => setActiveView('tickets')}
        >
          <Ticket className="icon" />
          My Tickets
        </button>
        <button 
          className={`menuItem ${activeView === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveView('payment')}
        >
          <FileText className="icon" />
          Payment History
        </button>
      </div>

      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("currentUser");
          setCurrentUser(null);
          navigate("/");
        }}
      >
        Log out
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object,
  setCurrentUser: PropTypes.func,
  activeView: PropTypes.string,
  setActiveView: PropTypes.func,
  className: PropTypes.string,
};

export default styled(Sidebar)`
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  flex: 0 0 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff9a76 0%, #ffb88c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .username {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: #222;
  }

  .email {
    margin-top: 0;
    font-size: 0.95rem;
    color: #999;
    margin-bottom: 0.5rem;
  }

  .divider {
    width: 80%;
    height: 2px;
    background: linear-gradient(90deg, #FF7F49 30%, #FFBC6A 63%, #9CE3DC 100%);
    margin: 0.5rem 0;
  }

  .menu {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin: 1rem 0;

    .menuItem {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: transparent;
      color: #333;
      padding: 0.875rem 1.25rem;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 1rem;
      font-weight: 500;

      &.active {
        background: linear-gradient(135deg, #ff9a76 0%, #ffb88c 100%);
        color: #fff;
      }

      &:hover:not(.active) {
        background: #f5f5f5;
      }

      .icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  .logout {
    width: 100%;
    margin-top: 2rem;
    padding: 0.875rem 1.5rem;
    border-radius: 999px;
    border: 2px solid #ddd;
    background: #fff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.2s;
    color: #333;

    &:hover {
      background: #f5f5f5;
      border-color: #ccc;
    }
  }
`;
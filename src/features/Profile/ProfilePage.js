import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ticket, FileText, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MyTicketCard from "./MyticketCard";

function ProfilePage({ currentUser, setCurrentUser, className }) {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const savedUser = localStorage.getItem("currentUser");
        if (!savedUser) {
          setLoading(false);
          return;
        }

        const currentUser = JSON.parse(savedUser);
        setUser(currentUser);

        const [ticketRes, bookingRes] = await Promise.all([
          fetch("http://localhost:4000/ticketdata"),
          fetch("http://localhost:4000/bookings"),
        ]);

        if (!ticketRes.ok || !bookingRes.ok) {
          throw new Error("Failed to fetch ticket or booking data");
        }

        const ticketData = await ticketRes.json();
        const bookingData = await bookingRes.json();

        const userTickets = ticketData.find((t) => t.Userid === currentUser.id);

        if (userTickets?.Tickets) {
          const combinedTickets = userTickets.Tickets.map((t) => {
            const booking = bookingData.find(
              (b) => parseInt(b.concertId) === t.ConcertId
            );
            return {
              id: t.ConcertId,
              eventName: booking ? booking.concertName : "Unknown Event",
              date: booking
                ? new Date(booking.date).toLocaleDateString("en-GB")
                : "TBA",
              time: booking
                ? new Date(booking.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "",
              location: booking?.location || "Bangkok Arena",
              quantity: t.Quantity,
              imageUrl: booking ? `/images/${t.ConcertId}.jpg` : "/images/default.jpg",
            };
          });
          setTickets(combinedTickets);
        } else {
          setTickets([]);
        }
      } catch (error) {
        console.error("❌ Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  if (!user)
    return (
      <div className="notLoggedIn">
        <h2>Please log in to view your profile.</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );

  return (
    <div className={className}>
      {/* Main Content */}
      <div className="content">
        <h2 className="title">My Profile</h2>
        <div className="main">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <h3 className="username">{user.name}</h3>
            <p className="email">{user.email}</p>

            <div className="divider" />

            <div className="menu">
              <button className="menuItem active">
                <Ticket className="icon" />
                My Tickets
              </button>
              <button className="menuItem">
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
          </aside>

          {/* Tickets Section */}
          <main className="tickets">
            <h3>My Tickets</h3>
            {tickets.length > 0 ? (
              <div className="ticketsList">
                {tickets.map((ticket) => (
                  <MyTicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <div className="noTickets">
                <h4>You don't have any ticket</h4>
                <p>let's find something fun on Ticketto!</p>
                <Link to="/">Find events</Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
  className: PropTypes.string,
};

export default styled(ProfilePage)`
  min-height: 100vh;
  width: 100%;
  position: relative;
  /* Remove the solid background here */
  background: radial-gradient(ellipse 80% 80% at 50% -20%, 
    rgba(255, 138, 128, 0.6), 
    rgba(255, 184, 140, 0.4) 40%, 
    rgba(255, 216, 140, 0.2) 70%, 
    rgba(255, 255, 255, 1) 100%);
  font-family: Arial, sans-serif;

  /* Remove the ::before if moving gradient to main element */

  .loading,
  .notLoggedIn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #333; /* Changed from #fff for better visibility */
    }

    a {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #ff9a76 0%, #ffb88c 100%);
      color: #fff;
      border-radius: 999px;
      text-decoration: none;
      transition: opacity 0.2s;
      font-weight: 600;
      &:hover {
        opacity: 0.9;
      }
    }
  }

  .content {
    padding: 2rem 150px;
    min-height: 100vh;
    
    @media(max-width: 768px) {
      padding: 2rem 1.5rem;
    }
    
    .title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333; /* Changed from #fff */
      margin-bottom: 2rem;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Added for depth */
    }

    .main {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 1400px;
      margin: 0 auto;

      @media(min-width: 1024px) {
        flex-direction: row;
        align-items: flex-start;
      }

      .sidebar {
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
          color: #222;
        }

        .email {
          font-size: 0.95rem;
          color: #999;
          margin-bottom: 0.5rem;
        }

        .divider {
          width: 80%;
          height: 1px;
          background: #e5e5e5;
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
      }

      .tickets {
        flex: 1;
        background: #fff;
        padding: 2.5rem;
        border-radius: 24px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #222;
        }

        .ticketsList {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .noTickets {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;

          h4 {
            font-size: 1.75rem;
            font-weight: 700;
            color: #222;
            margin-bottom: 0.75rem;
          }

          p {
            color: #666;
            font-size: 1.05rem;
            margin-bottom: 2rem;
          }

          a {
            padding: 1rem 2.5rem;
            background: linear-gradient(90deg, #FF7F49 30%, #FFBC6A 63%, #9CE3DC 100%);
            color: #fff;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.05rem;
            transition: opacity 0.2s;
            
            &:hover {
              opacity: 0.9;
            }
          }
        }
      }
    }
  }
`;
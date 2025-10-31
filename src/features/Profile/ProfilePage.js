import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MyTicketCard from "./MyticketCard";
import PaymentCard from "./PaymentCard";
import Sidebar from "./Sidebar";

function ProfilePage({ currentUser, setCurrentUser, className }) {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('tickets');

  useEffect(() => {
    async function loadData() {
      try {
        const savedUser = localStorage.getItem("currentUser");
        if (!savedUser) {
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentUser(parsedUser);

        const bookingRes = await fetch(
          `http://localhost:4000/bookings/user/${parsedUser.id}`
        );

        if (bookingRes.status === 404) {
          setTickets([]);
          setBookings([]);
          setLoading(false);
          return;
        }

        if (!bookingRes.ok) throw new Error("Failed to fetch bookings");

        const userBookings = await bookingRes.json();
        
        //raw bookings
        setBookings(userBookings);

        // Transform bookings -> tickets
        const transformedTickets = userBookings.flatMap((booking) =>
          booking.lineItems.map((item, index) => {
            let concertImage;
            try {
              concertImage = require(`../../assets/${booking.concertId}.jpg`);
            } catch {
              concertImage = require(`../../assets/default.png`);
            }

            return {
              id: `${booking.bookingId}-${index}`,
              bookingId: booking.bookingId,
              eventName: booking.concertName,
              date: booking.concertDate || booking.date || "TBA",
              time: booking.concertTime || "TBA",
              location: booking.concertLocation || "TBA",
              option: item.option,
              imageUrl: booking.concertImage
            };
          })
        );

        setTickets(transformedTickets);
      } catch (err) {
        console.error("Error loading profile data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className={className}>
      <div className="content">
        <h3 className="title">My Profile</h3>
        <div className="main">
          <Sidebar 
            user={user} 
            setCurrentUser={setCurrentUser}
            activeView={activeView}
            setActiveView={setActiveView}
          />

          <main className="tickets">
            <h3>{activeView === 'tickets' ? 'My Tickets' : 'Payment History'}</h3>
            
            {activeView === 'tickets' ? (
              // My Tickets View
              tickets.length === 0 ? (
                <div className="noTickets">
                  <h4>You don't have any ticket</h4>
                  <p>Let's find something fun on Ticketto!</p>
                  <Link to="/">Find events</Link>
                </div>
              ) : (
                <div className="ticketsList">
                  {tickets.map((ticket) => (
                    <MyTicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              )
            ) : (

              bookings.length === 0 ? (
                <div className="noTickets">
                  <h4>No payment history</h4>
                  <p>Your payment history will appear here</p>
                </div>
              ) : (
                <div className="ticketsList">
                  {bookings.map((booking) => (
                    <PaymentCard key={booking.bookingId} booking={booking} />
                  ))}
                </div>
              )
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
  background: radial-gradient(
    ellipse 80% 80% at 50% -20%,
    rgba(255, 138, 128, 0.95),
    rgba(255, 184, 140, 0.85) 40%,
    rgba(255, 216, 140, 0.7) 70%,
    #f8f3e9 100%
  );


  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }

  .content {
    padding: 2rem 150px;
    min-height: 100vh;

    @media (max-width: 768px) {
      padding: 2rem 1.5rem;
    }

    .title {
      font-size: 2rem;
      font-weight: 600;
      color: #ffffffff;
      margin-top: 3rem;
      margin-bottom: 1rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    }

    .main {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 1400px;
      margin: 0 auto;

      @media (min-width: 1024px) {
        flex-direction: row;
        align-items: flex-start;
      }

      .tickets {
        flex: 1;
        background: #fff;
        padding: 2.5rem;
        border-radius: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        h3 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0;
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
            background: linear-gradient(
              90deg,
              #ff7f49 30%,
              #ffbc6a 63%,
              #9ce3dc 100%
            );
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
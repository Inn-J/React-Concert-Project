import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Calendar, MapPin, Ticket } from "lucide-react";

function MyTicketCard({ ticket, className }) {
  if (!ticket) return null;

  return (
    <div className={className}>
      <div className="ticketCard">
        <img
          className="ticketImage"
          src={ticket.imageUrl}
          alt={ticket.eventName}
          onError={(e) => {
            e.target.src = "/images/default.jpg";
          }}
        />
        <div className="ticketInfo">
          <h4 className="eventName">{ticket.eventName}</h4>
          <div className="detail">
            <Calendar className="detailIcon" />
            <span>{ticket.date} | {ticket.time}</span>
          </div>
          <div className="detail">
            <MapPin className="detailIcon" />
            <span>{ticket.location}</span>
          </div>
          <div className="detail">
            <Ticket className="detailIcon" />
            <span>{ticket.option}</span>
          </div>
        </div>
        <div className="ticketId">
          <span>ID{ticket.bookingId}</span>
        </div>
      </div>
    </div>
  );
}

MyTicketCard.propTypes = {
  ticket: PropTypes.shape({
    eventName: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    option: PropTypes.string,
    imageUrl: PropTypes.string,
    bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  className: PropTypes.string,
};

export default styled(MyTicketCard)`
  .ticketCard {
    display: flex;
    align-items: stretch;
    background: #fff;
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);

    &:hover {
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      transform: translateY(-4px);
    }
  }

  .ticketImage {
    width: 140px;
    height: 140px;
    object-fit: cover;
    flex-shrink: 0;
    background: linear-gradient(135deg, #ff9a76 0%, #ffb88c 100%);
    border-radius: 16px;
    margin: 12px;
  }

  .ticketInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.65rem;
    padding: 1.25rem 1rem;
  }

  .eventName {
    font-size: 1.1rem;
    font-weight: 700;
    color: #222;
    margin: 0 0 0.25rem 0;
    line-height: 1.3;
  }

  .detail {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.9rem;
    color: #555;
    line-height: 1.4;
  }

  .detailIcon {
    width: 18px;
    height: 18px;
    color: #ff9a76;
    flex-shrink: 0;
  }

  .ticketId {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem 2rem;
    background: linear-gradient(135deg, #ffe8df 0%, #fff4ec 100%);
    border-left: 2px dashed #ffc4a8;
    border-radius: 0 24px 24px 0;
    min-width: 140px;
    
    span {
      font-size: 1rem;
      font-weight: 700;
      color: #ff9a76;
      letter-spacing: 0.5px;
    }
  }

  @media (max-width: 968px) {
    .ticketCard {
      flex-direction: column;
    }

    .ticketImage {
      width: 100%;
      height: 220px;
      border-radius: 16px 16px 0 0;
      margin: 0;
    }

    .ticketInfo {
      padding: 1.5rem;
    }

    .ticketId {
      border-left: none;
      border-top: 2px dashed #ffc4a8;
      border-radius: 0 0 24px 24px;
      padding: 1rem;
      min-width: auto;

      span {
        font-size: 0.95rem;
      }
    }
  }
`;
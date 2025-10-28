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
            <span>
              {ticket.date} | {ticket.time}
            </span>
          </div>
          <div className="detail">
            <MapPin className="detailIcon" />
            <span>{ticket.location}</span>
          </div>
          <div className="detail quantity">
            <Ticket className="detailIcon" />
            <span>บัตรเข้างาน รอบ : {ticket.quantity} ตุลาคม 2568</span>
          </div>
        </div>
        <div className="ticketId">
          <span>ID12345678</span>
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
    quantity: PropTypes.number,
    imageUrl: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default styled(MyTicketCard)`
  .ticketCard {
    display: flex;
    align-items: stretch;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);

    &:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      transform: translateY(-2px);
    }
  }

  .ticketImage {
    width: 160px;
    height: 160px;
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
    gap: 0.75rem;
    padding: 1.5rem 1rem;
  }

  .eventName {
    font-size: 1.25rem;
    font-weight: 700;
    color: #222;
    margin: 0 0 0.25rem 0;
  }

  .detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    color: #666;

    &.quantity {
      color: #333;
      font-weight: 500;
    }
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
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #ffe5d9 0%, #fff0e6 100%);
    border-left: 1px dashed #ffcbb3;
    
    span {
      font-size: 0.95rem;
      font-weight: 600;
      color: #ff9a76;
      letter-spacing: 0.5px;
    }
  }

  @media (max-width: 768px) {
    .ticketCard {
      flex-direction: column;
    }

    .ticketImage {
      width: 100%;
      height: 200px;
      border-radius: 0;
      margin: 0;
    }

    .ticketId {
      border-left: none;
      border-top: 1px dashed #ffcbb3;
      padding: 1rem;
    }
  }
`;
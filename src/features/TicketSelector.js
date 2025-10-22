// src/features/ConcertDetail.jsx
// --- ConcertDetail.jsx ---
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

function TicketSelector({ prices = [], onChange }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
    onChange?.(item);
  };

  return (
    <>
      <ul className="ticket-list">
        {prices.map((price, index) => (
          <li
            key={index}
            className={`ticket-item ${selected === price ? "active" : ""}`}
            onClick={() => handleSelect(price)}
          >
            <span className="ticket-option">{price.option}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
TicketSelector.propTypes = {
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string,
      amount: PropTypes.number,
    })
  ),
  onChange: PropTypes.func,
};

export default styled(TicketSelector)`
  .ticket-list {
  list-style: none;
  padding: 0;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ticket-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #ddd;
  cursor: pointer;
  transition: 0.2s;
}

.ticket-item:hover {
  border-color: #FF8B59;
  background-color: #FFF3EC;
}

.ticket-item.active {
  border-color: #FF8B59;
  background-color: #FFE0D1;
}

.ticket-price {
  font-weight: bold;
  color: #333;
}

`;

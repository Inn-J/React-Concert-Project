// src/components/HeroCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function HeroCard({ concert, imageSrc,className,children }) {
  if (!concert) return null;

  return (
    <div className={`${className} hero__card`}>
      {imageSrc && (
        <img
          className="hero__image"
          src={imageSrc}
          alt={concert.name || "Concert"}
        />
      )}

      <div className="hero__detail">
        <h2 className="heroCard__category">{concert.Category}</h2>
        <h1 className="heroCard__name">{concert.name}</h1>
        {concert.date && <h3 className="ConcertCard__date">วันที่ {concert.date}</h3>}
        {concert.time && <h3 className="ConcertCard__time">เวลา: {concert.time}</h3>}
        {concert.location && <h3 className="ConcertCard__location">{concert.location}</h3>}
        {children}

      </div>
    </div>
  );
}

HeroCard.propTypes = {
  concert: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    Category: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    imageURL: PropTypes.string,
    description: PropTypes.array,
  }).isRequired,
  imageSrc: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

HeroCard.defaultProps = {
  imageSrc: '',
  className: '',
};

export default styled(HeroCard)`
  display: flex;
  background-color: #ffffff;
  border-radius: 12px;
  width: 70%;
  position: relative;
  overflow: hidden;
  
  .hero__image {
    width: 300px;
    height: 100%;
    padding: 20px;
    object-fit: cover;
    object-position: top;
    border-radius: 12px;
    display: block;
  }

  .heroCard__category {
    color: #40B9AC;
    font-eight:600;
    margin: 10px 0;
    line-height: 1.2;
  }

  .hero__detail {
    margin: 10px 0 0 0;
    text-align: left;
    padding: 0;
    line-height: 1.1;
    flex: 1;
  }

  .hero__btn {
    position: absolute;
    bottom: 24px;
    right: 24px;
    background-color: #FF8B59;
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }
`;

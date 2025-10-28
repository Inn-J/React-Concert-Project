// src/features/ConcertCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const req = require.context('../assets', false, /\.(png|jpe?g|gif|webp|avif)$/);
const imagesMap = req.keys().reduce((acc, key) => {
  const filename = key.replace('./', '');
  acc[filename] = req(key);
  return acc;
}, {});
const getImage = (filename) => imagesMap[filename] || imagesMap['placeholder.png'];

function ConcertCard({ item, className }) {
  if (!item) return null;
  const imgSrc = getImage(item.image); // ✅ ใช้ข้อมูลจาก JSON

  return (
    <li className={className}>
      <Link to={`/concert-detail/${item.id}`}>
        <img className="ConcertCard__image" src={imgSrc} alt={item.name || 'Concert'} />
      </Link>

      <Link to={`/concert-detail/${item.id}`} className="ConcertCard__name">
        {item.name}
      </Link>

      {item.location && <small className="ConcertCard__location">{item.location}</small>}
      {item.date && <small className="ConcertCard__date">วันที่ {item.date}</small>}
      {item.time && <small className="ConcertCard__time">เวลา: {item.time}</small>}

      <Link to={`/concert-detail/${item.id}`}>
        <button className="ConcertCard__button">Buy Now</button>
      </Link>
    </li>
  );
}

ConcertCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default styled(ConcertCard)`
  width: 280px;
  height: 550px;
  background: #ffffff;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  text-align: center;
 

  .ConcertCard__image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: top;
    border-radius: 8px;
    display: block;
    background: #f5f5f5;
  }

  .ConcertCard__name {
    color: #000000ff;
    font-weight: 600;

  }

  .ConcertCard__location {
    color: #333333ff;
  }

  .ConcertCard__date {
    color: #333333ff;
  }

  .ConcertCard__time {
    color: #333333ff;
  }
  
  .ConcertCard__button{
  background: linear-gradient(90deg, #FF7F49 30%, #FFBC6A 63%, #9CE3DC 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;  /* ✅ ฟิคตำแหน่ง */
  bottom: 12px;        /* ✅ ระยะจากขอบล่าง */
  left: 12px;          /* ✅ ระยะจากซ้าย (หรือใช้ right ก็ได้) */
  right: 12px;         
    }
`;
// src/features/ConcertDetail.jsx
// --- ConcertDetail.jsx ---
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import HeroCard from './HeroCard';
function ConcertDetail({ className }) {
  const { id } = useParams();
      const concert = useSelector((state) =>
    (state.products || []).find((p) => String(p.id) === String(id))
  );

  if (!concert) {
    return <div className={className}>Loading / Not found…</div>;
  }
  const productImage = require(`../../assets/${concert.image}`);
  
  return (
    <div className={className}>
      <section className="hero-section">
       <HeroCard concert={concert} imageSrc={productImage}>
        <Link to={`/select-ticket/${concert.id}`}>
          <button type="button" className="heroCard__btn">Get Ticket</button>
        </Link>
       </HeroCard>

      </section>
        <h1>{concert.name}</h1>
        <img className="ConcertDetail__image" src={productImage} alt={concert.name || 'Concert'} />
        <h2>Description</h2>
        <p>{concert.description?.[0]?.main}</p>
        <h2>Location</h2>
        {concert.location && <p className="ConcertCard__location">{concert.location}</p>}
        <h2>Terms and Conditions</h2>
        <p>{concert.description?.[0]?.condition}</p>
        <h2>Ticket Price</h2>
        <p>{concert.description?.[0]?.ticket}</p>
    </div>

  );
}

export default styled(ConcertDetail)`
  padding:  24px 24px;
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  gap: 3px;

  .hero-section {
  background: radial-gradient(ellipse 80% 80% at 50% -20%, 
    rgba(255, 138, 128, 0.95), 
    rgba(255, 184, 140, 0.85) 40%, 
    rgba(255, 216, 140, 0.7) 70%, 
    rgba(255, 232, 222, 1) 100%);
  width: 100vw;
  height: 550px;
  margin-left: calc(50% - 50vw);
  background-size: cover;       /* ครอบเต็ม */
  background-position: center;  /* จัดกึ่งกลาง */
  background-repeat: no-repeat; /* ไม่วนซ้ำ */
  padding: 80px 12px;           /* ขนาดพื้นที่ hero */
  text-align: center;
  color: #000000;
  display: flex;                /* ✅ ใช้ flex ให้อยู่กลาง */
  justify-content: center;
  align-items: center;
  }
  .heroCard__btn {
  position: absolute;
  bottom: 24px;
  right: 24px;
  background: linear-gradient(90deg, #FF7F49 30%, #FFBC6A 63%, #9CE3DC 100%);
  color: white;
  weight:600;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

  .ConcertDetail__image {
    width: 100%;
    height: auto;
    max-width: 520px;
    object-fit: cover;
    border-radius: 12px;
    margin: 0 auto;
    display: block;
  }

  p {
    margin-top: 1px;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.5;
    max-width: 730px;
    text-align: left;
  }  
`;

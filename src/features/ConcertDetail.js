// src/features/ConcertDetail.jsx
// --- ConcertDetail.jsx ---
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function ConcertDetail({ className }) {
  const { id } = useParams();
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await axios.get(`http://localhost:4000/products/${id}`);
        if (alive) setConcert(res.data ?? null);
      } catch (e) {
        if (alive) setError(e?.response?.data?.message || e.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (concert) alert(`Buy: ${concert.name || 'Unknown'}`);
  };

  if (loading) return <div className={className}>Loading…</div>;
  if (error) return <div className={className}>Error: {error}</div>;
  if (!concert) return <div className={className}>Not found</div>;

  const productImage = require(`../assets/${concert.image}`);

  return (
    <div className={className}>
      <section className="hero-section">
        <div className='hero__card'>
          <img className="hero__image" src={productImage} alt={concert.name || 'Concert'} />
          <div className='hero__detail'>
            <h1>{concert.name}</h1>
            {concert.date && <h3 className="ConcertCard__date">วันที่ {concert.date}</h3>}
            {concert.time && <h3 className="ConcertCard__time">เวลา: {concert.time}</h3>}
            {concert.location && <h3 className="ConcertCard__location">{concert.location}</h3>}
            <button type="button" className="hero__btn" onClick={onSubmit}>Buy Ticket</button>
          </div>
        </div>
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
  gap: 8px;

  .hero-section {
  background-color:#FFE8DE;
  width: 100vw;
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
  .hero__image{
    width: 300px;
    height: 100%;
    padding: 20px 20px 20px 20px;
    object-fit: cover;
    object-position: top;
    border-radius: 12px;
    display: block;
  }
  .hero__card{
    display:flex;
    background-color:#ffffff;
    line-height: 1.5;
    border-radius: 12px;
    width: 70%;
    position: relative;
    }
  .hero__detail{
    text-align: left;
    padding: 0px;
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
    margin-top: 8px;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.5;
    max-width: 730px;
    text-align: left;
  }  
`;

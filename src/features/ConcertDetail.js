// src/features/ConcertDetail.jsx
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
  if (error)   return <div className={className}>Error: {error}</div>;
  if (!concert) return <div className={className}>Not found</div>;

  const productImage = require(`../assets/${concert.image}`);
  const rawImg = concert.image || concert.imageURL || 'placeholder.png';
  const imgSrc = encodeURI(rawImg);

  return (
    <div className={className}>
      <h1>{concert.name}</h1>
      <img className="ConcertDetail__image"src={productImage} alt={concert.name || 'Concert'}/>
      <p>{concert.description}</p>
      <form id="create-form" onSubmit={onSubmit}>
        <button type="submit" className="btn">Buy Now</button>
      </form>
    </div>
  );
}

export default styled(ConcertDetail)`
  padding: 96px 24px 24px;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
  display: grid;
  gap: 16px;

  .ConcertDetail__image {
    width: 100%;
    height: 100%;
    max-width: 520px;
    object-fit: cover;
    border-radius: 12px;
    background: #f5f5f5;
    margin: 0 auto;
    display: block;
  }
    p {
    font-weight: 700;
    front-size: 18 px;
    }

  .btn {
    background: #FF8B59;
    border: 0;
    color: #fff;
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
  }
`;

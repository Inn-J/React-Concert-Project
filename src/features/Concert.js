// src/features/ConcertList.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConcertCard from './ConcertCard';
import concertsData from '../data/products.json'; // โหลดตรงจาก src

export default function ConcertList() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    setConcerts(Array.isArray(concertsData) ? concertsData.filter(Boolean) : []);
  }, []);

  if (!concerts.length) {
    return <Wrap>ไม่มีคอนเสิร์ตให้แสดง</Wrap>;
  }

  return (
    <Wrap>
      <h1>New Concerts</h1>
      <Grid>
        {concerts.map((concert) => (
          <ConcertCard key={concert.id ?? crypto.randomUUID()} item={concert} />
        ))}
      </Grid>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 96px 24px 24px;
`;

const Grid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex; 
  flex-wrap: wrap; 
  gap: 24px;
`;

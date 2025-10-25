// src/features/ConcertList.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConcertCard from './ConcertCard';
import concertsData from '../data/products.json';

export default function ConcertList() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    setConcerts(Array.isArray(concertsData) ? concertsData.filter(Boolean) : []);
  }, []);

  if (!concerts.length) {
    return <Wrap>ไม่มีคอนเสิร์ตให้แสดง</Wrap>;
  }

  const processedConcerts = concerts.map((concert) => ({
  ...concert,
  parsedDate: parseConcertDate(concert.date),
  }));

  return (
    <Wrap>
      <Header>Incoming Concerts</Header>
      <Grid>
        {processedConcerts
        .filter((concert) => isWithinNextMonth(concert.date))
        .sort((a, b) => a.parsedDate - b.parsedDate)
        .slice(0, 4)
        .map((concert) => (
      <ConcertCard key={concert.id ?? crypto.randomUUID()} item={concert} />
        ))}
      </Grid>
    </Wrap>
  );
}

function isWithinNextMonth(concertDateStr) {
  const now = new Date();
  const nextMonth = new Date(now);
  nextMonth.setMonth(now.getMonth() + 1);
  nextMonth.setDate(31);

  const concertDate = parseConcertDate(concertDateStr);
  if (!concertDate) return false;

  return concertDate >= now && concertDate <= nextMonth;
}

function parseConcertDate(concertDateStr) {
  const monthMap = {
    'ม.ค.': 0, 'ก.พ.': 1, 'มี.ค.': 2, 'เม.ย.': 3, 'พ.ค.': 4, 'มิ.ย.': 5,
    'ก.ค.': 6, 'ส.ค.': 7, 'ก.ย.': 8, 'ต.ค.': 9, 'พ.ย.': 10, 'ธ.ค.': 11,
  };

  const rangeMatch = concertDateStr.match(/(\d{1,2})\s*-\s*(\d{1,2})\s(.*?)\s(\d{4})/);
  const singleMatch = concertDateStr.match(/(\d{1,2})\s(.*?)\s(\d{4})/);

  if (rangeMatch) {
    const startDay = parseInt(rangeMatch[1]);
    const month = monthMap[rangeMatch[3]];
    const year = parseInt(rangeMatch[4]);
    return new Date(year, month, startDay);
  } else if (singleMatch) {
    const day = parseInt(singleMatch[1]);
    const month = monthMap[singleMatch[2]];
    const year = parseInt(singleMatch[3]);
    return new Date(year, month, day);
  }

  return null;
}

const Wrap = styled.div`
  padding: 24px 24px 24px;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #000;
  text-align: center;
`;

const Grid = styled.ul`
  llist-style: none;
  padding: 0;
  margin: 0 auto;    
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px 32px;
`;

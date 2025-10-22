import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import concertsData from '../data/products.json';
import ConcertCard from './ConcertCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScrollConcert() {
  const [concerts, setConcerts] = useState([]);
  const [current, setCurrent] = useState(0); // index ของการ์ดกลาง

  useEffect(() => {
    if (Array.isArray(concertsData)) {
      setConcerts(concertsData.filter(Boolean));
    }
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % concerts.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + concerts.length) % concerts.length);
  };

  if (!concerts.length) return <Wrap>ไม่มีคอนเสิร์ตแนะนำ</Wrap>;

  // จำนวนการ์ดที่แสดง (2 ซ้าย + 1 กลาง + 2 ขวา)
  const visibleCount = 5;

  const getOffset = (index) => {
    const total = concerts.length;
    let diff = (index - current + total) % total;
    if (diff > total / 2) diff -= total; // ปรับให้หมุนได้ทั้งซ้ายขวา
    return diff;
  };

  return (
    <Wrap>
      <h1>Recommended Events</h1>
      <CarouselContainer>
        <Button onClick={prev}>
          <ChevronLeft size={32} />
        </Button>

        <CardArea>
          {renderCards(concerts, current, visibleCount, getOffset)}
        </CardArea>

        <Button onClick={next}>
          <ChevronRight size={32} />
        </Button>
      </CarouselContainer>
    </Wrap>
  );
}


  function renderCards(concerts, current, visibleCount, getOffset) {
  return concerts.map((concert, i) => {
    const offset = getOffset(i);
    const absOffset = Math.abs(offset);
    if (absOffset > Math.floor(visibleCount / 2)) return null;

    const scale = 1 - absOffset * 0.10;
    const opacity = 1 - absOffset * 0.15;
    const translateX = offset * 275; //
    const translateY = absOffset * 20; //

    return (
      <CardWrapper
        key={i}
        style={{
          transform: `translate(-50%, ${translateY}px) translateX(${translateX}px) scale(${scale})`,
          opacity,
          zIndex: visibleCount - absOffset,
        }}
      >
        <ConcertCard item={concert} />
      </CardWrapper>
    );
  });
  }



const Wrap = styled.div`
  padding: 64px 0;
  text-align: center;
  background-color: #f8f4ec;

  h1 {
    font-weight: 700;
    margin-bottom: 40px;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const CardArea = styled.div`
  position: relative;
  width: 1400px;
  height: 600px;
`;

const CardWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform-origin: center center;
  transition: all 0.6s ease;
  width: 280px;
  height: 550px;
`;

const Button = styled.button`
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: background 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import concertsData from '../data/products.json';
import ConcertCard from './ConcertCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScrollConcert() {
  const [concerts, setConcerts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(concertsData)) {
      setConcerts(concertsData.filter(Boolean));
    }
  }, []);

  const scrollByAmount = (offset) => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    const { scrollLeft, scrollWidth, clientWidth } = scroll;

    // ✅ ถ้าอยู่ขวาสุดแล้วกดขวาอีก → กลับไปซ้ายสุด
    if (scrollLeft + clientWidth >= scrollWidth - 10 && offset > 0) {
      scroll.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    // ✅ ถ้าอยู่ซ้ายสุดแล้วกดซ้าย → เด้งไปขวาสุด
    if (scrollLeft <= 0 && offset < 0) {
      scroll.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      return;
    }

    // ปกติ → เลื่อนตามปุ่ม
    scroll.scrollBy({ left: offset, behavior: 'smooth' });
  };

  if (!concerts.length) return <Wrap>ไม่มีคอนเสิร์ตแนะนำ</Wrap>;

  return (
    <Wrap>
      <h1>IN COMMING</h1>
      <CarouselContainer>
        <ScrollButtonLeft onClick={() => scrollByAmount(-320)}>
          <ChevronLeft size={32} />
        </ScrollButtonLeft>

        <ScrollArea ref={scrollRef}>
          {concerts.map((concert, index) => (
            <CardWrapper key={index}>
              <ConcertCard item={concert} />
            </CardWrapper>
          ))}
        </ScrollArea>

        <ScrollButtonRight onClick={() => scrollByAmount(320)}>
          <ChevronRight size={32} />
        </ScrollButtonRight>
      </CarouselContainer>
    </Wrap>
  );
}

// ---------- styled-components ----------
const Wrap = styled.div`
  padding: 64px 0;
  text-align: center;
  overflow: hidden;

  h1 {
    margin-bottom: 32px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 16px;
  justify-content: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardWrapper = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.8;
  transform: scale(0.9);

  &:hover {
    opacity: 1;
    transform: scale(1);
  }
`;

const ScrollButtonLeft = styled.button`
  position: absolute;
  left: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background: white;
  }
`;

const ScrollButtonRight = styled(ScrollButtonLeft)`
  left: auto;
  right: 0;
`;

import React from 'react';
import styled from 'styled-components';
import ScrollConcert from './ConcertScroll';
import Concertlist from './Concertlist';

export default function Home() {
  return (
    <HomeWrap>
      <ScrollSection>
        <ScrollConcert />
      </ScrollSection>
      <ListSection>
        <Concertlist />
      </ListSection>
    </HomeWrap>
  );
}

const HomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px; 
  width: 100%;
  padding-top: 80px;
  box-sizing: border-box;
`;

const ScrollSection = styled.section`
  width: 100%;
  max-width: 1600px;
`;

const ListSection = styled.section`
  width: 100%;
  max-width: 1600px;
`;
import React from 'react';
import styled from 'styled-components';
import ScrollConcert from './3DConcertlist';
import Concertlist from './Concertlist';
import IncommingConcertlist from './IncomingConcertlist';

export default function Home() {
  return (
    <HomeWrap>
      <ScrollSection>
        <ScrollConcert />
      </ScrollSection>
      <ListSection>
        <IncommingConcertlist />
      </ListSection>
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
  gap: 24px; 
  width: 100%;
  padding-top: 40px;
  box-sizing: border-box;
`;

const ScrollSection = styled.section`
  width: 100%;
  max-width: 1400px;
`;

const ListSection = styled.section`
  width: 100%;
  max-width: 1600px;
`;
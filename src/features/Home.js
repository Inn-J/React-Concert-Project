import React from 'react';
import styled from 'styled-components';
import ScrollConcert from './Concert_Recommed';
import Concertlist from './Concertlist';
import IncommingConcertlist from './Concert_Incoming';
import Concert_Banner from './Concert_Banner';

export default function Home() {
  return (
    <HomeWrap>
      <ListSection>
        <Concert_Banner />
      </ListSection>
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
  max-width: 1600px;
`;

const ListSection = styled.section`
  width: 100%;
  max-width: 1600px;
`;
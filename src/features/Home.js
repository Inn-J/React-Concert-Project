import React from 'react';
import styled from 'styled-components';
import ScrollConcert from './Homecomponent/Concert_Recommed';
import Concertlist from './Homecomponent/Concert_list';
import IncommingConcertlist from './Homecomponent/Concert_Incoming';
import Concert_Banner from './Homecomponent/Concert_Banner';

export default function Home({ products }) {
  return (
    <HomeWrap>
      <ListSection>
        <Concert_Banner products={products}/>
      </ListSection>
      <ScrollSection>
        <ScrollConcert products={products}/>
      </ScrollSection>
      <ListSection>
        <IncommingConcertlist products={products}/>
      </ListSection>
      <ListSection>
        <Concertlist products={products}/>
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
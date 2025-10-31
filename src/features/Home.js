import React from 'react';
import styled from 'styled-components';
import Concert_Recommed from './Homecomponent/Concert_Recommed';
import Concert_List from './Homecomponent/Concert_List';
import Concert_Incoming from './Homecomponent/Concert_Incoming';
import Concert_Banner from './Homecomponent/Concert_Banner';

export default function Home({ products }) {
  return (
    <HomeWrap>
      <ListSection>
        <Concert_Banner products={products}/>
      </ListSection>
      <ScrollSection>
        <Concert_Recommed products={products}/>
      </ScrollSection>
      <ListSection>
        <Concert_Incoming products={products}/>
      </ListSection>
      <ListSection>
        <Concert_List products={products}/>
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
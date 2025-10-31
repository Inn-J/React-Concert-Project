import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ConcertCard from "./ConcertCard";

export default function Concert_List({ products }) {
  const [concerts, setConcerts] = useState([]);
  const [category, setCategory] = useState("See All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (Array.isArray(products)) {
      setConcerts(products.filter(Boolean));
    }
  }, [products?.length]);

  const categories = [
    "See All",
    "Art Exhibition",
    "Concert/Musical",
    "Fan meeting",
    "Festival",
  ];

  const filteredConcerts =
    category === "See All"
      ? concerts
      : concerts.filter((concert) => concert.Category === category);

  const displayConcerts = showAll ? concerts : filteredConcerts.slice(0, 8);

  return (
    <Wrap>
      <Header>Explore All Events</Header>

      <CategoryBar>
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            active={category === cat}
            onClick={() => {
              setCategory(cat);
              setShowAll(false); // รีเซ็ตกลับเมื่อเปลี่ยน category
            }}
          >
            {cat}
          </CategoryButton>
        ))}
      </CategoryBar>

      <Grid>
        {displayConcerts.map((concert) => (
          <ConcertCard key={concert.id ?? crypto.randomUUID()} item={concert} />
        ))}
      </Grid>

      <ViewAllButton onClick={() => setShowAll((prev) => !prev)}>
        {showAll ? "Show less" : "View all events"}
      </ViewAllButton>

    </Wrap>
  );
}

const Wrap = styled.div`
  background-color: #f8f4eb;
  padding: 24px;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #000;
`;

const CategoryBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const CategoryButton = styled.button`
  background-color: ${(props) => (props.active ? "#4da9ff" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  border-radius: 24px;
  padding: 8px 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4da9ff;
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ViewAllButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 24px;
  padding: 10px 28px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: #4da9ff;
    color: white;
  }
`;

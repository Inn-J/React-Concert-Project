import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const req = require.context("../../assets", false, /\.(png|jpe?g|gif|webp|avif)$/);
const imagesMap = req.keys().reduce((acc, key) => {
  const filename = key.replace("./", "");
  acc[filename] = req(key);
  return acc;
}, {});
const getImage = (filename) => imagesMap[filename] || imagesMap["placeholder.png"];

export default function BannerConcert( {products} ) {
  const [concerts, setConcerts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    
    if (Array.isArray(products)) {
      const withBanner = products.filter(
        (item) => item && (item.banner || item.Banner)
      );
      setConcerts(withBanner);
    }
  }, [products?.length]);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? concerts.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === concerts.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!concerts.length) {
    return <Wrap>ไม่มีอีเวนต์ที่มีแบนเนอร์ให้แสดง</Wrap>;
  }

  const currentConcert = concerts[currentIndex];
  const bannerImg = getImage(currentConcert.banner || currentConcert.Banner);

  return (
    <Wrap>
      <h1>Recommended Events</h1>
      <CarouselContainer>
        <Button onClick={prev}>
          <ChevronLeft size={32} />
        </Button>

        <StyledLink to={`/concert-detail/${currentConcert.id}`}>
          <BannerCard>
            <BannerImage
              src={bannerImg}
              alt={currentConcert.name || "Event Banner"}
            />
          </BannerCard>
        </StyledLink>

        <Button onClick={next}>
          <ChevronRight size={32} />
        </Button>
      </CarouselContainer>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 24px 0;
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
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const BannerCard = styled.div`
  position: relative;
  width: 1200px;
  height: 550px;
  border-radius: 24px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
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

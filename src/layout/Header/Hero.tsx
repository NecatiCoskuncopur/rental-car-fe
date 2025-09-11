import React, { useRef } from 'react';

import { FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';

import { Button, Container, Title, VehicleSearch } from '@/components';
import theme from '@/theme';

const { colors, device } = theme;

const Hero = () => {
  const vehicleSearchRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToSearch = () => {
    vehicleSearchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <img src={process.env.NEXT_PUBLIC_HERO_BG_IMAGE_URL} alt="Hero Background" />
      </ImageWrapper>
      <HeroImage>
        <img src={process.env.NEXT_PUBLIC_HERO_IMAGE_URL} alt="Hero" />
      </HeroImage>
      <Content>
        <Container>
          <TextWrapper>
            <Title $variant="xxsmall" $mb="8px">
              Plan your trip now
            </Title>
            <Title $variant="xlarge" $mb="20px">
              Save big with our car rental
            </Title>
            <p>To contribute to positive change and achieve our sustainability goals with many extraordinary</p>
            <Button onClick={handleScrollToSearch} $variant="gradientLarge">
              Book Ride
              <FaCheckCircle />
            </Button>
          </TextWrapper>
        </Container>
      </Content>
      <div ref={vehicleSearchRef}>
        <VehicleSearch />
      </div>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  min-height: 100vh;
  max-width: 100vw;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 220px 0;
  width: 100%;
  overflow-x: hidden;
  background-color: #f8f8f8;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: -60px;
  @media ${device.laptop} {
    display: none;
  }
`;

const HeroImage = styled.div`
  position: absolute;
  top: 220px;
  right: -60px;

  @media ${device.tablet} {
    display: none;
  }
  img {
    width: 100%;
    max-width: 992px;
    height: auto;
  }

  @media ${device.laptop} {
    right: -20px;
    img {
      max-width: 450px;
    }
  }
`;

const TextWrapper = styled.div`
  width: 42%;
  color: ${colors.richBlack};
  padding: 10px;
  p {
    color: ${colors.mutedPurple};
    font-family: 'Rubik', Sans-serif;
    line-height: 24px;
    letter-spacing: -0.24px;
    margin: 10px 0 30px;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

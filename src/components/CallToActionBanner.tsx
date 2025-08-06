import React from 'react';

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { fadeInUp } from '@/animations';
import theme from '@/theme';
import Container from './Container';
import Title from './Title';

const { colors, device, typography } = theme;
const CallToActionBanner = () => {
  const imageUrl = process.env.NEXT_PUBLIC_CAR_ACTION_IMAGE_URL as string;
  const isMobile = useMediaQuery({ query: theme.device.laptop });

  return (
    <Wrapper $backgroundUrl={imageUrl} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <FlexContainer>
        <TextWrapper>
          {isMobile ? (
            <Title variant="large" mb="10px">
              Save big with our cheap car rental!
            </Title>
          ) : (
            <Title variant="xxlarge" lineHeight="62px" letterSpacing="-1.36px" mb="10px">
              Save big with our cheap car rental!
            </Title>
          )}

          <p>Top Airports. Local Suppliers. 24/7 Support.</p>
        </TextWrapper>
        <ButtonWrapper>
          <Button>
            Book Ride
            <FaCheckCircle />
          </Button>
        </ButtonWrapper>
      </FlexContainer>
    </Wrapper>
  );
};

export default CallToActionBanner;

const Wrapper = styled(motion.section)<{ $backgroundUrl: string }>`
  background-color: ${colors.carbonGray};
  background-image: url(${props => props.$backgroundUrl});
  background-position: top right;
  background-repeat: no-repeat;
  background-size: auto;
  padding: 90px 0 75px;
  position: relative;
  z-index: 0;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: ${colors.carbonGray};
    opacity: 0.4;
    z-index: -1;
  }
`;

const FlexContainer = styled(Container)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const TextWrapper = styled.div`
  width: 55%;
  color: ${colors.white};
  p {
    font-size: ${typography.fontSizes.$8};
    line-height: 28px;
    letter-spacing: -0.72px;
    margin: 10px 0;
  }
  @media ${device.laptop} {
    width: 100%;
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  @media ${device.laptop} {
    width: 100%;
    justify-content: center;
  }
`;

const Button = styled.button`
  font-family: 'Rubik', Sans-serif;
  padding: 19px 27px;
  color: ${colors.white};
  font-size: ${typography.fontSizes.$5};
  font-weight: ${typography.fontWeights.medium};
  line-height: 22px;
  letter-spacing: -0.36px;
  background-color: transparent;
  background-image: linear-gradient(100deg, #ff4c30 40%, #ff6830 100%);
  border-style: none;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0px 10px 15px 0px rgba(255, 83, 48, 0.35);
  cursor: pointer;
  transition: all 400ms ease;
  &:hover {
    background-image: linear-gradient(100deg, #f0561d 40%, #922919 100%);
  }
`;

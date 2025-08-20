import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styled from 'styled-components';

import theme from '@/theme';

const { colors, typography } = theme;
const NotFound = () => {
  const mockImage =
    'https://firebasestorage.googleapis.com/v0/b/rental-car-bf85b.appspot.com/o/37594550-f5de-48ea-95e2-143402fe559b_404.png?alt=media&token=5e439dc2-c026-4a02-9160-c15888bf5972'; // Resim değişecek

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={mockImage} alt="404" fill sizes="(max-width: 768px) 100vw, 50vw" priority={true} style={{ objectFit: 'contain' }} />
      </ImageWrapper>
      <h1>Oops! Page not found!</h1>
      <p>The page you requested was not found</p>

      <Button href="/">Back To Home</Button>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.section`
  padding: 48px;
  margin: 40px auto;
  max-width: 600px;
  text-align: center;
  width: 100%;

  h1 {
    color: ${colors.blackGray};
    margin-bottom: 12px;
    font-size: ${typography.fontSizes.$7};
    font-weight: ${typography.fontWeights.bold};
  }
  p {
    margin: auto auto 28px;
    color: ${colors.darkGray};
    font-weight: ${typography.fontWeights.medium};
  }
`;

const ImageWrapper = styled.div`
  margin-bottom: 48px;
  width: 100%;
  height: auto;
  position: relative;
  aspect-ratio: 2 / 1;
`;

const Button = styled(Link)`
  font-family: 'Rubik', Sans-serif;
  line-height: 20px;
  font-size: ${typography.fontSizes.$4};
  font-weight: ${typography.fontWeights.medium};
  color: ${colors.white};
  background-color: ${colors.vibrantRed};
  border-style: none;
  border-radius: 3px;
  padding: 15px 30px;
  box-shadow: 0px 10px 15px 0px rgba(255, 83, 48, 0.35);
  display: inline-block;
  &:hover {
    color: ${colors.white};
  }
`;

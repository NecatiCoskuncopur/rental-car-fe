import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';

import theme from '@/theme';

const { colors, typography } = theme;
const NotFound = () => {
  const imageUrl = process.env.NEXT_PUBLIC_NOT_FOUND_IMAGE_URL as string;

  return (
    <Wrapper $imageUrl={imageUrl}>
      <TextWrapper>
        <h1>404</h1>
        <p>
          The page you are looking for is missing or currently unavailable. Please use the correct link or visit <Link href="/">homepage.</Link>
        </p>
      </TextWrapper>
    </Wrapper>
  );
};

export default NotFound;
NotFound.minimalLayout = true;

const Wrapper = styled.section<{ $imageUrl: string }>`
  width: 100%;
  height: 100vh;
  background-image: url(${props => props.$imageUrl});
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  max-width: 500px;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    font-size: 170px;
    color: ${colors.white};
  }
  p {
    font-size: ${typography.fontSizes.$5};
    color: ${colors.mutedPurple};
    line-height: 24px;
  }
  a {
    color: ${colors.accentRed};
    transition: 300ms all ease-in-out;
    &:hover {
      color: ${colors.white};
    }
  }
`;

import React from 'react';
import { usePathname } from 'next/navigation';

import { FaPhoneAlt } from 'react-icons/fa';
import styled from 'styled-components';

import { Container, Title } from '@/components';
import theme from '@/theme';

const { colors, device, typography } = theme;
const FooterBanner = () => {
  const pathname = usePathname();

  const homeBanner = process.env.NEXT_PUBLIC_FOOTER_HOME_BANNER_IMAGE_URL as string;
  const googlePlayUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL;
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL;
  const pageBanner = process.env.NEXT_PUBLIC_FOOTER_PAGE_BANNER_IMAGE_URL as string;

  return pathname === '/' ? (
    <HomeWrapper $backgroundUrl={homeBanner}>
      <Container>
        <HomeContent>
          <Title $variant="large" $mb="25px">
            Download our app to get most out of it
          </Title>
          <p>
            Unlock exclusive offers, instant discounts, and personalized experiences by downloading our app. Manage all your needs in one place and stay ahead
            with real-time updates.
          </p>
          <ImageWrapper>
            <img src={googlePlayUrl} alt="google play" />
            <img src={appStoreUrl} alt="app store" />
          </ImageWrapper>
        </HomeContent>
      </Container>
    </HomeWrapper>
  ) : (
    <PageWrapper $backgroundUrl={pageBanner}>
      <Container>
        <PageContent>
          <Title $variant="medium">Book a car by getting in touch with us</Title>
          <Number>
            <p>
              <FaPhoneAlt size={14} />
              <span>Call to book</span>
            </p>
            <Title $variant="medium">(123) 498-4600</Title>
          </Number>
        </PageContent>
      </Container>
    </PageWrapper>
  );
};

export default FooterBanner;

const HomeWrapper = styled.section<{ $backgroundUrl: string }>`
  background-color: ${colors.offWhite};
  background-image: url(${props => props.$backgroundUrl});
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 100px 0;
  @media ${device.tablet} {
    padding: 70px 0;
  }
`;

const HomeContent = styled.div`
  max-width: 543px;
  padding: 10px;
  p {
    color: ${colors.mutedPurple};
    line-height: 25px;
    letter-spacing: -0.24px;
    margin-bottom: 35px;
  }
  @media ${device.tablet} {
    max-width: 485px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 10px 0;
  @media ${device.tablet} {
    gap: 10px;
    img {
      width: 175px;
    }
  }
`;

const PageWrapper = styled.section<{ $backgroundUrl: string }>`
  background-image: url(${props => props.$backgroundUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 30px 0;
  position: relative;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: ${colors.carbonGray};
    opacity: 0.8;
    z-index: -1;
  }
`;

const PageContent = styled.div`
  color: ${colors.white};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  h1 {
    width: 50%;
    padding: 10px;
    @media ${device.laptop} {
      width: 100%;
      text-align: center;
    }
  }
`;

const Number = styled.div`
  width: 50%;
  text-align: right;
  padding: 10px;
  p {
    font-size: ${typography.fontSizes.$5};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-left: 100px;
  }
  h1 {
    color: ${colors.coralRed};
    width: 100%;
    padding: 0;
  }
  @media ${device.laptop} {
    width: 100%;
    text-align: center;
    p {
      margin-left: 0;
    }
  }
`;

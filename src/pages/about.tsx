import React from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { fadeInUp } from '@/animations';
import { CallToActionBanner, Container, HowItWorks, Title, WhyChooseUs } from '@/components';
import { Outlets, Parking, Transportation } from '@/icons';
import theme from '@/theme';

const { colors, device, typography } = theme;
const About = () => {
  const imageUrl = process.env.NEXT_PUBLIC_ABOUT_IMAGE_URL as string;

  return (
    <>
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <StyledContainer>
          <ImageWrapper>
            <Image src={imageUrl} alt="About" fill sizes="(max-width: 768px) 100vw, 40vw" priority />
          </ImageWrapper>

          <ContentWrapper>
            <Title $variant="xxsmall" $mb="8px">
              About Company
            </Title>
            <Title $variant="large" $mb="30px">
              You start the engine and your adventure begins
            </Title>
            <p>
              At PrimeDrive Rentals, we believe that every journey deserves comfort, safety, and style. Whether you're traveling for business or leisure, our
              wide range of reliable vehicles ensures the perfect match for your needs. With flexible plans, friendly support, and a passion for service, we're
              here to drive your experiences forward—miles ahead.
            </p>

            <ul>
              <ListItem>
                <Transportation />
                <TextWrapper>
                  20 <span>Car Types</span>
                </TextWrapper>
              </ListItem>
              <ListItem>
                <Outlets />
                <TextWrapper>
                  85 <span>Rental Outlets</span>
                </TextWrapper>
              </ListItem>
              <ListItem>
                <Parking />
                <TextWrapper>
                  75 <span>Repair Shops</span>
                </TextWrapper>
              </ListItem>
            </ul>
          </ContentWrapper>
        </StyledContainer>
      </motion.div>
      <HowItWorks />
      <CallToActionBanner />
      <WhyChooseUs />
    </>
  );
};

export default About;

const StyledContainer = styled(Container)`
  padding: 90px 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  width: 40%;
  padding: 10px;
  position: relative;
  z-index: -1;
  aspect-ratio: 461 / 478;
  img {
    padding: 20px;
    margin: 10px 0;
    object-fit: contain;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  width: 60%;
  color: ${colors.richBlack};
  padding: 25px 100px 0px 80px;
  p {
    line-height: 25px;
    letter-spacing: -0.24px;
    color: ${colors.mutedPurple};
    margin: 10px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid ${colors.veryLightGray};
  }
  ul {
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  @media ${device.tablet} {
    width: 100%;
    padding: 10px;
  }
`;

const ListItem = styled.li`
  width: calc(100% / 3);
  color: ${colors.vibrantOrange};
  @media ${device.laptop} {
    width: 50%;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.richBlack};
  font-family: 'Poppins', Sans-serif;
  font-size: ${typography.fontSizes.$15};
  font-weight: ${typography.fontWeights.bold};
  letter-spacing: -1.56px;
  margin-top: 20px;
  span {
    color: ${colors.mutedPurple};
    font-family: 'Rubik', Sans-serif;
    font-size: ${typography.fontSizes.$4};
    font-weight: ${typography.fontWeights.medium};
    line-height: 18px;
    letter-spacing: -0.24px;
    padding: 0 16px;
    margin-left: 10px;
  }
`;

import React from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { fadeInUp } from '@/animations';
import { CarSelect, Drive, Operator } from '@/icons';
import theme from '@/theme';
import Container from './Container';
import Title from './Title';

const { colors, device } = theme;
const HowItWorks = () => {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <StyledContainer>
        <Title $variant="xxsmall" $mb="8px">
          How It Works
        </Title>
        <Title $variant="large" $mb="50px">
          Quick & easy car rental
        </Title>
        <ul>
          <ListItem>
            <CarSelect />
            <TextWrapper>
              <Title $variant="small" $mb="10px">
                Select Car
              </Title>
              <p>Choose from a wide range of high-quality vehicles tailored to suit your comfort and travel needs.</p>
            </TextWrapper>
          </ListItem>
          <ListItem>
            <Operator />
            <TextWrapper>
              <Title $variant="small" $mb="10px">
                Contact Operator
              </Title>
              <p>Get in touch with our support team for fast assistance, booking help, or personalized recommendations.</p>
            </TextWrapper>
          </ListItem>
          <ListItem>
            <Drive />
            <TextWrapper>
              <Title $variant="small" $mb="10px">
                Let's Drive
              </Title>
              <p>Start your journey with confidence and enjoy a seamless rental experience from pickup to return.</p>
            </TextWrapper>
          </ListItem>
        </ul>
      </StyledContainer>
    </motion.div>
  );
};

export default HowItWorks;

const StyledContainer = styled(Container)`
  padding: 100px 0 25px;
  text-align: center;
  color: ${colors.richBlack};
  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
  }
`;

const ListItem = styled.li`
  width: calc(100% / 3);
  padding: 0 30px;
  @media ${device.laptop} {
    width: 100%;
  }
`;

const TextWrapper = styled.div`
  p {
    color: ${colors.mutedPurple};
    line-height: 23px;
    letter-spacing: -0.24px;
  }
`;

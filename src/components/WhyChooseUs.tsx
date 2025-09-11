import React from 'react';

import { motion } from 'framer-motion';
import { FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components';

import { coinFlip, fadeInUp } from '@/animations';
import { Charge, CrossCountry, Price } from '@/icons';
import theme from '@/theme';
import Button from './Button';
import Container from './Container';
import Title from './Title';

const { colors, device } = theme;
const WhyChooseUs = () => {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <FlexContainer>
        <TextWrapper>
          <Title $variant="xxsmall" $mb="8px">
            Why Choose Us
          </Title>
          <Title $variant="large" $mb="25px">
            Best valued deals you will ever find
          </Title>
          <p>
            Thrown shy denote ten ladies though ask saw. Or by to he going think order event music. Incommode so intention defective at convinced. Led income
            months itself and houses you.
          </p>
          <Button $variant="accent">
            Find Deals <FaAngleRight />
          </Button>
        </TextWrapper>
        <List>
          <ListItem>
            <CrossCountry />
            <div>
              <Title $variant="xsmall" $mb="10px">
                Cross Country Drive
              </Title>
              <p> Experience freedom on the open road with seamless cross-country travel options tailored for long-distance comfort and reliability.</p>
            </div>
          </ListItem>
          <ListItem>
            <Price />
            <div>
              <Title $variant="xsmall" $mb="10px">
                All inclusive pricing
              </Title>
              <p> Enjoy transparent pricing with no surprises—insurance, taxes, and service fees are all included for your convenience.</p>
            </div>
          </ListItem>
          <ListItem>
            <Charge />
            <div>
              <Title $variant="xsmall" $mb="10px">
                No hidden charges
              </Title>
              <p> What you see is what you pay. Our clear pricing ensures peace of mind without any unexpected costs at checkout.</p>
            </div>
          </ListItem>
        </List>
      </FlexContainer>
    </motion.div>
  );
};

export default WhyChooseUs;

const FlexContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 100px 16px 70px;
`;

const TextWrapper = styled.div`
  width: 48%;
  color: ${colors.richBlack};
  p {
    color: ${colors.mutedPurple};
    margin: 10px 0;
    line-height: 25px;
    letter-spacing: -0.24px;
  }
  @media ${device.tablet} {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const List = styled.ul`
  width: 52%;
  @media ${device.tablet} {
    width: 100%;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 0px 20px 7px 120px;
  svg {
    flex-shrink: 0;
    transition: transform 0.6s ease-in-out;
  }
  &:hover {
    svg {
      animation: ${coinFlip} 0.8s ease-in-out;
    }
  }

  div {
    color: ${colors.richBlack};
    p {
      color: ${colors.mutedPurple};
      margin-bottom: 10px;
      line-height: 26px;
      letter-spacing: -0.24px;
    }
  }
  @media ${device.laptop} {
    padding: 10px;
  }
`;

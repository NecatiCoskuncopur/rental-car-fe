import React from 'react';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import styled from 'styled-components';

import { fadeInUp } from '@/animations';
import { Button, Container, Title } from '@/components';
import { footerNavData } from '@/data';
import theme from '@/theme';
import FooterBanner from './FooterBanner';
import FooterBottom from './FooterBottom';
import { Contact, FooterTop, Links, Sub, WorkingHours } from './style';

const Footer = () => {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <FooterBanner />
      <StyledFooter>
        <Container>
          <FooterTop>
            <Contact>
              <Title $variant="xsmall" $mb="30px">
                Rental Car
              </Title>
              <p>Discover a wide range of rental cars to suit every need and budget.</p>
              <ul>
                <li>
                  <a href="tel:(123)498-4600">
                    <FaPhoneAlt />
                    <span> (123) 498-4600</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@rentalcar.com">
                    <FaEnvelope />
                    <span>info@rentalcar.com</span>
                  </a>
                </li>
              </ul>
            </Contact>
            <Links>
              <Title $variant="xsmall" $mb="30px">
                LINKS
              </Title>
              {footerNavData.map(item => (
                <li key={item.href}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </Links>
            <WorkingHours>
              <Title $variant="xsmall" $mb="30px">
                WORKING HOURS
              </Title>
              <li>
                <span>Mon - Fri:</span>
                09:00AM - 09:00PM
              </li>
              <li>
                <span>Sat:</span>
                09:00AM - 07:00PM
              </li>
              <li>
                <span>Sun:</span>
                Closed
              </li>
            </WorkingHours>
            <Sub>
              <Title $variant="xsmall" $mb="30px">
                SUBSCRIPTION
              </Title>
              <p>Subscribe your Email address for latest news & updates.</p>
              <input type="email" placeholder="Enter Email Address" />
              <Button $variant="secondary" $mt="10px">
                Submit
              </Button>
            </Sub>
          </FooterTop>
          <FooterBottom />
        </Container>
      </StyledFooter>
    </motion.div>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  background-color: ${theme.colors.white};
  padding-top: 70px;
`;

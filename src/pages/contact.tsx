import React from 'react';

import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import styled from 'styled-components';

import { ContactForm, Container, Title } from '@/components';
import theme from '@/theme';

const { colors, device } = theme;
const Contact = () => {
  return (
    <>
      <FormWrapper>
        <Info>
          <TextWrapper>
            <Title $variant="large" $mb="25px">
              Need additional information?
            </Title>
            <p>
              A multifaceted professional skilled in multiple fields of research, development as well as a learning specialist. Over 15 years of experience.
            </p>
          </TextWrapper>
          <ul>
            <li>
              <a href="tel:(123)498-4600">
                <FaPhoneAlt />
                <span>(123) 498-4600</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@rentalcar.com">
                <FaEnvelope />
                <span>info@rentalcar.com</span>
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/Vf4NCqhh9SBvfcpN6" target="_blank" rel="noopener noreferrer">
                <FaLocationDot />
                <span>Maden, Yenice 71800 Keskin/Kırıkkale</span>
              </a>
            </li>
          </ul>
        </Info>
        <ContactForm />
      </FormWrapper>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12282.289560357545!2d33.602159272017765!3d39.6818325590139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d4ce2bfc453983%3A0x7584d7fa09a9b0fb!2zTWFkZW4sIFllbmljZSwgNzE4MDAgS2Vza2luL0vEsXLEsWtrYWxl!5e0!3m2!1str!2str!4v1754370088483!5m2!1str!2str"
        width="100%"
        height="454"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

export default Contact;

const FormWrapper = styled(Container)`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 110px 16px 90px;
`;

const Info = styled.div`
  width: 50%;
  padding: 10px;
  color: ${colors.richBlack};
  ul {
    padding-right: 250px;
    li {
      margin-bottom: 15px;
      a {
        line-height: 26px;
        display: flex;
        align-items: center;
        gap: 20px;
      }
    }
  }
  @media ${device.laptop} {
    ul {
      padding-right: 0;
    }
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const TextWrapper = styled.div`
  padding-right: 130px;
  p {
    color: ${colors.mutedPurple};
    line-height: 25px;
    letter-spacing: -0.24px;
    margin: 10px 0;
  }
  @media ${device.laptop} {
    padding-right: 0;
  }
`;

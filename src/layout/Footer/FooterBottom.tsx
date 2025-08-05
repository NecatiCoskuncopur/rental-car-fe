import React from 'react';

import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import styled from 'styled-components';

import theme from '@/theme';

const { colors, device, typography } = theme;
const FooterBottom = () => {
  return (
    <Wrapper>
      <p>
        ©2025 <span>Rental Car</span>. All Rights Reserved
      </p>
      <ul>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com">
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://x.com">
            <FaTwitter />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com">
            <FaYoutube />
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default FooterBottom;

const Wrapper = styled.div`
  padding: 15px 0 25px 0;
  border-top: 1px solid ${colors.neutralGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${typography.fontSizes.$2};
  p {
    color: ${colors.gunmetal};
    padding: 10px;
    span {
      color: ${colors.richBlack};
      font-weight: ${typography.fontWeights.bold};
    }
  }
  ul {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

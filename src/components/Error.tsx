import React from 'react';
import Link from 'next/link';

import { Result } from 'antd';
import styled from 'styled-components';

import theme from '@/theme';

const { colors, typography } = theme;
const Error = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button href="/" type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default Error;

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

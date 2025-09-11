import React from 'react';
import Link from 'next/link';

import { Result } from 'antd';
import styled from 'styled-components';

import Button from './Button';

const Error = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link href="/">
          <StyledButton $variant="primary">Back Home</StyledButton>
        </Link>
      }
    />
  );
};

export default Error;

const StyledButton = styled(Button)`
  display: inline-block;
`;

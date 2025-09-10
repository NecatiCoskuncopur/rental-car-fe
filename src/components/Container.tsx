import styled from 'styled-components';

import theme from '@/theme';

const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
  max-width: 1140px;

  @media ${theme.device.laptop} {
    max-width: 1024px;
  }
  @media ${theme.device.tablet} {
    max-width: 768px;
  }
`;

export default Container;

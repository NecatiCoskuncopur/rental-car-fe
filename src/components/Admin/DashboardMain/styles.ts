import { Typography } from 'antd';
import styled from 'styled-components';

import theme from '@/theme';
const { borderRadius, colors, device, typography } = theme;

const Wrapper = styled.div<{ $variant: 'lg' | 'md' | 'sm' }>`
  background-color: ${colors.white};
  padding: 30px;
  border-radius: ${borderRadius.sm};
  box-shadow:
    rgba(145, 158, 171, 0.3) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  width: ${({ $variant }) => ($variant === 'lg' ? '100%' : $variant === 'md' ? 'calc(66.6667% - 12px)' : 'calc(33.3333% - 16px)')};
  @media ${device.desktop} {
    width: 100%;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

const Row = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin: 24px 16px 0 0;
`;

const Link = styled(Typography.Link)`
  font-size: ${typography.fontSizes.$3};
  font-family: 'Fira Sans', sans-serif;
`;

export { Header, Link, Row, Wrapper };

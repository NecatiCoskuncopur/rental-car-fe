import styled from 'styled-components';

import theme from '@/theme';

const { borderRadius, colors } = theme;

const TableWrapper = styled.div`
  margin: 16px;
  background-color: ${colors.white};
  padding: 30px;
  border-radius: ${borderRadius.sm};
  box-shadow:
    rgba(145, 158, 171, 0.3) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
`;

export default TableWrapper;

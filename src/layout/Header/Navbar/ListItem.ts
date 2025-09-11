import styled from 'styled-components';

import theme from '@/theme';

const { colors, typography } = theme;

const ListItem = styled.li<{ $active: boolean }>`
  font-size: ${typography.fontSizes.$3};
  font-weight: ${typography.fontWeights.medium};
  padding: 10px 0;
  line-height: 1.625;
  transition: all 400ms ease;
  &:hover {
    color: ${colors.accentRed};
  }
  color: ${({ $active }) => ($active ? colors.accentRed : colors.richBlack)};
  a {
    cursor: pointer;
  }
`;

export default ListItem;

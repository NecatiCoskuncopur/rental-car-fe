import styled from 'styled-components';

import theme from '@/theme';
const { borderRadius, colors, device, typography } = theme;

const List = styled.ul`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const Card = styled.li`
  padding: 20px;
  border-radius: ${borderRadius.md};
  box-shadow:
    0 0 2px 0 rgba(145, 158, 171, 0.3),
    0 12px 24px -4px rgba(145, 158, 171, 0.12);
  background-color: ${colors.white};
  width: 100%;
`;

const SmallCard = styled(Card)`
  width: calc(100% / 3 - 24px);

  @media ${device.tablet} {
    width: 100%;
  }
`;

const MediumCard = styled(Card)`
  width: calc(50% - 15px);
  h1 {
    color: ${colors.richBlack};
  }
  p {
    font-size: ${typography.fontSizes.$2};
    color: ${colors.mutedPurple};
    line-height: 24px;
    margin-bottom: 16px;
  }
  @media ${device.laptop} {
    width: 100%;
  }
`;

export { Card, List, MediumCard, SmallCard };

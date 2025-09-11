import styled, { css } from 'styled-components';

import theme from '@/theme';

const { device, typography } = theme;

const variantStyles = {
  xxsmall: css`
    font-size: ${typography.fontSizes.$7};
    font-weight: ${typography.fontWeights.medium};
    line-height: 27px;
    letter-spacing: -0.66px;
  `,

  xsmall: css`
    font-size: ${typography.fontSizes.$8};
    font-weight: ${typography.fontWeights.semiBold};
    line-height: 35px;
    letter-spacing: -0.72px;
  `,

  small: css`
    font-size: 26px;
    font-weight: ${typography.fontWeights.bold};
    line-height: 1.2;
    letter-spacing: -0.78px;
  `,

  medium: css`
    font-size: ${typography.fontSizes.$11};
    font-weight: ${typography.fontWeights.bold};
    line-height: 48px;
    letter-spacing: -0.72px;
  `,

  large: css`
    font-size: ${typography.fontSizes.$13};
    font-weight: ${typography.fontWeights.bold};
    line-height: 52px;
    letter-spacing: -1.32px;

    @media ${device.tablet} {
      font-size: 35px;
      line-height: 42px;
    }
  `,

  xlarge: css`
    font-size: ${typography.fontSizes.$15};
    font-weight: ${typography.fontWeights.bold};
    line-height: 64px;
    letter-spacing: -1.56px;

    @media ${device.tablet} {
      font-size: 35px;
      line-height: 42px;
    }
  `,
};

type Variant = keyof typeof variantStyles;

const Title = styled.h1<{ $variant?: Variant; $mt?: string; $mb?: string }>`
  font-family: 'Poppins', sans-serif;
  margin-top: ${({ $mt }) => $mt || 0};
  margin-bottom: ${({ $mb }) => $mb || 0};
  ${props => variantStyles[props.$variant || 'xxsmall']}
`;

export default Title;

import styled, { css } from 'styled-components';

import theme from '@/theme';

const { borderRadius, colors, typography } = theme;

const variantStyles = {
  primary: css`
    font-size: ${typography.fontSizes.$3};
    line-height: 20px;
    letter-spacing: -0.6px;
    background: ${colors.vibrantRed};
    padding: 15px 30px;
  `,
  secondary: css`
    font-size: ${typography.fontSizes.$4};
    line-height: 26px;
    letter-spacing: -0.32px;
    background: ${colors.accentRed};
    padding: 10px 5px;
  `,
  gradient: css`
    font-size: ${typography.fontSizes.$5};
    line-height: 22px;
    letter-spacing: -0.44px;
    background: linear-gradient(-36deg, ${colors.accentRed} 0, ${colors.brightOrange} 100%);
    padding: 15px;
    &:hover {
      background: linear-gradient(36deg, ${colors.accentRed} 0, ${colors.brightOrange} 100%);
    }
  `,
  large: css`
    font-size: ${typography.fontSizes.$5};
    line-height: 22px;
    letter-spacing: -0.36px;
    background: ${colors.vibrantRed};
    padding: 19px 25px;
  `,
  gradientLarge: css`
    font-size: ${typography.fontSizes.$5};
    line-height: 22px;
    letter-spacing: -0.36px;
    background: linear-gradient(100deg, ${colors.accentRed} 40%, ${colors.brightOrange} 100%);
    padding: 19px 27px;
    &:hover {
      background: linear-gradient(100deg, ${colors.fireOrange} 40%, ${colors.darkBurgundy} 100%);
    }
  `,
  accent: css`
    font-size: ${typography.fontSizes.$5};
    line-height: 22px;
    letter-spacing: -0.36px;
    background: ${colors.accentRed};
    padding: 17px 24px;
    &:hover {
      background: linear-gradient(110deg, ${colors.accentRed} 0%, ${colors.darkBurgundy} 100%);
    }
  `,
};
type Variant = keyof typeof variantStyles;

const Button = styled.button<{ $variant?: Variant }>`
  font-weight: ${typography.fontWeights.medium};
  border-radius: ${borderRadius.xs};
  color: ${colors.white};
  box-shadow: 0px 10px 15px 0px rgba(255, 83, 48, 0.35);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  ${props => variantStyles[props.$variant || 'primary']}
`;

export default Button;

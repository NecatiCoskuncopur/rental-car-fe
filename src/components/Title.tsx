import styled from 'styled-components';

const titleVariants = {
  xxsmall: {
    fontSize: '22px',
    lineHeight: '27px',
    fontWeight: 500,
    letterSpacing: '-0.66px',
  },
  xsmall: {
    fontSize: '24px',
    lineHeight: '35px',
    fontWeight: 600,
    letterSpacing: '-0.72px',
  },
  small: {
    fontSize: '26px',
    lineHeight: '1.2',
    fontWeight: 700,
    letterSpacing: '-0.78px',
  },
  medium: {
    fontSize: '28px',
    lineHeight: '42px',
    fontWeight: 700,
    letterSpacing: '-0.42px',
  },

  large: {
    fontSize: '35px',
    lineHeight: '1.2',
    fontWeight: 700,
    letterSpacing: '-1.36px',
  },
  xlarge: {
    fontSize: '44px',
    lineHeight: '60px',
    fontWeight: 700,
    letterSpacing: '-1.32px',
  },
  xxlarge: {
    fontSize: '52px',
    lineHeight: '64px',
    fontWeight: 700,
    letterSpacing: '-1.56px',
  },
} as const;

export type TitleVariant = keyof typeof titleVariants;

type TitleProps = {
  $variant: TitleVariant;
  $fontSize?: string;
  $fontWeight?: number;
  $lineHeight?: string;
  $fontFamily?: string;
  $letterSpacing?: string;
  $mt?: string;
  $mb?: string;
};

const Title = styled.h1<TitleProps>`
  font-family: ${({ $fontFamily }) => $fontFamily || 'Poppins, sans-serif'};
  font-size: ${({ $fontSize, $variant }) => $fontSize || titleVariants[$variant].fontSize};
  font-weight: ${({ $fontWeight, $variant }) => $fontWeight ?? titleVariants[$variant].fontWeight};
  line-height: ${({ $lineHeight, $variant }) => $lineHeight || titleVariants[$variant].lineHeight};
  letter-spacing: ${({ $letterSpacing, $variant }) => $letterSpacing || titleVariants[$variant].letterSpacing};
  margin-top: ${({ $mt }) => $mt || 0};
  margin-bottom: ${({ $mb }) => $mb || 0};
`;

export default Title;

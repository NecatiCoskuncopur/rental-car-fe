import styled from 'styled-components';

import theme from '@/theme';

const { colors, device, typography } = theme;

const ModalWrapper = styled.section`
  width: 100%;
  height: 100vh;
  background-color: rgba(51, 51, 51, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  padding: 0 16px;
`;

const ContentWrapper = styled.div`
  border: 2px solid ${colors.white};
  max-width: 800px;
  width: 100%;
  background-color: ${colors.white};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: ${colors.accentRed};
    color: ${colors.white};
    svg {
      cursor: pointer;
    }
  }
`;

const ReservationInfo = styled.div`
  padding: 30px;
  display: flex;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: wrap;
  border-bottom: 1px solid ${colors.neutralGray};
`;

const ReservationInnerWrapper = styled.div`
  width: calc(50% - 15px);

  h1 {
    color: ${colors.accentRed};
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 30px;
  font-size: ${typography.fontSizes.$4};
  color: ${colors.mutedPurple};
  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    p:first-of-type {
      color: ${colors.richBlack};
      font-weight: ${typography.fontWeights.semiBold};
      font-size: ${typography.fontSizes.$2};
    }
  }
`;

const StyledImageWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;

  @media ${device.tablet} {
    height: 150px;
  }
`;

const Footer = styled.footer`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export { ContentWrapper, Footer, IconWrapper, ModalWrapper, ReservationInfo, ReservationInnerWrapper, StyledImageWrapper };

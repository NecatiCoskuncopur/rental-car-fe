import styled from 'styled-components';

import theme from '@/theme';

const { colors, device, typography } = theme;

const Contact = styled.div`
  width: 30%;
  padding: 10px;
  p {
    line-height: 26px;
    margin: 0px 20px 37px 0px;
    color: ${colors.mutedPurple};
  }
  li {
    color: ${colors.richBlack};
    margin-bottom: 10px;
    a {
      display: flex;
      align-items: center;
      gap: 14px;
      line-height: 1.625;
    }
  }
  @media ${device.laptop} {
    width: 50%;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const Links = styled.ul`
  width: 18%;
  padding: 10px;
  li {
    line-height: 36px;
    color: ${colors.richBlack};
  }
  @media ${device.laptop} {
    width: 50%;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const WorkingHours = styled.ul`
  width: 26%;
  padding: 10px;
  color: ${colors.richBlack};
  li {
    line-height: 36px;
    color: ${colors.richBlack};
    span {
      color: ${colors.mutedPurple};
      margin-right: 2px;
    }
  }
  @media ${device.laptop} {
    width: 50%;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const Sub = styled.div`
  width: 26%;
  padding: 10px;
  p {
    color: ${colors.mutedPurple};
    line-height: 26px;
    margin-bottom: 20px;
  }
  input {
    background-color: ${colors.lightNeutral};
    border-width: 1px;
    border-style: solid;
    border-color: rgba(2, 1, 1, 0);
    min-height: 48px;
    padding: 10px 60px;
    font-size: ${typography.fontSizes.$2};
    width: 100%;
    color: ${colors.slateGray};
    &:focus {
      background-color: ${colors.white};
      border-color: ${colors.focusBlue};
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  @media ${device.laptop} {
    width: 50%;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const FooterTop = styled.section`
  padding-bottom: 60px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export { Contact, FooterTop, Links, Sub, WorkingHours };

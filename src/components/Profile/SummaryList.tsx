import React from 'react';
import Link from 'next/link';

import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

import theme from '@/theme';
import { List, SmallCard } from './styles';

type DashBoardDataProps = {
  title: string;
  icon: React.JSX.Element;
  iconBg: string;
  value: string | number | undefined;
  footerText: string;
  href: string;
};

type SummaryListProps = {
  dashboardData: DashBoardDataProps[] | [];
};

const { colors, typography } = theme;
const SummaryList: React.FC<SummaryListProps> = ({ dashboardData }) => {
  return (
    <List>
      {dashboardData.map(item => (
        <SmallCard key={item.title}>
          <TopWrapper>
            <div>
              <h3>{item.title}</h3>
              <h2>{item.value}</h2>
            </div>
            <IconWrapper $bg={item.iconBg}>{item.icon}</IconWrapper>
          </TopWrapper>
          <StyledLink href={item.href}>
            {item.footerText}

            <FiArrowRight />
          </StyledLink>
        </SmallCard>
      ))}
    </List>
  );
};

export default SummaryList;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 20px;
  h2 {
    font-size: ${typography.fontSizes.$7};
    font-weight: ${typography.fontWeights.bold};
    margin-bottom: 16px;
    color: ${colors.blackGray};
  }
  h3 {
    color: ${colors.darkGray};
    margin-bottom: 4px;
    font-size: ${typography.fontSizes.$4};
    font-weight: ${typography.fontWeights.medium};
  }
`;

const IconWrapper = styled.div<{ $bg: string }>`
  width: 65px;
  height: 65px;
  border-radius: 60px 0px 60px 60px;
  padding: 16px;
  background-color: ${props => (props.$bg ? props.$bg : 'unset')};
  color: ${colors.white};
`;

const StyledLink = styled(Link)`
  font-size: ${typography.fontSizes.$3};
  color: ${colors.richBlack};
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: 300ms all ease-in-out;

  &:hover {
    color: ${colors.accentRed};
  }
`;

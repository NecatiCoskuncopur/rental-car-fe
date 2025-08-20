import React from 'react';
import Link from 'next/link';

import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

import { getUserBookings } from '@/api';
import { Container, Error, OverlayLoader, UserDashboardHeader } from '@/components';
import { getUserDashboardData } from '@/data';
import { useFetchData } from '@/hooks';
import theme from '@/theme';

const UserDashboard = () => {
  const { data: bookingData, loading: bookingLoading, error: bookingError } = useFetchData<IUserBookingData>(() => getUserBookings());

  const totalSpent = bookingData?.bookings?.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0) || 0;

  const totalApprovedSpent =
    bookingData?.bookings?.filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + (booking.totalPrice || 0), 0) || 0;

  const dashboardData = getUserDashboardData({
    totalBookings: bookingData?.totalBookings,
    totalSpent: totalSpent,
    totalApprovedSpent: totalApprovedSpent,
  });

  if (bookingError) return <Error />;

  return (
    <>
      <UserDashboardHeader />
      <StyledContainer>
        <h1>Dashboard</h1>
        {bookingLoading ? (
          <OverlayLoader variant="card" />
        ) : (
          <List>
            {dashboardData.map(item => (
              <ListItem key={item.title}>
                <TopWrapper>
                  <div>
                    <h3>{item.title}</h3>
                    <h2>{item.value}</h2>
                  </div>
                  <IconWrapper bg={item.iconBg}>{item.icon}</IconWrapper>
                </TopWrapper>
                <StyledLink href={item.href}>
                  {item.footerText}

                  <FiArrowRight />
                </StyledLink>
              </ListItem>
            ))}
          </List>
        )}
      </StyledContainer>
    </>
  );
};

export default UserDashboard;

const StyledContainer = styled(Container)`
  padding: 90px 16px;
  h1 {
    font-size: ${theme.typography.fontSizes.$9};
    font-weight: ${theme.typography.fontWeights.bold};
  }
  h2 {
    font-size: ${theme.typography.fontSizes.$7};
    font-weight: ${theme.typography.fontWeights.bold};
    margin-bottom: 16px;
    color: ${theme.colors.blackGray};
  }
  h3 {
    color: ${theme.colors.darkGray};
    margin-bottom: 4px;
    font-size: ${theme.typography.fontSizes.$4};
    font-weight: ${theme.typography.fontWeights.medium};
  }
`;

const List = styled.ul`
  margin: 40px 0 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  border: 1px solid ${theme.colors.mediumGray};
  border-radius: ${theme.borderRadius.sm};
  box-shadow: 0px 4px 24px 0px rgba(225, 225, 225, 0.25);
  padding: 24px;
  width: calc(100% / 3 - 24px);
  @media ${theme.device.laptop} {
    width: calc(50% - 12px);
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.softGray};
`;

const IconWrapper = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'bg',
})<{ bg: string }>`
  width: 65px;
  height: 65px;
  border-radius: 60px 0px 60px 60px;
  padding: 16px;
  background-color: ${props => (props.bg ? props.bg : 'unset')};
  color: ${theme.colors.white};
`;

const StyledLink = styled(Link)`
  font-size: ${theme.typography.fontSizes.$3};
  color: ${theme.colors.richBlack};
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: 300ms all ease-in-out;

  &:hover {
    color: ${theme.colors.accentRed};
  }
`;

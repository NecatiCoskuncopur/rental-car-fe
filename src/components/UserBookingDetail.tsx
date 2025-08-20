import React from 'react';

import styled from 'styled-components';

import { useCurrentUser } from '@/hooks';
import theme from '@/theme';
import { formatDate } from '@/utils';

type DetailProps = {
  data: IUserBooking | null;
};

const UserBookingDetail: React.FC<DetailProps> = ({ data }) => {
  const { user } = useCurrentUser();

  return (
    <>
      <Wrapper>
        <SectionWrapper>
          <h1>Booking Detail</h1>
          <List>
            <ListItem>
              <p>Brand</p>
              <span>{data?.vehicle.brand}</span>
            </ListItem>
            <ListItem>
              <p>Model</p>
              <span>{data?.vehicle.model}</span>
            </ListItem>
            <ListItem>
              <p>Total Amount</p>
              <span>${data?.totalPrice}</span>
            </ListItem>
            <ListItem>
              <p>Start Date</p>
              <span>{data && formatDate(data?.startDate)}</span>
            </ListItem>
            <ListItem>
              <p>End Date</p>
              <span>{data && formatDate(data?.endDate)}</span>
            </ListItem>
            <ListItem>
              <p>Status</p>
              <span>{data?.status}</span>
            </ListItem>
          </List>
        </SectionWrapper>
        <SectionWrapper>
          <h1>Personal Detail</h1>
          <List>
            <ListItem>
              <p>Full Name</p>
              <span>
                {user?.name} {user?.surname}
              </span>
            </ListItem>
            <ListItem>
              <p>Email</p>
              <span>{user?.email}</span>
            </ListItem>
          </List>
        </SectionWrapper>
      </Wrapper>
    </>
  );
};

export default UserBookingDetail;

const Wrapper = styled.div`
  border-radius: 10px;
  background-color: ${theme.colors.bgLighter};
  padding: 16px;
  margin-top: 20px;
`;

const SectionWrapper = styled.div`
  border-radius: 5px;
  background-color: ${theme.colors.white};
  margin-bottom: 20px;
  padding: 16px;
  h1 {
    border-bottom: 1px solid ${theme.colors.lightGray};
    margin-bottom: 16px;
    padding-bottom: 16px;
    color: ${theme.colors.richBlack};
    font-weight: ${theme.typography.fontWeights.medium};
    font-size: ${theme.typography.fontSizes.$4};
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: calc(100% / 3 - 16px);
  p {
    color: ${theme.colors.darkGray};
    font-weight: ${theme.typography.fontWeights.medium};
    font-size: ${theme.typography.fontSizes.$2};
    margin-bottom: 8px;
  }
  span {
    color: ${theme.colors.darkGray};
    font-size: ${theme.typography.fontSizes.$2};
    display: block;
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;

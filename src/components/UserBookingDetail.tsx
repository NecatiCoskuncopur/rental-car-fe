import React from 'react';

import styled from 'styled-components';

import { useCurrentUser } from '@/hooks';
import theme from '@/theme';
import { formatDate } from '@/utils';
import Title from './Title';

type DetailProps = {
  data: IUserBooking | null;
};

const { colors, device, typography } = theme;
const UserBookingDetail: React.FC<DetailProps> = ({ data }) => {
  const { user } = useCurrentUser();

  return (
    <>
      <Wrapper>
        <SectionWrapper>
          <Title $variant="xxsmall" $mb="16px">
            Booking Detail
          </Title>
          <List>
            <ListItem>
              <p>Brand</p>
              <span>{data?.vehicleId.brand}</span>
            </ListItem>
            <ListItem>
              <p>Model</p>
              <span>{data?.vehicleId.model}</span>
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
  background-color: ${colors.bgLighter};
  padding: 16px;
  margin-top: 20px;
`;

const SectionWrapper = styled.div`
  border-radius: 5px;
  background-color: ${colors.white};
  margin-bottom: 20px;
  padding: 16px;
  h1 {
    border-bottom: 1px solid ${colors.lightGray};
    padding-bottom: 16px;
    color: ${colors.richBlack};
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
    color: ${colors.darkGray};
    font-weight: ${typography.fontWeights.medium};
    font-size: ${typography.fontSizes.$2};
    margin-bottom: 8px;
  }
  span {
    color: ${colors.darkGray};
    font-size: ${typography.fontSizes.$2};
    display: block;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

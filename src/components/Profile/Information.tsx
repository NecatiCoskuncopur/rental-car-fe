import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';

import theme from '@/theme';
import { formatDate } from '@/utils';
import { Card } from './styles';
import Title from '../Title';

type InformationProps = {
  user: IUser | null;
};

const { borderRadius, colors, device, typography } = theme;
const Information: React.FC<InformationProps> = ({ user }) => {
  return (
    <List>
      <Card>
        <Title $variant="xxsmall" $mb="24px">
          Information
        </Title>

        <Wrapper>
          <Button href="/profile/settings">Edit</Button>
          <Info>
            <span>USER ID</span>
            <p>{user?._id}</p>
          </Info>
          <Info>
            <span>EMAIL ADDRESS</span>
            <p>{user?.email}</p>
          </Info>

          <Info>
            <span>DATE OF BIRTH</span>
            <p>{user?.dateOfBirth ? formatDate(user.dateOfBirth) : '-'}</p>
          </Info>
          <Info>
            <span>JOINED SINCE</span>
            <p>{user?.createdAt ? formatDate(user.createdAt) : '-'}</p>
          </Info>
          <Info>
            <span>TYPE</span>
            <p>{user?.isAdmin ? 'Admin' : 'Personal'}</p>
          </Info>
        </Wrapper>
      </Card>
    </List>
  );
};

export default Information;

const List = styled.ul`
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const Info = styled.div`
  width: calc(100% / 3 - 20px);
  color: ${colors.gunmetal};
  font-size: ${typography.fontSizes.$5};
  line-height: 1.6;
  span {
    color: ${colors.mutedPurple};
    font-size: ${typography.fontSizes.$2};
  }
  p {
    font-weight: ${typography.fontWeights.medium};
  }
  @media ${device.laptop} {
    width: calc(50% - 15px);
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const Button = styled(Link)`
  color: ${colors.white};
  padding: 8px 30px;
  font-weight: ${typography.fontWeights.semiBold};
  border-radius: ${borderRadius.md};
  background-color: ${colors.vibrantRed};
  position: absolute;
  top: 20px;
  right: 20px;
  box-shadow: 0px 10px 15px 0px rgba(255, 83, 48, 0.35);
`;

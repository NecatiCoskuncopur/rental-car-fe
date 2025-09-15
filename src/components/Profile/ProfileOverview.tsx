import React from 'react';
import Link from 'next/link';

import { FaCheck } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';
import styled from 'styled-components';

import { AppleStore, GooglePlay } from '@/icons';
import theme from '@/theme';
import { List, MediumCard } from './styles';
import Title from '../Title';

type ProfileOverviewProps = {
  user: IUser | null;
};

const { borderRadius, colors, typography } = theme;
const ProfileOverview: React.FC<ProfileOverviewProps> = ({ user }) => {
  return (
    <List>
      <MediumCard>
        <Title $variant="xxsmall" $mt="10px" $mb="8px">
          Welcome, {user?.name + ' ' + user?.surname}
        </Title>
        <p>Looks like you are not verified yet. Verify yourself to use the full potential of Rental Car.</p>
        <IconWrapper>
          <Link href="/">
            <span>
              <FaCheck />
            </span>
            Verify account
          </Link>
        </IconWrapper>
        <IconWrapper>
          <Link href="/">
            <span>
              <FaShield />
            </span>
            Two-factor authentication (2FA)
          </Link>
        </IconWrapper>
      </MediumCard>
      <MediumCard>
        <Title $variant="xxsmall" $mt="10px" $mb="8px">
          Download App
        </Title>
        <p>Verifying your identity on our mobile app more secure, faster, and reliable.</p>
        <Button>
          <GooglePlay />
        </Button>
        <Button>
          <AppleStore />
        </Button>
      </MediumCard>
    </List>
  );
};

export default ProfileOverview;

const IconWrapper = styled.div`
  padding-top: 15px;
  &:not(:last-child) {
    border-bottom: 1px solid #e5eaef;
    padding-bottom: 15px;
  }
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${colors.accentRed};
    font-size: ${typography.fontSizes.$2};
    span {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: ${borderRadius.round};
      background-color: ${colors.successGreen};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.white};
    }
  }
`;

const Button = styled.button`
  color: ${colors.white};
  padding: 8px 30px;
  font-weight: ${typography.fontWeights.semiBold};
  border-radius: ${borderRadius.md};
  background-color: ${colors.accentRed};
  cursor: pointer;
  display: block;
  margin-bottom: 12px;
`;

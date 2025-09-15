import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled from 'styled-components';

import theme from '@/theme';
import Container from '../Container';
import Title from '../Title';

type ProfileLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const { colors, typography } = theme;
const ProfileLayout: React.FC<ProfileLayoutProps> = ({ title, children }) => {
  const pathname = usePathname();
  return (
    <Wrapper>
      <Container>
        <Title $variant="xsmall" $mb="32px">
          {title}
        </Title>
        <List>
          <ListItem $active={pathname === '/profile'}>
            <Link href="/profile">Account</Link>
          </ListItem>
          <ListItem $active={pathname === '/profile/userBookings'}>
            <Link href="/profile/userBookings">Bookings</Link>
          </ListItem>
          <ListItem $active={pathname === '/profile/settings'}>
            <Link href="/profile/settings">Settings</Link>
          </ListItem>
        </List>
        {children}
      </Container>
    </Wrapper>
  );
};

export default ProfileLayout;

const Wrapper = styled.div`
  padding: 40px 0;
  background-color: ${colors.extraLightBlueGray};
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  line-height: 20px;
  font-weight: ${typography.fontWeights.medium};
  margin-bottom: 30px;
`;

const ListItem = styled.li<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? colors.accentRed : colors.mutedPurple)};
  transition: all 400ms ease;
  &:hover {
    color: ${theme.colors.accentRed};
  }
`;

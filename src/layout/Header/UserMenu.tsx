import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FaAngleDown } from 'react-icons/fa';
import styled from 'styled-components';

import { logout } from '@/api';
import { useCurrentUser } from '@/hooks';
import theme from '@/theme';

const { borderRadius, colors, device, typography } = theme;
const UserMenu = () => {
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return null;
  }
  return (
    <Container>
      {user ? (
        <DropdownContainer>
          <UserName>
            {user.name} <FaAngleDown />
          </UserName>
          <DropdownMenu>
            <DropdownItem as={Link} href="/profile">
              Profile
            </DropdownItem>
            {user.isAdmin && (
              <DropdownItem as={Link} href="/adminDashboard">
                Admin Dashboard
              </DropdownItem>
            )}
            <DropdownItem as={Link} href="/profile/settings">
              Settings
            </DropdownItem>
            <DropdownItem as="button" onClick={handleLogout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </DropdownContainer>
      ) : (
        <Wrapper>
          <Link href="/login">Login</Link>
          <StyledLink href="/register">Register</StyledLink>
        </Wrapper>
      )}
    </Container>
  );
};

export default UserMenu;
const Container = styled.div`
  @media ${device.laptop} {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: ${typography.fontSizes.$3};
  font-weight: ${typography.fontWeights.medium};
  color: ${colors.richBlack};
  line-height: 18px;
  letter-spacing: -0.6px;
`;

const StyledLink = styled(Link)`
  font-family: 'Rubik', Sans-serif;
  line-height: 20px;
  color: ${colors.white};
  background-color: ${colors.vibrantRed};
  border-style: none;
  border-radius: ${borderRadius.xs};
  padding: 15px 30px;
  box-shadow: 0px 10px 15px 0px rgba(255, 83, 48, 0.35);
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover > ul {
    display: block;
  }
`;

const UserName = styled.div`
  cursor: pointer;
  font-weight: ${typography.fontWeights.medium};
  font-size: ${typography.fontSizes.$3};
  color: ${colors.richBlack};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DropdownMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: ${colors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: ${borderRadius.sm};
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 8px 0;
  list-style: none;
`;

const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 10px 16px;
  color: ${colors.richBlack};
  text-decoration: none;
  font-size: ${typography.fontSizes.$2};
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;

  &:hover {
    background-color: ${colors.lightGray};
  }
`;

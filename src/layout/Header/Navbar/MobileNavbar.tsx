import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { RiCloseLargeLine } from 'react-icons/ri';
import styled from 'styled-components';

import { logout } from '@/api';
import { navData } from '@/data';
import { useCurrentUser } from '@/hooks';
import theme from '@/theme';
import ListItem from './ListItem';

type MobileNavbarProps = {
  closeModal: () => void;
};

const { colors } = theme;
const MobileNavbar: React.FC<MobileNavbarProps> = ({ closeModal }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { user } = useCurrentUser();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  return (
    <>
      <ListHeader>
        Logo
        <button onClick={closeModal}>
          <RiCloseLargeLine size={16} />
        </button>
      </ListHeader>
      <ul>
        {navData.map(item => (
          <ListItem key={item.href} $active={item.href === pathname}>
            <Link href={item.href}>{item.name}</Link>
          </ListItem>
        ))}

        {user ? (
          <>
            <ListItem $active={false}>
              <Link href="/userDashboard"> User Dashboard</Link>
            </ListItem>
            {user?.isAdmin && (
              <ListItem $active={false}>
                <Link href="/userDashboard">Admin Dashboard</Link>
              </ListItem>
            )}
            <ListItem $active={false}>
              <Link href="/settings">Settings</Link>
            </ListItem>
            <ListItem $active={false}>
              <a onClick={handleLogout}>Logout</a>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem $active={false}>
              <Link href="/login">Login</Link>
            </ListItem>
            <ListItem $active={false}>
              <Link href="/register">Register</Link>
            </ListItem>
          </>
        )}
      </ul>
    </>
  );
};

export default MobileNavbar;

const ListHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  button {
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 44px;
    cursor: pointer;
    color: ${colors.darkGray};
    transition: all 400ms ease;
    &:hover {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

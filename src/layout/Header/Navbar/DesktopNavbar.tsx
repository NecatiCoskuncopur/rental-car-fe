import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled from 'styled-components';

import { navData } from '@/data';
import theme from '@/theme';
import ListItem from './ListItem';

const { device } = theme;
const DesktopNavbar = () => {
  const pathname = usePathname();
  return (
    <NavList>
      {navData.map(item => (
        <ListItem key={item.href} $active={item.href === pathname}>
          <Link href={item.href}>{item.name}</Link>
        </ListItem>
      ))}
    </NavList>
  );
};

export default DesktopNavbar;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 10px;
  @media ${device.laptop} {
    display: none;
  }
`;

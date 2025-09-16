import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TbMenu } from 'react-icons/tb';
import styled from 'styled-components';

import { logout } from '@/api';
import { adminNavData } from '@/data';
import theme from '@/theme';
import Navbar from './Navbar';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const { colors, device } = theme;
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    if (isMenuOpen) {
      handleMenuClose();
    }
  }, [pathname]);

  const navItems = adminNavData(logout);

  return (
    <Wrapper>
      <Navbar isMenuOpen={isMenuOpen} navItems={navItems} closeModal={handleMenuClose} />
      <Content>
        <Header>
          <IconWrapper onClick={handleMenuOpen}>
            <TbMenu size={24} />
          </IconWrapper>
          <Link href="/profile">Account</Link>
        </Header>
        {children}
      </Content>
    </Wrapper>
  );
};

export default AdminLayout;

const Wrapper = styled.section`
  display: flex;
  gap: 24px;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

const IconWrapper = styled.div`
  visibility: hidden;
  @media ${device.desktop} {
    visibility: visible;
    cursor: pointer;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px 24px;
  a {
    transition: 300ms all ease;
    &:hover {
      color: ${colors.vibrantBlue};
    }
  }
`;

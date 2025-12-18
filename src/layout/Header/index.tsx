import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import styled from 'styled-components';

import { Container, Logo } from '@/components';
import theme from '@/theme';
import Hero from './Hero';
import Navbar from './Navbar';
import UserMenu from './UserMenu';

const { colors } = theme;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {pathname === '/' && <Hero />}
      <StyledHeader $isHomePage={pathname === '/'} $scrolled={scrolled}>
        <StyledContainer>
          <Logo />
          <Navbar />
          <UserMenu />
        </StyledContainer>
      </StyledHeader>
    </>
  );
};

export default Header;

const StyledHeader = styled.header<{ $scrolled: boolean; $isHomePage: boolean }>`
  width: 100%;
  height: 100px;
  position: ${props => (props.$isHomePage ? 'fixed' : 'sticky')};
  top: 0;
  left: 0;
  background-color: ${props => (props.$isHomePage && !props.$scrolled ? 'transparent' : colors.white)};
  box-shadow: ${({ $scrolled }) => ($scrolled ? '0px 3px 10px rgba(0, 0, 0, 0.15)' : '0px 0px 10px rgba(0, 0, 0, 0)')};
  z-index: 99;
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

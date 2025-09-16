import React from 'react';
import { usePathname } from 'next/navigation';

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import theme from '@/theme';

type NavbarProps = {
  navItems: {
    key: string;
    icon: React.JSX.Element;
    label: React.JSX.Element;
    href?: string;
  }[];
  isMenuOpen: boolean;
  closeModal: () => void;
};

const { borderRadius, colors, device } = theme;
const Navbar: React.FC<NavbarProps> = ({ navItems, isMenuOpen, closeModal }) => {
  const pathname = usePathname();
  return (
    <>
      <Container>
        Logo
        <ul>
          {navItems.map(item => (
            <ListItem $isActive={item.href === pathname} key={item.key}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </ListItem>
          ))}
        </ul>
      </Container>

      {isMenuOpen && (
        <ModalWrapper onClick={closeModal}>
          <ContentWrapper
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            Logo
            <ul>
              {navItems.map(item => (
                <ListItem $isActive={item.href === pathname} key={item.key}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </ListItem>
              ))}
            </ul>
          </ContentWrapper>
        </ModalWrapper>
      )}
    </>
  );
};

export default Navbar;

const Container = styled.div`
  width: 280px;
  padding: 24px 16px;
  height: 100vh;
  background-color: ${colors.white};
  position: sticky;
  top: 0;
  left: 0;
  border-right: 1px solid ${colors.lightSteel};

  ul {
    margin-top: 24px;
  }
  @media ${device.desktop} {
    display: none;
  }
`;

const ListItem = styled.li<{ $isActive: boolean }>`
  padding: 16px;
  display: flex;
  gap: 16px;
  cursor: pointer;
  transition: 300ms all ease;
  border-radius: ${borderRadius.lg};
  margin-bottom: 4px;
  ${props =>
    props.$isActive
      ? css`
          color: ${colors.white};
          background-color: ${colors.vibrantBlue};
        `
      : css`
          color: ${colors.mutedBlueGray};
          background-color: transparent;
        `}
  &:hover {
    ${props =>
      !props.$isActive &&
      css`
        background-color: ${colors.lightIndigo};
        color: ${colors.vibrantBlue};
      `}
  }
`;

const ModalWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100vh;
  width: 280px;
  padding: 16px;
  background-color: ${colors.white};
  ul {
    margin-top: 36px;
  }
`;

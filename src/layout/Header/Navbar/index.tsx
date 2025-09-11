import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { CgMenuGridR } from 'react-icons/cg';
import styled from 'styled-components';

import theme from '@/theme';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const { colors, device } = theme;
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    closeModal();
  }, [pathname]);

  return (
    <nav>
      <DesktopNavbar />
      <IconWrapper onClick={openModal}>
        <CgMenuGridR size={32} />
      </IconWrapper>
      <AnimatePresence>
        {isModalOpen && (
          <ModalWrapper
            as={motion.div}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={closeModal}
          >
            <ContentWrapper
              onClick={e => e.stopPropagation()}
              as={motion.div}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
            >
              <MobileNavbar closeModal={closeModal} />
            </ContentWrapper>
          </ModalWrapper>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

const IconWrapper = styled.div`
  display: none;
  color: ${colors.accentRed};
  cursor: pointer;
  @media ${device.laptop} {
    display: block;
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(51, 51, 51, 0.5);
  display: block;
  position: fixed;
  top: 0;
  left: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 350px;
  padding: 0 15px;
  background-color: ${colors.white};
`;

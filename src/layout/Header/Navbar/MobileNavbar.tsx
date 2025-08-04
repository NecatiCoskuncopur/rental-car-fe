import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { RiCloseLargeLine } from 'react-icons/ri';
import styled from 'styled-components';

import { Logo } from '@/components';
import { navData } from '@/data';
import theme from '@/theme';
import ListItem from './ListItem';

type MobileNavbarProps = {
  closeModal: () => void;
};

const { colors } = theme;
const MobileNavbar: React.FC<MobileNavbarProps> = ({ closeModal }) => {
  const pathname = usePathname();

  return (
    <>
      <ListHeader>
        <Logo />
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

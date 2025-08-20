import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled, { css } from 'styled-components';

import { userLayoutData } from '@/data';
import theme from '@/theme';
import Container from './Container';

const UserDashboardHeader = () => {
  const pathname = usePathname();

  return (
    <Wrapper>
      <StyledContainer>
        <List>
          {userLayoutData.map((item, index) => (
            <ListItem $active={pathname === item.href || pathname.startsWith(item.href)} key={index}>
              <Link href={item.href}>
                {item.icon}

                <p>{item.name}</p>
              </Link>
            </ListItem>
          ))}
        </List>
      </StyledContainer>
    </Wrapper>
  );
};

export default UserDashboardHeader;

const Wrapper = styled.div`
  background-color: ${theme.colors.white};
`;

const StyledContainer = styled(Container)`
  padding: 20px 16px;
  background-color: ${theme.colors.white};
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ListItem = styled.li<{ $active: boolean }>`
  width: calc(100% / 3 - 20px);
  padding: 20px;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  border: 1px solid;
  text-align: center;
  svg {
    margin-bottom: 12px;
  }
  a {
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  @media ${theme.device.laptop} {
    width: calc(50% - 10px);
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }

  ${props =>
    props.$active
      ? css`
          background-color: ${theme.colors.accentRed};
          color: ${theme.colors.white};
          border-color: ${theme.colors.accentRed};
        `
      : css`
          background-color: ${theme.colors.bgLighter};
          color: ${theme.colors.darkGray};
          border-color: ${theme.colors.bgLighter};
          transition: 300ms all ease-in-out;
          p {
            transition: 300ms all ease-in-out;
          }
          &:hover {
            background-color: ${theme.colors.white};
            border-color: ${theme.colors.accentRed};
            p {
              color: ${theme.colors.accentRed};
            }
          }
        `}
`;

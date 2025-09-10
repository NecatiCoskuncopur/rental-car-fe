import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled from 'styled-components';

import theme from '@/theme';
import Title from './Title';

type AuthWrapperProps = {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
};

const { borderRadius, colors, typography } = theme;
const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, handleSubmit, loading }) => {
  const pathname = usePathname();

  const imageUrl = process.env.NEXT_PUBLIC_AUTH_BG_IMAGE_URL as string;
  return (
    <Wrapper>
      <LogoWrapper>logo</LogoWrapper>
      <Container>
        <ImageWrapper $backgroundUrl={imageUrl}>
          <Overlay />
          <Title $variant="xxsmall" $mb="8px" $mt="16px">
            {pathname === '/login' ? 'Welcome Back !' : 'Register Account'}
          </Title>
          <p>{pathname === '/login' ? ' Login to continue to Rental Car.' : '  Get your free Rental Car account now.'}</p>
        </ImageWrapper>
        <FormWrapper>
          <form onSubmit={handleSubmit} noValidate>
            {children}
            <Button type="submit">
              {pathname === '/login' ? 'Login' : 'Register'}
              {loading && <Spinner />}
            </Button>
          </form>
        </FormWrapper>
      </Container>
      <Footer>
        {pathname === '/login' ? (
          <p>
            Don't have an account ? <Link href="/register">Register now</Link>
          </p>
        ) : (
          <p>
            Already have an account ? <Link href="/login">Login now</Link>
          </p>
        )}
      </Footer>
    </Wrapper>
  );
};

export default AuthWrapper;

const Wrapper = styled.section`
  height: 100vh;
  background-color: ${colors.paleBlueGray};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 48px;
  padding: 0 16px;
  position: relative;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
`;

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  border-radius: ${borderRadius.sm};
`;

const ImageWrapper = styled.div<{ $backgroundUrl: string }>`
  background-image: url(${props => props.$backgroundUrl});
  background-size: cover;
  background-position: center;
  padding: 48px;
  position: relative;
  z-index: 0;
  width: 100%;
  text-align: center;
  h1 {
    color: ${colors.white};
  }
  p {
    color: ${colors.mutedPurple};
  }
`;

const Overlay = styled.div`
  background: rgba(51, 51, 51, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  left: 0px;
  top: 0px;
`;

const FormWrapper = styled.div`
  padding: 40px 24px;
  background-color: ${colors.white};
  width: 100%;
`;

const Button = styled.button`
  font-family: 'Rubik', Sans-serif;
  font-size: ${typography.fontSizes.$3};
  font-weight: ${typography.fontWeights.medium};
  line-height: 20px;
  letter-spacing: -0.6px;
  color: ${colors.white};
  background-color: ${colors.accentRed};
  border-radius: ${borderRadius.xs};
  box-shadow: 0px 10px 15px 0px rgba(255, 83, 48, 0.35);
  padding: 15px 0;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: ${colors.white};
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Footer = styled.footer`
  a {
    color: ${colors.accentRed};
  }
`;

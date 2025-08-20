import React from 'react';
import { useRouter } from 'next/router';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import styled from 'styled-components';

import theme from '@/theme';

type FooterProps = {
  previousPost: IPost | null;
  nextPost: IPost | null;
};

const { colors, typography } = theme;
const PostDetailFooter: React.FC<FooterProps> = ({ previousPost, nextPost }) => {
  const router = useRouter();

  return (
    <Container>
      <NavigationButton onClick={() => router.push(`/blog/${previousPost?.slug}`)} disabled={!previousPost}>
        <FaArrowLeft />
        <span>Previous Post</span>
      </NavigationButton>
      <NavigationButton disabled={!nextPost} onClick={() => router.push(`/blog/${nextPost?.slug}`)}>
        <span> Next Post</span>
        <FaArrowRight />
      </NavigationButton>
    </Container>
  );
};

export default PostDetailFooter;

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NavigationButton = styled.button`
  color: ${colors.vibrantRed};
  font-size: ${typography.fontSizes.$2};
  background-color: unset;
  cursor: pointer;
  font-size: ${typography.fontSizes.$2};
  display: flex;
  align-items: center;
  gap: 12px;
  transition: 300ms all ease-in-out;
  &:hover {
    color: ${colors.vibrantOrange};
  }
  &:disabled {
    color: ${colors.slateGray};
    cursor: not-allowed;
  }
`;

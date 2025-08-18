import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components';

import theme from '@/theme';
import Title from '../Title';

type PostCardProps = {
  post: IPost;
  type: 'slide' | 'grid';
};

const { borderRadius, colors, device, typography } = theme;
const PostCard: React.FC<PostCardProps> = ({ post, type }) => {
  return (
    <Wrapper type={type}>
      <StyledImageWrapper>
        <Image src={post.image} alt={post.title} fill quality={100} priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </StyledImageWrapper>

      <Content>
        <Link href={`/blog/${post.slug}`}>
          <Title variant="xsmall" mb="12px">
            {post.title}
          </Title>
        </Link>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        <Button href={`/blog/${post.slug}`}>
          Read More <FaAngleRight />
        </Button>
      </Content>
    </Wrapper>
  );
};

export default PostCard;

const Wrapper = styled.li.withConfig({
  shouldForwardProp: prop => prop !== 'type',
})<{ type: 'slide' | 'grid' }>`
  width: ${props => (props.type === 'slide' ? '100%' : 'calc(50% - 12px)')};
  border: 1px solid ${colors.mediumGray};
  border-radius: ${borderRadius.xs};
  @media ${device.tablet} {
    width: 100%;
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 250px;
  margin: 10px 0;
  overflow: hidden;
  cursor: pointer;
  transition: 400ms all ease-in-out;
  &:hover {
    img {
      transform: scale(1.02);
    }
  }
  img {
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 24px;
  h1 {
    color: ${colors.richBlack};
    transition: 200ms all ease-in-out;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      color: ${colors.vibrantRed};
    }
  }
  div {
    font-size: ${typography.fontSizes.$2};
    color: ${colors.mutedPurple};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Button = styled(Link)`
  padding: 12px 20px;
  font-family: 'Rubik', Sans-serif;
  font-size: ${typography.fontSizes.$5};
  font-weight: ${typography.fontWeights.medium};
  line-height: 22px;
  letter-spacing: -0.36px;
  background-color: ${colors.accentRed};
  display: inline-block;
  border-style: none;
  border-radius: 3px;
  box-shadow: 0px 10px 15px 0px rgba(255, 83, 48, 0.35);
  color: ${colors.white};
  margin-top: 24px;
  cursor: pointer;
  transition: all 400ms ease;
  &:hover {
    background-color: transparent;
    background-image: linear-gradient(110deg, #ff4c30 0%, #922919 100%);
  }
`;

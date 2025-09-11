import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components';

import theme from '@/theme';
import Button from '../Button';
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
          <Title $variant="xsmall" $mb="12px">
            {post.title}
          </Title>
        </Link>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <Link href={`/blog/${post.slug}`}>
          <StyledButton $variant="accent">
            Read More <FaAngleRight />
          </StyledButton>
        </Link>
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

const StyledButton = styled(Button)`
  margin-top: 24px;
  cursor: pointer;
`;

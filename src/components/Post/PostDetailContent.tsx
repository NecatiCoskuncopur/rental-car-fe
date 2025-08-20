import React from 'react';
import Image from 'next/image';

import styled from 'styled-components';

import theme from '@/theme';
import Title from '../Title';

type PostDetailContentProps = {
  post: IPost;
};

const { borderRadius, colors, typography } = theme;
const PostDetailContent: React.FC<PostDetailContentProps> = ({ post }) => {
  return (
    <>
      <ImageWrapper>
        <Image src={post.image} alt={post.title} fill priority={true} sizes="(max-width: 768px) 100vw, 50vw" quality={100} />
      </ImageWrapper>
      <Title $variant="small">{post.title}</Title>
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
};

export default PostDetailContent;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  overflow: hidden;
  border-radius: 20px;
  image {
    object-fit: cover;
    border-radius: ${borderRadius.xl};
  }
`;

const Content = styled.div`
  color: ${colors.richBlack};
  font-size: ${typography.fontSizes.$4};
  line-height: 20px;
  p {
    margin-bottom: 12px;
  }
  ol {
    padding-left: 20px;
    li {
      margin-bottom: 5px;
      list-style-type: decimal;
    }
  }

  ul {
    padding-left: 20px;
    li {
      margin-bottom: 5px;
      list-style-type: disc;
    }
  }
`;

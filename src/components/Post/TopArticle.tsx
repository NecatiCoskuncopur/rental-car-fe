import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FaCalendarDays } from 'react-icons/fa6';
import { FiTag } from 'react-icons/fi';
import styled from 'styled-components';

import theme from '@/theme';
import { formatDate } from '@/utils';

type TopArticle = {
  posts: IPost[];
};

const { colors, typography } = theme;
const TopArticle: React.FC<TopArticle> = ({ posts }) => {
  const slicedPost = posts.slice(0, 3);

  return (
    <Wrapper>
      <TitleWrapper>
        <FiTag />
        <h2>Top Article</h2>
      </TitleWrapper>
      {slicedPost.map(post => (
        <ContentWrapper key={post._id}>
          <Link href={`/blog/${post.slug}`}>
            <ImageWrapper>
              <Image src={post.image} alt={post.title} fill quality={100} priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </ImageWrapper>
            <TextWrapper>
              <h1>{post.title}</h1>

              <Date>
                <FaCalendarDays />
                <span>{formatDate(post.updatedAt)}</span>
              </Date>
            </TextWrapper>
          </Link>
        </ContentWrapper>
      ))}
    </Wrapper>
  );
};

export default TopArticle;

const Wrapper = styled.div`
  background: ${colors.white};
  border-radius: 10px;
  padding: 24px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 250px;
  border-radius: 10px 10px 0 0;
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

const TitleWrapper = styled.div`
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${colors.lightGray};
  color: ${colors.darkGray};
  font-weight: ${typography.fontWeights.semiBold};
  display: flex;
  align-items: center;
  line-height: 1.2;
  gap: 12px;
  svg {
    color: ${colors.vibrantRed};
    font-size: ${typography.fontSizes.$5};
  }
  h1 {
    font-size: ${typography.fontSizes.$6};
  }
  h2 {
    font-size: ${typography.fontSizes.$5};
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 250px;
  border-radius: 10px;
  color: ${colors.white};
  overflow: hidden;
  transition: 300ms all ease-in-out;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
  &::before {
    content: '';
    position: absolute;
    background: linear-gradient(0deg, ${colors.black} 16.31%, rgba(0, 0, 0, 0) 100%);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  img {
    object-fit: cover;
    transition: 400ms all ease-in-out;
  }
  &:hover {
    color: ${colors.vibrantRed};
    img {
      transform: scale(1.04);
    }
  }
`;

const TextWrapper = styled.div`
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  h1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Date = styled.p`
  font-size: ${typography.fontSizes.$2};
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  svg {
    color: ${colors.vibrantRed};
  }
`;

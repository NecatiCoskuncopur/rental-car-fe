import React from 'react';
import { GetServerSideProps } from 'next';

import styled from 'styled-components';

import { getPostBySlug, getPosts } from '@/api';
import { Container, Error, PostDetailContent, TopArticle } from '@/components';
import theme from '@/theme';

interface BlogDetailProps {
  post: IPost | null;
  posts: IPost[];
}

const { device } = theme;

const BlogDetail = ({ post, posts }: BlogDetailProps) => {
  if (!post) {
    return <Error />;
  }

  return (
    <Container>
      <Wrapper>
        <ContentWrapper>
          <PostDetailContent post={post} />
        </ContentWrapper>
        <Aside>
          <TopArticle posts={posts} />
        </Aside>
      </Wrapper>
    </Container>
  );
};

export default BlogDetail;

export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug;

  if (typeof slug !== 'string') {
    return { notFound: true };
  }

  try {
    const [post, postsData] = await Promise.all([getPostBySlug(slug), getPosts()]);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        post,
        posts: postsData?.posts || [],
      },
    };
  } catch (error) {
    console.error('Blog slug SSR error:', error);

    return {
      notFound: true,
    };
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 90px 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: calc(66.66666666666667% - 12px);
  @media ${device.laptop} {
    width: 100%;
  }
`;

const Aside = styled.aside`
  width: calc(33.33333333333333% - 12px);
  @media ${device.laptop} {
    width: 100%;
  }
`;

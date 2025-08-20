import React from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';

import styled from 'styled-components';

import { getAdjacentPosts, getPostBySlug, getPosts, getSlugs } from '@/api';
import { Container, Error, PostDetailContent, PostDetailFooter, TopArticle } from '@/components';
import theme from '@/theme';

interface BlogDetailProps {
  post: IPost;
  posts: IPost[];
  adjacentPosts: {
    previousPost: IPost | null;
    nextPost: IPost | null;
  };
}

const BlogDetail = ({ post, posts, adjacentPosts }: BlogDetailProps) => {
  if (!post || !posts || !adjacentPosts) return <Error />;

  return (
    <Container>
      <Wrapper>
        <ContentWrapper>
          <PostDetailContent post={post} />
          <PostDetailFooter previousPost={adjacentPosts?.previousPost || null} nextPost={adjacentPosts?.nextPost || null} />
        </ContentWrapper>
        <Aside>
          <TopArticle posts={posts} />
        </Aside>
      </Wrapper>
    </Container>
  );
};

export default BlogDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs: string[] = await getSlugs();

  const paths = slugs.map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug;

  if (typeof slug !== 'string') return { notFound: true };

  try {
    const post = await getPostBySlug(slug);
    const postsData = await getPosts();
    const adjacentPosts = await getAdjacentPosts(slug);

    console.log(adjacentPosts);

    if (!post) return { notFound: true };

    return {
      props: {
        post,
        posts: postsData?.posts || [],
        adjacentPosts: {
          previousPost: adjacentPosts?.previousPost || null,
          nextPost: adjacentPosts?.nextPost || null,
        },
      },
    };
  } catch {
    return { notFound: true };
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
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;

const Aside = styled.aside`
  width: calc(33.33333333333333% - 12px);
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;

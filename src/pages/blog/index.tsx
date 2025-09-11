import React from 'react';

import styled from 'styled-components';

import { getPosts } from '@/api';
import { Container, Error, OverlayLoader, PostCard, TopArticle } from '@/components';
import { useFetchData } from '@/hooks';
import theme from '@/theme';

const { device } = theme;
const Blog = () => {
  const { data: postsData, loading, error } = useFetchData<IPostData>(() => getPosts({ limit: '6' }));

  if (error) {
    return <Error />;
  }

  //Daha sonra InfiniteScroll ya da pagination eklenecek
  return (
    <StyledContainer>
      {loading ? (
        <OverlayLoader variant="rightAside" />
      ) : (
        <Wrapper>
          <List>
            {postsData?.posts.map(post => (
              <PostCard key={post._id} type="grid" post={post} />
            ))}
          </List>
          <Aside>
            <TopArticle posts={postsData?.posts || []} />
          </Aside>
        </Wrapper>
      )}
    </StyledContainer>
  );
};

export default Blog;

const StyledContainer = styled(Container)`
  padding: 90px 16px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
`;

const List = styled.ul`
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

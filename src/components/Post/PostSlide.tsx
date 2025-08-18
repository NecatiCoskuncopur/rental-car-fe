import React from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { fadeInUp } from '@/animations';
import { getPosts } from '@/api';
import { useFetchData } from '@/hooks';
import theme from '@/theme';
import PostCard from './PostCard';
import Container from '../Container';
import Title from '../Title';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PostSlide = () => {
  const { data: postsData, loading, error, refetch } = useFetchData<IPostData>(() => getPosts());

  return (
    <Wrapper variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <Container>
        <TitleWrapper>
          <Title variant="xxsmall" fontFamily="Rubik, sans-serif" mb="8px">
            Blog
          </Title>
          <Title variant="xlarge" lineHeight="52px" mb="50px">
            Inside Stories
          </Title>
        </TitleWrapper>
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay]}
        >
          {postsData?.posts?.map(post => (
            <SwiperSlide key={post._id}>
              <PostCard type="slide" post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Wrapper>
  );
};

export default PostSlide;

const Wrapper = styled(motion.div)`
  background-color: ${theme.colors.offWhite};
  padding: 90px 0;
`;
const TitleWrapper = styled.div`
  text-align: center;
  color: ${theme.colors.richBlack};
`;

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

const { borderRadius, colors } = theme;
const PostSlide = () => {
  const { data: postsData, loading, error } = useFetchData<IPostData>(() => getPosts());

  const totalPosts = postsData?.totalPosts ?? 0;

  if (error) return null;
  return (
    <Wrapper variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <Container>
        <TitleWrapper>
          <Title $variant="xxsmall" $mb="8px">
            Blog
          </Title>
          <Title $variant="large" $mb="50px">
            Inside Stories
          </Title>
        </TitleWrapper>
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          loop={totalPosts > 3}
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
          {loading
            ? [...Array(3)].map((_, i) => (
                <SwiperSlide key={i}>
                  <Loader />
                </SwiperSlide>
              ))
            : postsData?.posts?.map(post => (
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
  background-color: ${colors.offWhite};
  padding: 90px 0;
`;
const TitleWrapper = styled.div`
  text-align: center;
  color: ${colors.richBlack};
`;

const Loader = styled.div`
  height: 250px;
  border-radius: ${borderRadius.xs};
  background-color: ${colors.neutralGray};
  animation: pulse 1.5s infinite;
`;

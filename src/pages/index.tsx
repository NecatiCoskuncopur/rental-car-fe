import React from 'react';

import { CallToActionBanner, FrequentlyAskedQuestions, HowItWorks, PostSlide, WhyChooseUs } from '@/components';

const Home = () => {
  return (
    <>
      <HowItWorks />
      {/* Vehicle */}
      <CallToActionBanner />
      <WhyChooseUs />
      <PostSlide />
      <FrequentlyAskedQuestions />
    </>
  );
};

export default Home;

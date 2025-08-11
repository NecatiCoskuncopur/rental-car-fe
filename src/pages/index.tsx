import React from 'react';

import { CallToActionBanner, FrequentlyAskedQuestions, HowItWorks, WhyChooseUs } from '@/components';

const Home = () => {
  return (
    <>
      <HowItWorks />
      {/* Vehicle */}
      <CallToActionBanner />
      <WhyChooseUs />
      {/* Blog */}
      <FrequentlyAskedQuestions />
    </>
  );
};

export default Home;

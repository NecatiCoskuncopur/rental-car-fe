import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { FaAngleDown } from 'react-icons/fa';
import styled from 'styled-components';

import { fadeInUp } from '@/animations';
import { faqData } from '@/data';
import theme from '@/theme';
import Container from './Container';
import Title from './Title';

const { colors, device, typography } = theme;

const FrequentlyAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <StyledContainer>
        <Title $variant="xxsmall" $mb="8px">
          FAQ
        </Title>
        <Title $variant="large" $mb="30px">
          Frequently Asked Questions
        </Title>

        <ul>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={index}>
                <Question
                  as={motion.div}
                  onClick={() => toggleQuestion(index)}
                  animate={{
                    backgroundColor: isOpen ? colors.accentRed : colors.white,
                    color: isOpen ? colors.white : colors.richBlack,
                    boxShadow: isOpen ? '0px 10px 15px rgba(255, 83, 48, 0.35)' : '0px 3px 6px rgba(0,0,0,0.05)',
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {item.question}
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ display: 'flex' }}>
                    <FaAngleDown />
                  </motion.span>
                </Question>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <AnswerWrapper
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <AnswerInner>{item.answer}</AnswerInner>
                    </AnswerWrapper>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </StyledContainer>
    </motion.div>
  );
};

export default FrequentlyAskedQuestions;

const StyledContainer = styled(Container)`
  color: ${colors.richBlack};
  padding: 67px 0px 100px 0px;

  h1 {
    text-align: center;
  }
`;

const Question = styled.div`
  font-family: 'Poppins', Sans-serif;
  font-size: ${typography.fontSizes.$5};
  font-weight: ${typography.fontWeights.medium};
  line-height: 27px;
  letter-spacing: -0.36px;
  padding: 18px 45px;
  cursor: pointer;
  position: relative;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  @media ${device.tablet} {
    font-size: ${typography.fontSizes.$2};
  }
`;

const AnswerWrapper = styled(motion.div)`
  overflow: hidden;
  background-color: ${colors.white};
  user-select: none;
`;

const AnswerInner = styled.div`
  font-family: 'Rubik', Sans-serif;
  font-size: ${typography.fontSizes.$4};
  font-weight: ${typography.fontWeights.normal};
  line-height: 26px;
  color: ${colors.mutedPurple};
  letter-spacing: -0.24px;
  padding: 40px 45px 35px;
  @media ${device.tablet} {
    font-size: ${typography.fontSizes.$2};
  }
`;

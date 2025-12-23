import React from 'react';

import { Alert, Empty, Image, Spin } from 'antd';
import styled from 'styled-components';

import { getMostBookedVehicle } from '@/api';
import { Title } from '@/components';
import { useFetchData } from '@/hooks';
import theme from '@/theme';

const { colors, typography } = theme;
const MostBookedVehicle = () => {
  const { data, loading, error } = useFetchData<IMostBookedVehicle>(() => getMostBookedVehicle());

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <>
      <Title $variant="xsmall" $mb="16px">
        Most Booked Vehicle
      </Title>
      {data ? (
        <Container>
          <ImageWrapper>
            <Image src={data?.image} alt={`${data?.brand} ${data?.model}`} height={200} style={{ objectFit: 'contain' }} />
          </ImageWrapper>
          <TextWrapper>
            <p>
              <span>Brand:</span>
              {data?.brand.toUpperCase()}
            </p>
            <p>
              <span>Model:</span>
              {data?.model.toUpperCase()}
            </p>
            <p>
              <span>BookingCount:</span>
              {data?.bookingCount}
            </p>
          </TextWrapper>
        </Container>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default MostBookedVehicle;

const Container = styled.div`
  display: flex;
  gap: 48px;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  p {
    font-size: ${typography.fontSizes.$5};
    font-weight: ${typography.fontWeights.medium};
    color: ${colors.richBlack};
    line-height: 1.5;
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      color: ${colors.mutedPurple};
    }
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

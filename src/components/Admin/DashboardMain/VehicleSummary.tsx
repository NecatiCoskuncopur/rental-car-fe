import React from 'react';

import { Alert, Spin } from 'antd';
import styled from 'styled-components';

import { getVehicleAvailability } from '@/api';
import { useFetchData } from '@/hooks';
import theme from '@/theme';
import { Wrapper } from './styles';

const { colors, typography } = theme;
const VehicleSummary = () => {
  const { data: summaryData, loading: summaryLoading, error: summaryError } = useFetchData<IVehicleAvailability>(() => getVehicleAvailability());

  if (summaryLoading) return <Spin />;
  if (summaryError) return <Alert message="Error" description={summaryError} type="error" showIcon />;

  return (
    <>
      <Wrapper $variant="sm">
        <TextWrapper>
          <span>Total Vehicles: </span>
          {summaryData?.totalVehicles}
        </TextWrapper>
      </Wrapper>
      <Wrapper $variant="sm">
        <TextWrapper>
          <span>Rented Vehicles: </span> {summaryData?.rentedVehiclesToday}
        </TextWrapper>
      </Wrapper>
      <Wrapper $variant="sm">
        <TextWrapper>
          <span> Available Vehicles:</span>
          {summaryData?.availableVehiclesToday}
        </TextWrapper>
      </Wrapper>
    </>
  );
};

export default VehicleSummary;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.richBlack};
  font-weight: ${typography.fontWeights.medium};
  font-size: ${typography.fontSizes.$5};
  span {
    color: ${colors.mutedPurple};
  }
`;

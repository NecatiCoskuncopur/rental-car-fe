import React from 'react';

import { Alert, Spin } from 'antd';
import styled from 'styled-components';

import { getVehicleAvailability } from '@/api';
import { useFetchData } from '@/hooks';
import theme from '@/theme';

const { borderRadius, colors, device, typography } = theme;
const VehicleSummary = () => {
  const { data: summaryData, loading: summaryLoading, error: summaryError } = useFetchData<IVehicleAvailability>(() => getVehicleAvailability());

  if (summaryLoading) return <Spin />;
  if (summaryError) return <Alert message="Error" description={summaryError} type="error" showIcon />;

  return (
    <Wrapper>
      <TextWrapper>
        <span>Total Vehicles: </span>
        {summaryData ? summaryData.totalVehicles : 'No Data'}
      </TextWrapper>

      <TextWrapper>
        <span>Rented Vehicles: </span> {summaryData ? summaryData.rentedVehiclesToday : 'No Data'}
      </TextWrapper>

      <TextWrapper>
        <span> Available Vehicles:</span>
        {summaryData ? summaryData.availableVehiclesToday : 'No Data'}
      </TextWrapper>
    </Wrapper>
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
  background-color: ${colors.white};
  padding: 30px;
  border-radius: ${borderRadius.sm};
  box-shadow:
    rgba(145, 158, 171, 0.3) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  span {
    color: ${colors.mutedPurple};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: calc(33.3333% - 16px);
  @media ${device.desktop} {
    width: 100%;
    gap: 12px;
  }
`;

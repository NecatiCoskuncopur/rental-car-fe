import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { getVehicles } from '@/api';
import { Container, Error, Title, VehicleCard, VehicleFilter } from '@/components';
import { useFetchData } from '@/hooks';
import theme from '@/theme';

const { colors, device, typography } = theme;

const Vehicles = () => {
  const router = useRouter();

  const { startDate, endDate, vehicleType, fuelType, transmissionType } = router.query;

  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>(() => {
    const start = startDate ? dayjs(startDate as string) : dayjs();
    const end = endDate ? dayjs(endDate as string) : dayjs().add(1, 'day');
    return [start, end];
  });

  const [filters, setFilters] = useState(() => {
    const start = startDate ? dayjs(startDate as string) : dayjs();
    const end = endDate ? dayjs(endDate as string) : dayjs().add(1, 'day');
    return {
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      vehicleType: Array.isArray(vehicleType) ? vehicleType[0] : (vehicleType as string) || '',
      fuelType: Array.isArray(fuelType) ? fuelType[0] : (fuelType as string) || '',
      transmissionType: Array.isArray(transmissionType) ? transmissionType[0] : (transmissionType as string) || '',
    };
  });

  const fetchVehicles = useCallback(() => {
    const activeFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ''));
    return getVehicles(activeFilters);
  }, [filters]);

  const { data, loading, error, refetch } = useFetchData<IVehicleData>(fetchVehicles);

  const handleInputChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const [start, end] = dateRange;
    setFilters(prev => ({
      ...prev,
      startDate: start?.format('YYYY-MM-DD') || '',
      endDate: end?.format('YYYY-MM-DD') || '',
    }));
  };

  useEffect(() => {
    refetch();
  }, [filters]);

  const resetFilters = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      vehicleType: '',
      fuelType: '',
      transmissionType: '',
    }));
  };

  if (error) {
    return <Error />;
  }

  return (
    <StyledContainer>
      <Wrapper>
        <Aside>
          <VehicleFilter
            handleSearch={handleSearch}
            handleInputChange={handleInputChange}
            dateRange={dateRange}
            setDateRange={setDateRange}
            filters={filters}
            resetFilters={resetFilters}
          />
        </Aside>
        {loading ? (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        ) : (
          <List>
            {data?.totalVehicles === 0 ? (
              <Result>
                <Title $variant="xxsmall" $mb="12px">
                  No Vehicles Found
                </Title>
                <p>Unfortunately, we couldn't find any offers that match your filter setting</p>
                <div onClick={resetFilters}>Clear Filter</div>
              </Result>
            ) : (
              data?.vehicles.map(vehicle => <VehicleCard key={vehicle._id} vehicle={vehicle} startDate={startDate} endDate={endDate} />)
            )}
          </List>
        )}
      </Wrapper>
    </StyledContainer>
  );
};

export default Vehicles;

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
  width: calc(75% - 12px);
  @media ${device.laptop} {
    width: 100%;
  }
`;

const Aside = styled.aside`
  width: calc(25% - 12px);
  .ant-select-single {
    width: 100%;
  }
  @media ${device.laptop} {
    width: 100%;
  }
`;

const Result = styled.div`
  font-weight: ${typography.fontWeights.medium};
  color: ${colors.richBlack};
  max-width: 400px;
  p {
    color: ${colors.mutedPurple};
  }
  div {
    font-size: ${typography.fontSizes.$2};
    font-weight: ${typography.fontWeights.medium};
    color: ${colors.red};
    margin-top: 8px;
    cursor: pointer;
  }
`;

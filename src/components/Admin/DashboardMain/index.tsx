import React from 'react';

import { ColumnsType } from 'antd/es/table';

import { getTopUsers } from '@/api';
import { useFetchData } from '@/hooks';
import MonthlyIncome from './MonthlyIncome';
import MostBookedVehicle from './MostBookedVehicle';
import NewUserStats from './NewUserStats';
import { Row, Wrapper } from './styles';
import TableSection from './TableSection';
import VehicleSummary from './VehicleSummary';
import YearlyIncome from './YearlyIncome';

const DashboardMain = () => {
  const { data: topUsersResponse, loading, error } = useFetchData<{ topUsers: ITopUsers[] }>(() => getTopUsers());

  const topUsers = topUsersResponse?.topUsers ?? [];

  const userColumnns: ColumnsType<ITopUsers> = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Booking Count',
      dataIndex: 'bookingCount',
    },
  ];

  return (
    <>
      <Row>
        <Wrapper $variant="md">
          <MonthlyIncome />
        </Wrapper>
        <Wrapper $variant="sm">
          <YearlyIncome />
        </Wrapper>
      </Row>
      <Row>
        <Wrapper $variant="sm">
          <NewUserStats />
        </Wrapper>
        <Wrapper $variant="md">
          <TableSection title="Top Users" href="/adminDashboard/users" error={error} loading={loading} data={topUsers || []} columns={userColumnns} />
        </Wrapper>
      </Row>
      <Row>
        <Wrapper $variant="md">
          <MostBookedVehicle />
        </Wrapper>
        <VehicleSummary />
      </Row>
    </>
  );
};

export default DashboardMain;

import React from 'react';

import { Alert, Empty, Spin } from 'antd';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { getNewUserStats } from '@/api';
import { Title } from '@/components';
import { useFetchData } from '@/hooks';
import theme from '@/theme';

const COLORS = [theme.colors.coralAccent, theme.colors.vibrantBlue, theme.colors.brightGreen, theme.colors.red];

const NewUserStats = () => {
  const dayStats = useFetchData(() => getNewUserStats('day'));
  const weekStats = useFetchData(() => getNewUserStats('week'));
  const monthStats = useFetchData(() => getNewUserStats('month'));
  const yearStats = useFetchData(() => getNewUserStats('year'));

  const loading = dayStats.loading || weekStats.loading || monthStats.loading || yearStats.loading;
  const error = dayStats.error || weekStats.error || monthStats.error || yearStats.error;

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  const data = [
    { name: 'Today', value: dayStats.data?.newUsers ?? 0 },
    { name: 'This Week', value: weekStats.data?.newUsers ?? 0 },
    { name: 'This Month', value: monthStats.data?.newUsers ?? 0 },
    { name: 'This Year', value: yearStats.data?.newUsers ?? 0 },
  ];

  return (
    <>
      <Title $variant="xsmall" $mb="16px">
        New Users
      </Title>
      {data ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={5}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default NewUserStats;

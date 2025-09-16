import React, { useState } from 'react';

import { Alert, Select, Spin } from 'antd';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { getMonthlyIncome } from '@/api';
import { Title } from '@/components';
import { useFetchData } from '@/hooks';
import theme from '@/theme';
import { Header } from './styles';

interface IMonthlyIncomeResponse {
  income: IIncome[];
}

const MonthlyIncome = () => {
  const { data: monthlyIncome, loading, error } = useFetchData<IMonthlyIncomeResponse>(() => getMonthlyIncome());
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const incomeList = monthlyIncome?.income ?? [];

  const filteredData = incomeList.filter(item => item._id.startsWith(selectedYear));

  const chartData = allMonths.map((month, index) => {
    const monthStr = (index + 1).toString().padStart(2, '0');
    const fullId = `${selectedYear}-${monthStr}`;
    const monthData = filteredData.find(item => item._id === fullId);

    return {
      month,
      Income: monthData ? monthData.totalIncome : 0,
    };
  });

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={String(error)} type="error" showIcon />;

  const uniqueYears = Array.from(new Set(incomeList.map(item => item._id.split('-')[0])));

  return (
    <>
      <Header>
        <Title $variant="xsmall">Monthly Income</Title>
        <Select value={selectedYear} onChange={handleYearChange} options={uniqueYears.map(year => ({ value: year, label: year }))} />
      </Header>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 50 }}>
          <XAxis dataKey="month" angle={-45} textAnchor="end" dy={10} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Income" fill={theme.colors.focusBlue} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default MonthlyIncome;

import React from 'react';

import { Alert, Empty, Spin } from 'antd';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';

import { getYearlyIncome } from '@/api';
import { useFetchData } from '@/hooks';
import theme from '@/theme';
import { Header } from './styles';

const { colors, typography } = theme;

const COLORS = [colors.vibrantOrange, colors.vibrantBlue, colors.vibrantRed, colors.focusBlue, colors.lightIndigo];

interface IYearlyIncomeResponse {
  income: IIncome[];
}

const YearlyIncome = () => {
  const { data: yearlyIncome, loading, error } = useFetchData<IYearlyIncomeResponse>(() => getYearlyIncome());

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={String(error)} type="error" showIcon />;

  const incomeList = yearlyIncome?.income ?? [];

  const yearlyIncomeMap: Record<string, number> = {};
  incomeList.forEach(({ _id, totalIncome }) => {
    const year = _id.toString();
    yearlyIncomeMap[year] = (yearlyIncomeMap[year] || 0) + totalIncome;
  });

  const chartData = Object.keys(yearlyIncomeMap).map((year, index) => ({
    name: year,
    value: yearlyIncomeMap[year],
    color: COLORS[index % COLORS.length],
  }));

  const valueFormatter = (value: number) => `$${value.toLocaleString()}`;

  return (
    <>
      <Header>
        <h1>Yearly Income</h1>
      </Header>
      {yearlyIncome ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={valueFormatter} />
            </PieChart>
          </ResponsiveContainer>

          <TagsContainer>
            {chartData.map(entry => (
              <Tag key={entry.name} color={entry.color}>
                {entry.name}
              </Tag>
            ))}
          </TagsContainer>
        </>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default YearlyIncome;

const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const Tag = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 4px;
  border-radius: 20px;
  background: ${({ color }) => color};
  color: ${colors.white};
  font-size: ${typography.fontSizes.$2};
  font-weight: ${typography.fontWeights.bold};
`;

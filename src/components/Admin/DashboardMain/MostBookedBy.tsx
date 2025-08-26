import React, { useEffect, useState } from 'react';

import { Alert, Select, Spin } from 'antd';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { getMostBookedBy } from '@/api';
import { Title } from '@/components';
import { useFetchData } from '@/hooks';

type VehicleStatsField = 'vehicleType' | 'fuelType' | 'transmissionType';

type PieChartDataItem = {
  name: string;
  value: number;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const fieldOptions: { label: string; value: VehicleStatsField }[] = [
  { label: 'Vehicle Type', value: 'vehicleType' },
  { label: 'Fuel Type', value: 'fuelType' },
  { label: 'Transmission Type', value: 'transmissionType' },
];

const MostBookedBy = () => {
  const [selectedField, setSelectedField] = useState<VehicleStatsField>('vehicleType');

  const { data, loading, error, refetch } = useFetchData<IMostBookedItem[]>(() => getMostBookedBy(selectedField));

  const chartData: PieChartDataItem[] =
    data?.map(item => ({
      name: item._id,
      value: item.bookingCount,
    })) ?? [];

  const fieldLabels: Record<VehicleStatsField, string> = {
    vehicleType: 'Vehicle Type',
    fuelType: 'Fuel Type',
    transmissionType: 'Transmission Type',
  };

  useEffect(() => {
    refetch();
  }, [selectedField]);

  return (
    <>
      <Title $variant="xsmall" $mb="16px">
        Most Booked by {fieldLabels[selectedField]}
      </Title>

      <Select style={{ width: 200, marginBottom: 16 }} value={selectedField} onChange={value => setSelectedField(value)} options={fieldOptions} />

      {loading && <Spin />}
      {error && <Alert message="Error" description={error} type="error" showIcon />}

      {!loading && !error && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={5}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default MostBookedBy;

import React from 'react';

import { DatePicker, Select, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';

import { vehicleFilterFormData } from '@/data';
import theme from '@/theme';
import Button from '../Button';

const { RangePicker } = DatePicker;

type VehicleFilterProps = {
  handleSearch: () => void;
  handleInputChange: (name: string, value: string) => void;
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  setDateRange: React.Dispatch<React.SetStateAction<[dayjs.Dayjs | null, dayjs.Dayjs | null]>>;
  filters: {
    startDate: string;
    endDate: string;
    vehicleType: string;
    fuelType: string;
    transmissionType: string;
  };
  resetFilters: () => void;
};

const { borderRadius, colors, typography } = theme;
const VehicleFilter: React.FC<VehicleFilterProps> = ({ handleSearch, handleInputChange, dateRange, setDateRange, filters, resetFilters }) => {
  const disabledDate = (current: Dayjs) => {
    return current && current.isBefore(dayjs().startOf('day'));
  };

  const selectedFilters = Object.entries(filters)
    .filter(([key, value]) => value)
    .filter(([key]) => key !== 'startDate' && key !== 'endDate')
    .map(([key, value]) => {
      const label = vehicleFilterFormData.find(item => item.id === key)?.label || key;
      return { key, label, value };
    });

  return (
    <Wrapper>
      {selectedFilters.length > 0 && (
        <SelectedTags>
          {selectedFilters.map(filter => (
            <Tag key={filter.key} closable onClose={() => handleInputChange(filter.key, '')}>
              {filter.label}: {filter.value}
            </Tag>
          ))}
        </SelectedTags>
      )}
      {vehicleFilterFormData.map(item => (
        <SelectWrapper key={item.id}>
          <p>{item.label}</p>
          <Select id={item.id} value={filters[item.id] || undefined} onChange={value => handleInputChange(item.id, value)} allowClear>
            {item.options.map(option => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </SelectWrapper>
      ))}
      <Separator />
      <p>Date</p>
      <RangePicker
        value={dateRange}
        onChange={value => setDateRange(value as [dayjs.Dayjs | null, dayjs.Dayjs | null])}
        disabledDate={disabledDate}
        format="DD MMMM, YYYY"
      />
      <Button $variant="secondary" onClick={handleSearch} $mt="20px" $width="100%">
        Search
      </Button>
      {selectedFilters.length > 0 && <Reset onClick={resetFilters}>Clear Filters</Reset>}
    </Wrapper>
  );
};

export default VehicleFilter;

const SelectedTags = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid ${colors.mediumGray};
  border-radius: ${borderRadius.md};
`;

const SelectWrapper = styled.div`
  margin-bottom: 24px;
  p {
    color: ${colors.richBlack};
    font-weight: ${typography.fontWeights.medium};
    margin-bottom: 12px;
  }
`;

const Separator = styled.div`
  margin: 24px 0;
  border-bottom: 1px solid ${colors.mediumGray};
`;

const Reset = styled.div`
  text-align: center;
  font-size: ${typography.fontSizes.$3};
  font-weight: ${typography.fontWeights.medium};
  color: ${colors.red};
  margin-top: 20px;
  cursor: pointer;
`;

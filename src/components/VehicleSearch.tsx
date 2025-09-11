import React from 'react';
import { useRouter } from 'next/router';

import { DatePicker, Form, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';

import theme from '@/theme';
import Button from './Button';
import Title from './Title';

const { borderRadius, colors, device } = theme;
const { Option } = Select;

enum VehicleType {
  Sedan = 'sedan',
  SUV = 'suv',
  Hatchback = 'hatchback',
  StationVagon = 'station vagon',
  MPV = 'mpv',
}
enum TransmissionType {
  Automatic = 'automatic',
  Manual = 'manual',
}
enum FuelType {
  Gasoline = 'gasoline',
  Diesel = 'diesel',
  Electric = 'electric',
  Hybrid = 'hybrid',
}

const VehicleSearch = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (values: IVehicleSearchFilter) => {
    const query: Record<string, string> = {
      startDate: values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD') : '',
      endDate: values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : '',
    };

    if (values.vehicleType) query.vehicleType = values.vehicleType;
    if (values.transmissionType) query.transmissionType = values.transmissionType;
    if (values.fuelType) query.fuelType = values.fuelType;

    router.push({
      pathname: '/vehicles',
      query,
    });
  };

  const disabledStartDate = (current: Dayjs) => {
    if (!current) return false;
    const endDate = form.getFieldValue('endDate');
    if (current < dayjs().startOf('day')) return true;
    if (endDate && current > dayjs(endDate).endOf('day')) return true;

    return false;
  };

  const disabledEndDate = (current: Dayjs) => {
    if (!current) return false;
    const startDate = form.getFieldValue('startDate');
    if (current < dayjs().startOf('day')) return true;
    if (startDate && current <= dayjs(startDate).endOf('day')) return true;

    return false;
  };
  return (
    <Container>
      <Wrapper>
        <Title $variant="small" $mb="20px">
          Book a Car
        </Title>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row>
            <Form.Item label="Vehicle Type" name="vehicleType">
              <Select placeholder="Select vehicle type" allowClear>
                {Object.values(VehicleType).map(type => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Transmission" name="transmissionType">
              <Select placeholder="Select transmission" allowClear>
                {Object.values(TransmissionType).map(type => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Fuel Type" name="fuelType">
              <Select placeholder="Select fuel type" allowClear>
                {Object.values(FuelType).map(type => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Please select a start date' }]}>
              <DatePicker style={{ width: '100%' }} disabledDate={disabledStartDate} />
            </Form.Item>

            <Form.Item label="Return Date" name="endDate" rules={[{ required: true, message: 'Please select a return date' }]}>
              <DatePicker style={{ width: '100%' }} disabledDate={disabledEndDate} />
            </Form.Item>

            <Form.Item>
              <Button $width="100%" $variant="gradient" $mt="25px" type="submit">
                Search Vehicles
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default VehicleSearch;
const Wrapper = styled.div`
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.03);
  background-color: ${colors.white};
  border-radius: ${borderRadius.sm};
  padding: 40px 45px 50px 55px;
  max-width: 1120px;
  margin: 0 auto;
  position: relative;
  bottom: 0;
  left: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  flex-wrap: wrap;
  .ant-form-item {
    width: calc(100% / 3 - 16px);
    @media ${device.tablet} {
      width: 100%;
    }
  }
`;

const Container = styled.div`
  margin-top: -60px;
  @media ${device.tablet} {
    margin-top: 0;
  }
`;

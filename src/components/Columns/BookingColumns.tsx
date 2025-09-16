import React from 'react';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, TableColumnsType, Typography } from 'antd';
import styled, { css } from 'styled-components';

import theme from '@/theme';
import { formatDate } from '@/utils';

const { colors, typography } = theme;

type UpdateStatus = 'confirmed' | 'cancelled';

const getBookingColumns = (showDetailModal: (id: string) => void, handleUpdate: (id: string, status: UpdateStatus) => void): TableColumnsType<IBooking> => [
  {
    title: 'Vehicle Name',
    key: 'vehicle',
    render: (_: unknown, record: IBooking) => {
      const brand = record?.vehicleId?.brand ?? '—';
      const model = record?.vehicleId?.model ?? '';
      const text = `${brand} ${model}`.trim();
      return text === '' ? '—' : text;
    },
  },
  {
    title: 'User',
    key: 'user',
    render: (_: unknown, record: IBooking) => {
      const name = record?.userId?.name ?? (record?.userId ? '' : 'Deleted user');
      const surname = record?.userId?.surname ?? '';
      const text = `${name} ${surname}`.trim();
      return text === '' ? '—' : text;
    },
  },
  {
    title: 'Date',
    key: 'dates',
    render: (_: unknown, record: IBooking) => (
      <Space size="small" direction="vertical">
        <Space size="small">
          <strong>Pickup:</strong>
          {record?.startDate ? formatDate(record.startDate) : '—'}
        </Space>
        <Space size="small">
          <strong>Return:</strong>
          {record?.endDate ? formatDate(record.endDate) : '—'}
        </Space>
      </Space>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_: unknown, record: IBooking) => {
      const id = record?._id;
      const status = record?.status ?? 'pending';

      if (status === 'pending') {
        return (
          <Space size="small">
            <IconButton onClick={() => id && handleUpdate(id, 'confirmed')} title="Confirm Booking" disabled={!id}>
              <CheckOutlined style={{ color: 'green' }} />
            </IconButton>
            <IconButton onClick={() => id && handleUpdate(id, 'cancelled')} title="Cancel Booking" disabled={!id}>
              <CloseOutlined style={{ color: 'red' }} />
            </IconButton>
          </Space>
        );
      }
      return <Tag $status={status}>{status}</Tag>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: unknown, record: IBooking) => (
      <Space size="middle">
        <Typography.Link onClick={() => showDetailModal(record._id)}>View</Typography.Link>
      </Space>
    ),
  },
];

export default getBookingColumns;

const Tag = styled.span<{ $status: string }>`
  font-size: ${typography.fontSizes.$2};
  padding: 8px 4px;
  border-radius: 5px;
  ${props =>
    props.$status === 'pending'
      ? css`
          background-color: rgba(255, 147, 7, 0.1);
          color: ${colors.vibrantOrange};
        `
      : props.$status === 'confirmed'
        ? css`
            background-color: rgba(31, 188, 47, 0.1);
            color: ${colors.successGreen};
          `
        : css`
            background-color: rgba(255, 0, 0, 0.1);
            color: ${colors.accentRed};
          `}
`;

const IconButton = styled.button<{ disabled?: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: transform 0.2s;
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  pointer-events: ${p => (p.disabled ? 'none' : 'auto')};

  &:hover {
    transform: scale(1.1);
  }
`;

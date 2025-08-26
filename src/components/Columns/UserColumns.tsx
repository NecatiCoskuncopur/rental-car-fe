import React from 'react';

import { Space, TableColumnsType, Typography } from 'antd';

const { Text, Link } = Typography;

const getUserColumns = (showDeleteModal: (id: string) => void): TableColumnsType<IUser> => [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Full Name',
    key: 'fullName',
    render: (text, record) => `${record.name} ${record.surname}`,
  },
  {
    title: 'Birth Date',
    key: 'dateOfBirth',
    render: (text, record) =>
      new Date(record.dateOfBirth).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        {record.isAdmin ? (
          <Text>Admin</Text>
        ) : (
          <Link type="danger" onClick={() => showDeleteModal(record._id)}>
            Delete
          </Link>
        )}
      </Space>
    ),
  },
];

export default getUserColumns;

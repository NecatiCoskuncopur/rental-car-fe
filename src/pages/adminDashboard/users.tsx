import React, { useEffect, useState } from 'react';

import { Alert, Table } from 'antd';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { deleteUser, getUsers } from '@/api';
import { AdminLayout, DeleteModal, UserColumns } from '@/components';
import { useDeleteData, useFetchData } from '@/hooks';
import theme from '@/theme';

const { borderRadius, colors } = theme;
const Users = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, refetch } = useFetchData<IUserData>(() => getUsers({ limit: '6', page: currentPage.toString() }));
  const {
    state: { loading: deleteLoading },
    deleteItem,
  } = useDeleteData(() => deleteUser(selectedUser!));

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const showDeleteModal = (userId: string) => {
    setSelectedUser(userId);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteItem();
      toast.success('User deleted successfully');
      refetch();
    } catch {
      toast.error('Failed to delete user');
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const dataSource = data
    ? data?.users.map((user: IUser) => ({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        __v: user.__v,
      }))
    : [];

  const columns = UserColumns(showDeleteModal);

  return (
    <AdminLayout>
      <Wrapper>
        {error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            scroll={{ x: 1024 }}
            loading={loading}
            pagination={{
              current: data?.currentPage,
              pageSize: data?.perPage,
              total: data ? data.totalUsers : 0,
              onChange: page => setCurrentPage(page),
              hideOnSinglePage: true,
              showLessItems: true,
            }}
          />
        )}
        <DeleteModal isVisible={isModalVisible} handleDelete={handleDelete} handleCancel={handleCancel} loading={deleteLoading} type="user" />
      </Wrapper>
    </AdminLayout>
  );
};

export default Users;

Users.minimalLayout = true;

const Wrapper = styled.div`
  margin: 16px;
  background-color: ${colors.white};
  padding: 30px;
  border-radius: ${borderRadius.sm};
  box-shadow:
    rgba(145, 158, 171, 0.3) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
`;

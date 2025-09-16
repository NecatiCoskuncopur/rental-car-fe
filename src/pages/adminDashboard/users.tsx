import React, { useEffect, useState } from 'react';

import { Alert, Table } from 'antd';
import { toast } from 'react-toastify';

import { deleteUser, getUsers } from '@/api';
import { AdminLayout, DeleteModal, TableWrapper, UserColumns } from '@/components';
import { useDeleteData, useFetchData } from '@/hooks';

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
      }))
    : [];

  const columns = UserColumns(showDeleteModal);

  return (
    <AdminLayout>
      <TableWrapper>
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
      </TableWrapper>
    </AdminLayout>
  );
};

export default Users;

Users.minimalLayout = true;

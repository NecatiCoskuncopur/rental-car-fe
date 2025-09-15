import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Modal, Table, Typography } from 'antd';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { getUserBookings } from '@/api';
import updateBooking from '@/api/booking/updateBooking';
import { Error, OverlayLoader, ProfileLayout, Title, UserBookingColumns, UserBookingDetail } from '@/components';
import { useFetchData, useUpdateData } from '@/hooks';
import theme from '@/theme';

const { borderRadius, colors } = theme;
const UserBookings = () => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const pageSize = 6;

  const [selectedBooking, setSelectedBooking] = React.useState<IUserBooking | null>(null);
  const [actionType, setActionType] = React.useState<'view' | 'cancel' | null>(null);

  const {
    data,
    loading,
    error: bookingError,
    refetch,
  } = useFetchData<IUserBookingData>(() => getUserBookings({ limit: pageSize.toString(), page: page.toString() }));

  const { loading: updateLoading, mutate } = useUpdateData<IUserBooking, { bookingId: string; status: 'confirmed' | 'cancelled' }>(({ bookingId, status }) =>
    updateBooking({ bookingId, status }),
  );

  const openModal = (record: IUserBooking, action: 'view' | 'cancel') => {
    setSelectedBooking(record);
    setActionType(action);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setActionType(null);
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      await mutate({ bookingId: selectedBooking._id, status: 'cancelled' });
      toast.success('Booking has been successfully cancelled.');
      closeModal();
      refetch();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = (error.response?.data as { message?: string })?.message || error.message || 'Failed to cancel booking.';
        toast.error(`Error cancelling booking: ${message}`);
      } else if (error instanceof Error) {
        toast.error(`Error cancelling booking: ${error}`);
      } else {
        toast.error('An unknown error occurred while cancelling booking.');
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(
      {
        pathname: '/profile/userBookings',
        query: { page: newPage },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    refetch();
  }, [router.query.page]);

  if (bookingError) return <Error />;

  const dataSource = data
    ? data.bookings.map((item: IUserBooking) => ({
        _id: item._id,
        startDate: item.startDate,
        endDate: item.endDate,
        status: item.status,
        totalPrice: item.totalPrice,
        vehicleId: item.vehicleId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }))
    : [];

  const columns = UserBookingColumns(
    (record: IUserBooking) => openModal(record, 'view'),
    (record: IUserBooking) => openModal(record, 'cancel'),
  );

  return (
    <ProfileLayout title="Bookings">
      {loading ? (
        <LoaderWrapper>
          <OverlayLoader variant="table" />
        </LoaderWrapper>
      ) : (
        <Card>
          <Title $variant="xxsmall" $mb="24px">
            Bookings
          </Title>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            scroll={{ x: 1024 }}
            loading={loading}
            pagination={{
              current: data?.currentPage ?? 1,
              pageSize: data?.perPage ?? 10,
              total: data?.totalBookings ?? 0,
              onChange: handlePageChange,
              hideOnSinglePage: true,
              showLessItems: true,
            }}
          />
          <Modal
            open={!!selectedBooking && actionType === 'cancel'}
            onCancel={closeModal}
            onOk={handleCancelBooking}
            okText="Confirm Cancel"
            cancelText="Close"
            title="Cancel Booking"
            loading={updateLoading}
            okType="danger"
          >
            <Typography.Text type="danger">Are you sure you want to delete this booking? This action cannot be undone.</Typography.Text>
          </Modal>
          <Modal open={!!selectedBooking && actionType === 'view'} onCancel={closeModal} footer={null} width={800}>
            <UserBookingDetail data={selectedBooking} />
          </Modal>
        </Card>
      )}
    </ProfileLayout>
  );
};

const LoaderWrapper = styled.div`
  padding: 90px 16px;
`;

const Card = styled.div`
  padding: 32px;
  border-radius: ${borderRadius.md};
  box-shadow:
    0 0 2px 0 rgba(145, 158, 171, 0.3),
    0 12px 24px -4px rgba(145, 158, 171, 0.12);
  background-color: ${colors.white};
  width: 100%;
`;

export default UserBookings;

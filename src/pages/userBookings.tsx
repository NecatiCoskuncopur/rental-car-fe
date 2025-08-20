import React from 'react';
import { useRouter } from 'next/router';

import { Modal, Table, Typography } from 'antd';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { getUserBookings } from '@/api';
import updateBooking from '@/api/booking/updateBooking';
import { Container, Error, getUserBookingsColumns, OverlayLoader, UserBookingDetail, UserDashboardHeader } from '@/components';
import { useFetchData, useUpdateData } from '@/hooks';

const UserBookings = () => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const pageSize = 10;

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
    router.push(`/userBookings?page=${newPage}`);
  };

  if (bookingError) return <Error />;

  const dataSource = data
    ? data.bookings.map((item: IUserBooking) => ({
        _id: item._id,
        startDate: item.startDate,
        endDate: item.endDate,
        status: item.status,
        totalPrice: item.totalPrice,
        vehicle: item.vehicle,
      }))
    : [];

  const columns = getUserBookingsColumns(
    (record: IUserBooking) => openModal(record, 'view'),
    (record: IUserBooking) => openModal(record, 'cancel'),
  );

  return (
    <>
      <UserDashboardHeader />
      {loading ? (
        <LoaderWrapper>
          <OverlayLoader variant="table" />
        </LoaderWrapper>
      ) : (
        <StyledContainer>
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
        </StyledContainer>
      )}
    </>
  );
};

const StyledContainer = styled(Container)`
  padding: 90px 16px;
`;

const LoaderWrapper = styled.div`
  padding: 90px 16px;
`;

export default UserBookings;

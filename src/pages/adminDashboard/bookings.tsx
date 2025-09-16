import React, { useEffect, useState } from 'react';

import { Alert, Modal, Table } from 'antd';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getBookings, updateBooking } from '@/api';
import { AdminLayout, BookingColumns, BookingDetail, TableWrapper } from '@/components';
import { useFetchData, useUpdateData } from '@/hooks';

type ModalType = 'delete' | 'detail' | null;

const Bookings = () => {
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, refetch } = useFetchData<IBookingData>(() => getBookings({ limit: '6', page: currentPage.toString() }));

  const { mutate } = useUpdateData<IUserBooking, { bookingId: string; status: 'confirmed' | 'cancelled' }>(({ bookingId, status }) =>
    updateBooking({ bookingId, status }),
  );

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const openModal = (type: ModalType, bookingId?: string) => {
    if (bookingId) {
      const booking = data?.bookings.find(b => b._id === bookingId) || null;
      setSelectedBooking(booking);
    } else {
      setSelectedBooking(null);
    }
    setModalType(type);
  };

  const handleUpdateBooking = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
    try {
      await mutate({ bookingId, status });
      toast.success(`Booking has been successfully ${status === 'confirmed' ? 'confirmed' : 'cancelled'}.`);
      setModalType(null);
      refetch();
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = (err.response?.data as { message?: string })?.message || err.message || `Failed to ${status} booking.`;
        toast.error(`Error ${status} booking: ${message}`);
      } else if (err instanceof Error) {
        toast.error(`Error ${status} booking: ${err.message}`);
      } else {
        toast.error(`An unknown error occurred while trying to ${status} booking.`);
      }
    }
  };

  const handleCancel = () => {
    setModalType(null);
    setSelectedBooking(null);
  };

  const dataSource = data?.bookings
    ? data.bookings.map((booking: IBooking) => ({
        _id: booking._id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: booking.status,
        totalPrice: booking.totalPrice,
        vehicleId: booking.vehicleId,
        userId: booking.userId,
        updatedAt: booking.updatedAt,
        createdAt: booking.createdAt,
      }))
    : [];

  const columns = BookingColumns(
    bookingId => openModal('detail', bookingId),
    (bookingId, status) => handleUpdateBooking(bookingId, status),
  );

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
              current: currentPage,
              pageSize: data?.perPage,
              total: data ? data.totalBookings : 0,
              onChange: page => setCurrentPage(page),
              hideOnSinglePage: true,
              showLessItems: true,
            }}
          />
        )}

        {modalType === 'detail' && (
          <Modal open={modalType === 'detail'} onCancel={handleCancel} footer={null} width={800}>
            <BookingDetail data={selectedBooking} />
          </Modal>
        )}
      </TableWrapper>
    </AdminLayout>
  );
};

export default Bookings;

Bookings.minimalLayout = true;

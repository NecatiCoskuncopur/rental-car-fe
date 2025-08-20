import api from '../axiosInstance';

const updateBooking = async ({ bookingId, status }: IUpdateBookingPayload) => {
  const response = await api.patch(`/booking/updateBooking/${bookingId}`, {
    status,
  });
  return response.data;
};

export default updateBooking;

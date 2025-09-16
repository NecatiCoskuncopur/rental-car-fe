import api from '../axiosInstance';

const getBookings = async (pagination?: IBookingPaginationQueryParams) => {
  const params = new URLSearchParams();

  if (pagination) {
    Object.entries(pagination).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
  }

  const response = await api.get(`/booking/getBookings?${params.toString()}`);
  return response.data;
};

export default getBookings;

import api from '../axiosInstance';

const getUserBooking = async (pagination?: IPaginationData) => {
  const params = new URLSearchParams();

  if (pagination) {
    Object.entries(pagination).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
  }

  const response = await api.get(`/user/getUser/bookings?${params.toString()}`);
  return response.data;
};

export default getUserBooking;

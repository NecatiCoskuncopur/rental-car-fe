import api from '../axiosInstance';

const getUserBookings = async (pagination?: IPaginationQueryParams) => {
  const params = new URLSearchParams();

  if (pagination) {
    Object.entries(pagination).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
  }

  const response = await api.get(`/user/getUserBookings?${params.toString()}`);
  return response.data;
};

export default getUserBookings;

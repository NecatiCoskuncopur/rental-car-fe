import api from '../axiosInstance';

const getUsers = async (pagination?: IPaginationQueryParams) => {
  const params = new URLSearchParams();

  if (pagination) {
    Object.entries(pagination).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
  }

  const response = await api.get(`/user/getUsers?${params.toString()}`);
  return response.data;
};

export default getUsers;

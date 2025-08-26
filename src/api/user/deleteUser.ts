import api from '../axiosInstance';

const deleteUser = async (id: string) => {
  const response = await api.delete(`/user/deleteUser/${id}`);
  return response.data;
};

export default deleteUser;

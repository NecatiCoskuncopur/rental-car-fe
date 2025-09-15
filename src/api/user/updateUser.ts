import api from '../axiosInstance';

const updateUser = async ({ userId, ...rest }: IUpdateUserPayload) => {
  const response = await api.patch(`/user/updateUser/${userId}`, rest);
  return response.data;
};

export default updateUser;

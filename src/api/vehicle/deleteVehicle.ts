import api from '../axiosInstance';

const deleteVehicle = async (id: string) => {
  const response = await api.delete(`/vehicle/deleteVehicle/${id}`);
  return response.data;
};

export default deleteVehicle;

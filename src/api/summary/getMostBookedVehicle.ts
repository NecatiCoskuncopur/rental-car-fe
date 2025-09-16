import api from '../axiosInstance';

const getMostBookedVehicle = async () => {
  const response = await api.get('/summary/mostBookedVehicle');
  return response.data;
};

export default getMostBookedVehicle;

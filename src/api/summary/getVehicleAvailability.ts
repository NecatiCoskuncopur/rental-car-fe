import api from '../axiosInstance';

const getVehicleAvailability = async () => {
  const response = await api.get('/summary/vehicleAvailability');
  return response.data;
};

export default getVehicleAvailability;

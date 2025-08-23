import api from '../axiosInstance';

type VehicleStatsField = 'vehicleType' | 'fuelType' | 'transmissionType';

const getMostBookedBy = async (field: VehicleStatsField = 'vehicleType') => {
  const response = await api.get(`/summary/mostBookedBy?field=${field}`);
  return response.data;
};

export default getMostBookedBy;

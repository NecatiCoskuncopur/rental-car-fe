import api from '../axiosInstance';

const getVehicles = async (pagination?: IVehiclePaginationQueryParams) => {
  const params = new URLSearchParams();

  if (pagination) {
    Object.entries(pagination).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
  }

  const response = await api.get(`/vehicle/getVehicles?${params.toString()}`);
  return response.data;
};

export default getVehicles;

import api from '../axiosInstance';

const updateVehicle = async ({ vehicleId, ...rest }: IUpdateVehiclePayload) => {
  const response = await api.patch(`/vehicle/updateVehicle/${vehicleId}`, rest);
  return response.data;
};

export default updateVehicle;

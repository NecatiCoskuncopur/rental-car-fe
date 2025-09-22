import api from '../axiosInstance';

const createVehicle = async (vehicleData: ICreateVehiclePayload) => {
  return api.post('/vehicle/createVehicle', vehicleData);
};

export default createVehicle;

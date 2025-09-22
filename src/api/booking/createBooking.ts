import api from '../axiosInstance';

const createBooking = async (bookingData: { vehicleId: string; startDate: string; endDate: string }) => {
  return api.post('/booking/createBooking', bookingData);
};

export default createBooking;

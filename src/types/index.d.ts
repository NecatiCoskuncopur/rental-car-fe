interface IUser {
  _id: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IUserData extends IPaginationMeta {
  users: IUser[];
  totalUsers: number;
}

interface IPaginationData {
  page?: string;
  limit?: string;
  order?: 'asc' | 'desc';
}

interface IPaginationMeta {
  perPage: number;
  totalPages: number;
  currentPage: number;
  pageStartIndex: number;
  hasPrev: boolean;
  hasNext: boolean;
  prev: number | null;
  next: number | null;
}

interface IPost {
  _id: string;
  slug: string;
  title: string;
  image: string;
  content: string;
  createdAt: Date;
  updatedAt: string;
}

interface IPostData extends IPaginationMeta {
  posts: IPost[];
  totalPosts: number;
}

interface IUserBooking {
  _id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  vehicle: IVehicle;
}

interface IUserBookingData extends IPaginationMeta {
  bookings: IUserBooking[];
  totalBookings: number;
}

interface IUpdateBookingPayload {
  bookingId: string;
  status: 'confirmed' | 'cancelled';
}

interface IUpdateUserPayload {
  userId: string;
  name?: string;
  surname?: string;
  dateOfBirth?: Date;
  email: string;
  password?: string;
  oldPassword?: string;
}

interface IIncome {
  _id: string;
  totalIncome: number;
}

interface ITopUsers {
  _id: string;
  bookingCount: number;
  userId: string;
  fullName: string;
}

interface IMostBookedVehicle {
  _id: string;
  bookingCount: number;
  vehicleId: string;
  brand: string;
  model: string;
  image: string;
}

interface INewUserStatsResponse {
  range: 'day' | 'week' | 'month';
  from: string;
  to: string;
  newUsers: number;
}

interface IMostBookedItem {
  _id: string;
  bookingCount: number;
}

interface IVehicleAvailability {
  totalVehicles: number;
  rentedVehiclesToday: number;
  availableVehiclesToday: number;
}

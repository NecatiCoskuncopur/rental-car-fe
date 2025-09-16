interface IUser {
  _id: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IPaginationQueryParams {
  page?: string;
  limit?: string;
  order?: 'asc' | 'desc';
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

interface IPostData extends IPaginationMeta {
  posts: IPost[];
  totalPosts: number;
}

interface IVehicleSearchFilter {
  vehicleType?: string;
  transmissionType?: string;
  fuelType?: string;
  startDate: string;
  endDate: string;
}

interface IVehicle {
  _id: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  vehicleType: string;
  doors: number;
  passengers: number;
  transmissionType: string;
  fuelType: string;
  plateNumber: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IVehicleData extends IPaginationMeta {
  vehicles: IVehicle[];
  totalVehicles: number;
}

interface IVehiclePaginationQueryParams extends IPaginationQueryParams {
  startDate?: string;
  endDate?: string;
  vehicleType?: 'sedan' | 'suv' | 'hatchback' | 'station vagon' | 'mpv';
  fuelType?: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  transmissionType?: 'automatic' | 'manual';
}

interface IUserBooking {
  _id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  vehicleId: IVehicle;
  createdAt: string;
  updatedAt: string;
}

interface IUserBookingData extends IPaginationMeta {
  bookings: IUserBooking[];
  totalBookings: number;
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

interface IUpdateBookingPayload {
  bookingId: string;
  status: 'confirmed' | 'cancelled';
}

interface IIncome {
  _id: string;
  totalIncome: number;
}

interface IVehicleAvailability {
  totalVehicles: number;
  rentedVehiclesToday: number;
  availableVehiclesToday: number;
}

interface IMostBookedVehicle {
  _id: string;
  bookingCount: number;
  vehicleId: string;
  brand: string;
  model: string;
  image: string;
}

interface ITopUsers {
  _id: string;
  bookingCount: number;
  userId: string;
  fullName: string;
}

interface IUser {
  _id: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IUserData extends IPaginationMeta {
  users: IUser[];
  totalUsers: number;
}

interface IBookingPaginationQueryParams extends IPaginationQueryParams {
  status?: 'pending' | 'confirmed' | 'cancelled';
}

interface IBooking {
  _id: string;
  endDate: string;
  startDate: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  updatedAt: string;
  createdAt: string;
  userId: IUser;
  vehicleId: IVehicle;
}

interface IBookingData extends IPaginationMeta {
  bookings: IBooking[];
  totalBookings: number;
}

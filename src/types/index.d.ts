interface IUser {
  _id: string;
  name: string;
  surname: string;
  dateofBirth: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
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

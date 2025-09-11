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

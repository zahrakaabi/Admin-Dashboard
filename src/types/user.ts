export type UserStatus = "Active" | "Pending" | "Banned";

export type USER = {
  id: string;
  photoURL: string;
  fullName: string;
  phoneNumber: string;
  email: string;

  city: string;
  adress?: string;
  zip: number;

  role: string;
  company: string;
  status: UserStatus
};

export type IUserTableFilters = {
  search: string;
  role: string[]
};

export type IUserTableFilterValue = string | string[];
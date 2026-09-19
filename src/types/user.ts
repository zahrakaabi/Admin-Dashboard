export type UserStatus = "Active" | "Pending" | "Banned";

export type USER = {
  id: string;
  images: string[];
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  company: string;
  status: UserStatus
};

export type IUserTableFilters = {
  search: string;
  role: string[]
};

export type IUserTableFilterValue = string | string[];
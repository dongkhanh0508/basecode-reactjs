export interface User {
  id: number;
  username: string;
  password: string;
  role: number;
  status: number;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
  businesses: Business[];
  investors: Investor[];
}

export interface Business {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  businessLicense: string;
  bank: string;
  banksAccount: string;
  bankAccountHolder: string;
  status: string;
  userId: number;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
  image: string;
}

export interface Investor {
  id: number;
  name: string;
  dob: Date;
  idCard: string;
  address: string;
  phone: string;
  email: string;
  bank: string;
  banksAccount: string;
  status: number;
  userId: number;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
export interface AuthRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  refreshToken: string;
}

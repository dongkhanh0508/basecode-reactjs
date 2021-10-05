export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: number;
  type: string;
  email: string;
  phone: string;
  address: string;
  role: number;
}
export interface AuthRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  status: number;
  username: string;
  token: string;
}

import { AuthRequest, AuthResponse } from 'models';
import axiosClient from './axiosClient';

const authApi = {
  authUsernamePass(data: AuthRequest): Promise<AuthResponse> {
    const url = '/authens/login';
    return axiosClient.post(url, data);
  },
};
export default authApi;

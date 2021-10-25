import { PaginationRequest, User, Response } from 'models';
import axiosClient from './axiosClient';

const accountApi = {
  getAll(params: PaginationRequest): Promise<Response<User>> {
    const url = '/accounts';
    return axiosClient.get(url, { params });
  },
  remove(id: number): Promise<User> {
    const url = `/accounts/${id}`;
    return axiosClient.delete(url);
  },
  getById(id: string): Promise<User> {
    const url = `/accounts/${id}`;
    return axiosClient.get(url);
  },
  update(id: string, data: User): Promise<User> {
    const url = `/accounts/${id}`;
    return axiosClient.put(url, data);
  },
  add(data: User): Promise<User> {
    const url = '/accounts';
    return axiosClient.post(url, data);
  },
};
export default accountApi;

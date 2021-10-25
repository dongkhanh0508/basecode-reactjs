import { PaginationRequest, Risk, Response } from 'models';
import axiosClient from './axiosClient';

const riskApi = {
  getAll(params: PaginationRequest): Promise<Response<Risk>> {
    const url = '/campaigns/risks';
    return axiosClient.get(url, { params });
  },
  remove(id: number): Promise<Risk> {
    const url = `/campaigns/risks/${id}`;
    return axiosClient.delete(url);
  },
  getById(id: string): Promise<Risk> {
    const url = `/campaigns/risks/${id}`;
    return axiosClient.get(url);
  },
  update(id: string, data: Risk): Promise<Risk> {
    const url = `/campaigns/risks/${id}`;
    return axiosClient.put(url, data);
  },
  add(data: Risk): Promise<Risk> {
    const url = '/campaigns/risks';
    return axiosClient.post(url, data);
  },
};
export default riskApi;

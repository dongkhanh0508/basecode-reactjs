import { PaginationRequest, Campaign, Response } from 'models';
import axiosClient from './axiosClient';

const campaignApi = {
  getAll(params: PaginationRequest): Promise<Response<Campaign>> {
    const url = '/campaigns';
    return axiosClient.get(url, { params });
  },
  remove(id: number): Promise<Campaign> {
    const url = `/campaigns/${id}`;
    return axiosClient.delete(url);
  },
  getById(id: string): Promise<Campaign> {
    const url = `/campaigns/${id}`;
    return axiosClient.get(url);
  },
  update(id: string, data: Campaign): Promise<Campaign> {
    const url = `/campaigns/${id}`;
    return axiosClient.put(url, data);
  },
  add(data: Campaign): Promise<Campaign> {
    const url = '/campaigns';
    return axiosClient.post(url, data);
  },
};
export default campaignApi;

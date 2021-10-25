import { PaginationRequest, CampaignPackage, Response } from 'models';
import axiosClient from './axiosClient';

const packageApi = {
  getAll(params: PaginationRequest): Promise<Response<CampaignPackage>> {
    const url = '/campaigns/packages';
    return axiosClient.get(url, { params });
  },
  remove(id: number): Promise<CampaignPackage> {
    const url = `/campaigns/packages/${id}`;
    return axiosClient.delete(url);
  },
  getById(id: string): Promise<CampaignPackage> {
    const url = `/campaigns/packages/${id}`;
    return axiosClient.get(url);
  },
  update(id: string, data: CampaignPackage): Promise<CampaignPackage> {
    const url = `/campaigns/packages/${id}`;
    return axiosClient.put(url, data);
  },
  add(data: CampaignPackage): Promise<CampaignPackage> {
    const url = '/campaigns/packages';
    return axiosClient.post(url, data);
  },
};
export default packageApi;

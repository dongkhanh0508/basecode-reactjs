import { CampaignRisk, Risk } from 'models';
import axiosClient from './axiosClient';

const riskApi = {
  getAll(campaignId: number): Promise<CampaignRisk[]> {
    const url = `/campaigns/${campaignId}/risks`;
    return axiosClient.get(url);
  },
  remove(campaignId: number, riskId: number): Promise<CampaignRisk> {
    const url = `/campaigns/${campaignId}/risks/${riskId}`;
    return axiosClient.delete(url);
  },
  getById(campaignId: number, riskId: number): Promise<CampaignRisk> {
    const url = `/campaigns/${campaignId}/risks/${riskId}`;
    return axiosClient.get(url);
  },
  update(id: string, data: Risk): Promise<Risk> {
    const url = `/campaigns/risks/${id}`;
    return axiosClient.put(url, data);
  },
  add(campaignId: number, data: Risk): Promise<Risk> {
    const url = `/campaigns/${campaignId}/risks`;
    return axiosClient.post(url, data);
  },
};
export default riskApi;

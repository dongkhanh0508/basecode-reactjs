import { CampaignLocation, Location } from 'models';
import axiosClient from './axiosClient';

const locationApi = {
  getAll(campaignId: number): Promise<CampaignLocation[]> {
    const url = `/campaigns/${campaignId}/locations`;
    return axiosClient.get(url);
  },
  remove(campaignId: number, locationId: number): Promise<CampaignLocation> {
    const url = `/campaigns/${campaignId}/locations/${locationId}`;
    return axiosClient.delete(url);
  },
  getById(campaignId: number, locationId: number): Promise<CampaignLocation> {
    const url = `/campaigns/${campaignId}/locations/${locationId}`;
    return axiosClient.get(url);
  },
  update(id: string, data: Location): Promise<Location> {
    const url = `/campaigns/locations/${id}`;
    return axiosClient.put(url, data);
  },
  add(campaignId: number, data: Location): Promise<Location> {
    const url = `/campaigns/${campaignId}/locations`;
    return axiosClient.post(url, data);
  },
};
export default locationApi;

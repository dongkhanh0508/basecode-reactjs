import { Stage, Response, StagePagingRequest } from 'models';
import axiosClient from './axiosClient';

const stageApi = {
  getAll(params: StagePagingRequest): Promise<Response<Stage>> {
    const url = '/campaigns/stages';
    return axiosClient.get(url, { params });
  },
  remove(id: number): Promise<Stage> {
    const url = `/campaigns/stages/${id}`;
    return axiosClient.delete(url);
  },
  getById(id: string): Promise<Stage> {
    const url = `/campaigns/stages/${id}`;
    return axiosClient.get(url);
  },
  update(id: string, data: Stage): Promise<Stage> {
    const url = `/campaigns/stages/${id}`;
    return axiosClient.put(url, data);
  },
  add(data: Stage): Promise<Stage> {
    const url = '/campaigns/stages';
    return axiosClient.post(url, data);
  },
};
export default stageApi;

import { PaginationRequest, News, Response } from 'models';
import axiosClient from './axiosClient';

const newsApi = {
  getAll(params: PaginationRequest): Promise<Response<News>> {
    const url = '/news';
    return axiosClient.get(url, { params });
  },
  remove(id: number): Promise<News> {
    const url = `/news/${id}`;
    return axiosClient.delete(url);
  },
  getById(id: string): Promise<News> {
    const url = `/news/${id}`;
    return axiosClient.get(url);
  },
  update(id: string, data: News): Promise<News> {
    const url = `/news/${id}`;
    return axiosClient.put(url, data);
  },
  add(data: News): Promise<News> {
    const url = '/news';
    return axiosClient.post(url, data);
  },
};
export default newsApi;

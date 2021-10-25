import axiosClient from './axiosClient';

const fileApi = {
  add(data: any): Promise<string> {
    const formData = new FormData();
    formData.append('file', data.ImageFile);
    const url = '/files';
    return axiosClient.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};
export default fileApi;

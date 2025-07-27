import { axiosInstance } from "./axiosInstance";

export const getData = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const postData = async (url: string, data: any) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const putData = async (url: string, data: any) => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};

export const patchData = async (url: string, data: any) => {
  const response = await axiosInstance.patch(url, data);
  return response.data;
};

export const deleteData = async (url: string) => {
  const response = await axiosInstance.delete(url);
  return response.data;
};

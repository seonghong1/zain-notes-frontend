import { axiosInstance } from "./axiosInstance";

export const getData = async <R>(url: string): Promise<R> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const postData = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const putData = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};

export const patchData = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await axiosInstance.patch(url, data);
  return response.data;
};

export const deleteData = async <R>(url: string): Promise<R> => {
  const response = await axiosInstance.delete(url);
  return response.data;
};

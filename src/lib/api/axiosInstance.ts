// lib/api/axiosInstance.ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 포함
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/auth/signin";

      if (window.location.pathname !== "/auth/signin") {
        // alert("로그인 후 이용해주세요.");
      }
    }
    return Promise.reject(error);
  },
);

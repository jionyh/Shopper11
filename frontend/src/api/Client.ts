import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ApiError } from "../types/ApiError";

const client: AxiosInstance = axios.create({
  baseURL: "http://backend:8080/ride",
});

client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data.error_description);
    }
    return Promise.reject("Erro desconhecido ou falha na rede");
  },
);

export { client };

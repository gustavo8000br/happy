import axios from "axios";
import { Canceler } from "axios";

const api = axios.create({
  // baseURL: `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`,
  baseURL: "http://localhost:3333",
});

export default api;

const CancelToken = axios.CancelToken;

export let cancelGetOrphanages: Canceler;
export const getOrphanages = async () => {
  const { data } = await api.get("orphanages", {
    cancelToken: new CancelToken(function executor(c) {
      cancelGetOrphanages = c;
    }),
  });

  return data;
};

export let cancelCreateOrphanages: Canceler;
export const createOrphanage = async () => {
  const { data } = await api.get("orphanages", {
    cancelToken: new CancelToken(function executor(c) {
      cancelCreateOrphanages = c;
    }),
  });

  return data;
};

import axios from "axios";
import { Canceler } from "axios";

const BACKEND_PORT = parseInt(process.env.BACKEND_PORT || "3333", 10);
const BACKEND_URL = process.env.BACKEND_URL || `localhost`;

const api = axios.create({
  baseURL: `http://${BACKEND_URL}:${BACKEND_PORT}`,
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

import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000";
const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string): Promise<IActivity[]> => axios.get(url).then(responseBody),
  post: (url: string, data: {}): Promise<IActivity> =>
    axios.post(url, data).then(responseBody),
  put: (url: string, data: {}): Promise<IActivity> =>
    axios.put(url, data).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: () => request.get("/activities"),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post("/activities", activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.delete(`/activities/${id}`),
};

export default {
  Activities,
};

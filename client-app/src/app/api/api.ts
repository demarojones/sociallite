import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000";
const responseBody = (response: AxiosResponse) => response.data;

//currying being used here
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const request = {
  get: (url: string): Promise<IActivity[]> =>
    axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, data: {}): Promise<IActivity> =>
    axios.post(url, data).then(sleep(1000)).then(responseBody),
  put: (url: string, data: {}): Promise<IActivity> =>
    axios.put(url, data).then(sleep(1000)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(1000)).then(responseBody),
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

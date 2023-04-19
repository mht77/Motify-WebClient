import {axiosClient} from "./axiosClient";
import {AxiosInstance} from "axios";
import {Song} from "./types";

const setToken = (axiosInstance: AxiosInstance) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return axiosInstance;
}
export const search = async (keyword: string) => {
    let client = setToken(axiosClient);
    let result: Song[] = [];
    await client.get(`/search/?keyword=${keyword}`).then((res) => result = res.data)
        .catch((err) => {
            console.log(err);
        });
    return result;
}
import {axiosClient} from "./axiosClient";
import {AxiosInstance} from "axios";
import {Notification, Song} from "./types";

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

export const getNotifications = async () => {
    let client = setToken(axiosClient);
    let result: Notification[] = [];
    await client.get(`/notifications`).then((res) => result = res.data)
        .catch((err) => {
            console.log(err);
        });
    return result;
}

export const getUserPlayerToken = async () => {
    let client = setToken(axiosClient);
    let result = {'token': '', 'deviceId': -1};
    await client.get(`/user_player/`).then((res) => result = res.data)
        .catch((err) => {
            console.log(err);
        });
    localStorage.setItem('deviceId', result.deviceId.toString());
    localStorage.setItem('playerToken', result.token);
    return result;
}
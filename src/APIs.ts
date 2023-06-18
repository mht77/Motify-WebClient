import {axiosClient} from "./axiosClient";
import {AxiosInstance} from "axios";
import {Notification, Song, Playlist, UserPlayer} from "./types";

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

export const getPlaylists = async () => {
    let client = setToken(axiosClient);
    let result: Playlist[] = [];
    await client.get(`/playlists/`).then((res) => result = res.data)
        .catch((err) => {
            console.log(err);
        });
    return result;
}

export const createPlaylist = async (name: string) => {
    let client = setToken(axiosClient);
    let result: Playlist = {
        id: '',
        name: '',
        songs: [],
        dateCreated: '',
    };
    await client.post(`/playlists/`, {name: name}).then((res) => result = res.data)
        .catch((err) => {
            console.log(err);
        });
    return result;
}

export const addSongToPlaylist = async (playlistId: string, songs: string[]) => {
    let client = setToken(axiosClient);
    let result: Playlist = {
        id: '',
        name: '',
        songs: [],
        dateCreated: '',
    };
    await client.put(`/playlists/${playlistId}/`, {'songs': songs}).then((res) => result = res.data)
        .catch((err) => {
            console.log(err);
        });
    return result;
}

export const getFileUrl = (userPlayer: UserPlayer) => {
    if (process.env.NODE_ENV === 'development') {
        if (userPlayer?.current_song === undefined) return '';
        return `http://${process.env.REACT_APP_PLAYER_URL}${userPlayer.current_song.file}`;
    } else {
        return userPlayer.current_song === undefined ? '' : userPlayer?.current_song.file;
    }
}
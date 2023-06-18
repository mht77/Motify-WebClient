export type Song = {
    id: string,
    name: string,
    artist: string,
    album: string,
    file: string,
    dateAdded: string,
}

export type Notification = {
    msg: string,
    createdAt: string,
}

export type UserPlayer = {
    id: string,
    user: string,
    current_song?: Song,
    state: State,
    device?: Device,
    second: number,
}

export enum State {
    PLAYING = "PLAYING",
    PAUSED = "PAUSED",
}

export type Device = {
    id: number,
    name: string,
}

export type Playlist = {
    id: string,
    name: string,
    songs: Song[],
    dateCreated: string,
}
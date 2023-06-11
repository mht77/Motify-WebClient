import React from 'react';
import {Playlist, Song} from "./types";
import ImageList from '@mui/material/ImageList';
import {ImageListItem, ImageListItemBar} from "@mui/material";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';


export interface playlistsProps {
    playlists: Playlist[];
    setPage: (page: string) => void;
    setSongs: (songs: Song[]) => void;
    setPlaylist: (playlist: Playlist) => void;
}
const Playlists = (props: playlistsProps) => {

    const showPlaylist = (playlist: Playlist) => {
        props.setPlaylist(playlist);
        props.setSongs(playlist.songs);
        props.setPage('Playlist');
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ImageList sx={{ width: 500, height: 450 }}>
                {props.playlists.map((item) => (
                    <ImageListItem key={item.id} onClick={()=>showPlaylist(item)} sx={{cursor: 'pointer'}}>
                        <QueueMusicIcon sx={{height: 100, width: 100}}/>
                        <ImageListItemBar
                            title={item.name}
                            subtitle={<span>{item.songs.length} songs</span>}
                            position="below"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};

export default Playlists;
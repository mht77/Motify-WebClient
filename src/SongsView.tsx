import React, {useState} from 'react';
import {Playlist, Song} from "./types";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {addSongToPlaylist} from "./APIs";

interface songsProps {
    songs: Song[];
    setSelectedSong: (song: Song) => void;
    id: string;
    playlists: Playlist[];
}
const SongsView = (props: songsProps) => {

    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent, song: Song) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null,
        );
        setSelectedSong(song)
    };

    const handleClose = async (playlist: Playlist) => {
        if (selectedSong === null)
            return;

        await addSongToPlaylist(playlist.id, [selectedSong.id]);
        setContextMenu(null);
        setSelectedSong(null);
    };

    if (props.songs.length === 0)
       return ( <div style={{textAlign: 'center'}}>Nothing found</div>);

    return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"></TableCell>
                            <TableCell align='left'>Name</TableCell>
                            <TableCell align="left">Artist</TableCell>
                            <TableCell align="left">Album</TableCell>
                            <TableCell align="left">Date Added</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.songs.map((song) => (
                            <TableRow onContextMenu={(e) => handleContextMenu(e, song)}
                                key={song.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <IconButton onClick={()=> props.setSelectedSong(song)}>
                                        <PlayArrowIcon sx={{height: 18, width: 18}}/>
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="song" align="left">{song.name}</TableCell>
                                <TableCell align="left">{song.artist}</TableCell>
                                <TableCell align="left">{song.album}</TableCell>
                                <TableCell align="left">{song.dateAdded}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <Menu
                        open={contextMenu !== null}
                        onClose={handleClose}
                        anchorReference="anchorPosition"
                        anchorPosition={
                            contextMenu !== null
                                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                : undefined
                        }
                    >
                        {props.playlists.map((playlist) => (
                            <MenuItem onClick={() => handleClose(playlist)}>{playlist.name}</MenuItem>
                        ))}
                    </Menu>
                </Table>
            </TableContainer>
    );
};

export default SongsView;
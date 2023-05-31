import React from 'react';
import {Song} from "./types";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";

interface searchProps {
    songs: Song[];
    setSelectedSong: (song: Song) => void;
}
const SearchView = (props: searchProps) => {

    if (props.songs.length === 0)
       return ( <div style={{textAlign: 'center'}}>Nothing found</div>);

    return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                            <TableRow
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
                </Table>
            </TableContainer>
    );
};

export default SearchView;
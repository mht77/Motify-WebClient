import React from 'react';
import {Song} from "./types";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface searchProps {
    songs: Song[];
}
const SearchView = (props: searchProps) => {

    if (props.songs.length === 0)
       return ( <div style={{textAlign: 'center'}}>Nothing found</div>);

    return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Id</TableCell>
                            <TableCell align='left'>Name</TableCell>
                            <TableCell align="left">Artist</TableCell>
                            <TableCell align="left">Album</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.songs.map((song) => (
                            <TableRow
                                key={song.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="song">
                                    {song.id}
                                </TableCell>
                                <TableCell align="left">{song.name}</TableCell>
                                <TableCell align="left">{song.artist}</TableCell>
                                <TableCell align="left">{song.album}</TableCell>
                                {/*<TableCell align="right">{song.protein}</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
};

export default SearchView;
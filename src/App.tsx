import React, {useEffect, useState} from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import {
    Box,
    createTheme,
    CssBaseline,
    Paper,
    Stack,
    ThemeProvider
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {Menu} from "./Menu";
import Auth from "./Auth";
import {axiosClient} from "./axiosClient";
import Player from "./Player";
import SongsView from "./SongsView";
import {Playlist, Song} from "./types";
import {getPlaylists, getUserPlayerToken} from "./APIs";
import Playlists from "./Playlists";


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const Item = styled(Paper)(() => ({
    backgroundColor: darkTheme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...darkTheme.typography.body2,
    padding: darkTheme.spacing(1),
    textAlign: 'center',
    color: darkTheme.palette.text.secondary,
}));


export interface pageProps {
    page: string;
    setPage: (page: string) => void;
}

function App() {
    const token = localStorage.getItem('token');

    const [page, setPage] = useState('Home');

    const [songs, setSongs] = useState<Song[]>([]);

    const [likedSongs, setLikedSongs] = useState<Song[]>([]);

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    useEffect(() => {
        const checkToken = ()  => {
            if (token === null)
                setLoggedIn(false);
            else
                axiosClient.post('token/verify/', {'token': token}).then(() => {
                    setLoggedIn(true);
                    getUserPlayerToken().catch((err) => console.log(err));
                }).catch(() => {
                    setLoggedIn(false);
                });
        }
        checkToken();
    },[token]);

    useEffect(() => {
        if (page === 'Home'){
            setSongs([]);
        }
        if (page === 'Playlists'){
            getPlaylists().then((res) => setPlaylists(res)).catch((err) => console.log(err));
        }
        setSelectedSong(null);
    }, [page]);


    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (loggedIn){
            getUserPlayerToken().catch((err) => console.log(err));
            getPlaylists().then((res) =>
            {
                setPlaylists(res);
                let likedPlaylist = res.filter((playlist) => playlist.name === 'Liked Songs');
                setLikedSongs(likedPlaylist[0].songs)
            }).catch((err) => console.log(err));
        }
    }, [loggedIn]);

    if (!loggedIn)
        return (
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Auth setLoggedIn={setLoggedIn}/>
            </ThemeProvider>
        );

    return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                  <Grid xs={12}>
                      <Menu page={page} setPage={setPage} setSongs={setSongs} songs={songs} playlistName={selectedPlaylist?.name}/>
                  </Grid>
                  <Grid xs={0} md={2}></Grid>
                  <Grid xs={12} md={10} sx={{marginTop: '1rem'}}>
                      {page === 'Home' &&
                          <Stack>
                              <Item>Welcome to Motify</Item>
                          </Stack>
                      }
                      {page === 'Search' &&
                          <SongsView id='search' songs={songs} setSelectedSong={setSelectedSong} playlists={playlists}/>
                      }
                      {page === 'Playlists' &&
                          <Playlists playlists={playlists} setPage={setPage} setSongs={setSongs} setPlaylist={setSelectedPlaylist}/>
                      }
                      {page === 'Liked Songs' &&
                          <SongsView id='likedsongs' songs={likedSongs} setSelectedSong={setSelectedSong} playlists={playlists}/>
                      }
                      {page === 'Playlist' &&
                          <SongsView id='playlist' songs={songs} setSelectedSong={setSelectedSong} playlists={playlists}/>
                      }
                  </Grid>
              </Grid>
              <div className='left footer'>
                  <Player selectedSong={selectedSong} setSelectedSong={setSelectedSong}/>
              </div>
          </Box>
      </ThemeProvider>
  );
}

export default App;

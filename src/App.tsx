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
import SearchView from "./SearchView";
import {Song} from "./types";
import {getUserPlayerToken} from "./APIs";


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
        setSelectedSong(null);
    }, [page]);


    const [loggedIn, setLoggedIn] =
        React.useState(false);

    useEffect(() => {
        if (loggedIn){
            getUserPlayerToken().catch((err) => console.log(err));
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
                      <Menu page={page} setPage={setPage} setSongs={setSongs} songs={songs}/>
                  </Grid>
                  <Grid xs={0} md={2}></Grid>
                  <Grid xs={12} md={10} sx={{marginTop: '1rem'}}>
                      {page === 'Home' &&
                          <Stack>
                              <Item>Welcome to Motify</Item>
                          </Stack>
                      }
                      {page === 'Search' &&
                          <SearchView songs={songs} setSelectedSong={setSelectedSong}/>
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

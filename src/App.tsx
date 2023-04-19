import React, {useEffect} from 'react';
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

    const [page, setPage] = React.useState('Home');

    const [songs, setSongs] = React.useState<Song[]>([]);


    useEffect(() => {
        const checkToken = ()  => {
            if (token === null)
                setLoggedIn(false);
            else
                axiosClient.post('token/verify/', {'token': token}).then(() => {
                    setLoggedIn(true);
                }).catch(() => {
                    setLoggedIn(false);
                });
        }
        checkToken();
    },[token]);

    useEffect(() => {
        if (page === 'Home')
            setSongs([]);
    }, [page]);


    const [loggedIn, setLoggedIn] =
        React.useState(false);

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
                          <SearchView songs={songs}/>
                      }
                  </Grid>
              </Grid>
              <div className='left footer'>
                  <Player/>
              </div>
          </Box>
      </ThemeProvider>
  );
}

export default App;

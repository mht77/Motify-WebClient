import React from 'react';
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
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Grid from '@mui/material/Unstable_Grid2';
import Menu from "./Menu";
import Auth from "./Auth";
import {axiosClient} from "./axiosClient";
import IconButton from "@mui/material/IconButton";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Item = styled(Paper)(() => ({
    backgroundColor: darkTheme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...darkTheme.typography.body2,
    padding: darkTheme.spacing(1),
    textAlign: 'center',
    color: darkTheme.palette.text.secondary,
}));

function App() {
    const token = localStorage.getItem('token');

    React.useEffect(() => {
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
                      <Menu/>
                  </Grid>
                  <Grid xs={0} md={2}></Grid>
                  <Grid xs={12} md={10}>
                      <Stack>
                          <Item>Welcome to Motify</Item>
                      </Stack>
                  </Grid>
              </Grid>
              <div className='left footer'>
                  <Item sx={{height: '5rem'}}>
                      <Box sx={{justifyContent: 'center',  display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                          <IconButton aria-label="previous">
                              {darkTheme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                          </IconButton>
                          <IconButton aria-label="play/pause">
                              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                          </IconButton>
                          <IconButton aria-label="next">
                              {darkTheme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                          </IconButton>
                      </Box>
                  </Item>
              </div>
          </Box>
      </ThemeProvider>
  );
}

export default App;

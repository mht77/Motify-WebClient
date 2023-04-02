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
import Grid from '@mui/material/Unstable_Grid2';
import Menu from "./Menu";
import Auth from "./Auth";
import {axiosClient} from "./axiosClient";


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
                          <Item>body</Item>
                      </Stack>
                  </Grid>
              </Grid>
              <div className='left footer'>
                  <Item>Footer</Item>
                  <Item>Footer</Item>
              </div>
          </Box>
      </ThemeProvider>
  );
}

export default App;

import React from 'react';
import Login from "./Login";
import Grid from "@mui/material/Unstable_Grid2";
import Register from "./Register";

export interface LoggedInProps {
    setLoggedIn: (loggedIn: boolean) => void;
}

const Auth = (props: LoggedInProps) => {

    return (
        <Grid container sx={{marginTop: '8%'}}>
            <Grid xs={0} md={3}/>
            <Grid sx={{marginTop: '7%', textAlign: 'center'}} xs={12} md={3}>
                <Login setLoggedIn={props.setLoggedIn}/>
            </Grid>
            <Grid sx={{textAlign: 'center', marginTop: '7%'}} xs={12} md={3}>
                <Register setLoggedIn={props.setLoggedIn}/>
            </Grid>
            <Grid xs={0} md={3}/>
        </Grid>
    );
};

export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default Auth;
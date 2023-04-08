import React from 'react';
import Login from "./Login";
import Grid from "@mui/material/Unstable_Grid2";
import Register from "./Register";
import bg from './BG.png';
import './App.css'

export interface AuthProps {
    setLoggedIn: (loggedIn: boolean) => void;
    sx?: any;
}

const Auth = (props: AuthProps) => {
    const style = {fieldset: { borderColor: "lightskyblue" }};

    return (
            <Grid container sx={{backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', backgroundPosition: 'center', height: window.screen.height*0.9}}>
                <Grid xs={0} md={6}/>
                <Grid className='auth' sx={{marginTop: '15%', textAlign: 'center'}} xs={12} md={3}>
                    <Login sx={style} setLoggedIn={props.setLoggedIn}/>
                </Grid>
                <Grid sx={{textAlign: 'center', marginTop: '15%'}} xs={12} md={3}>
                    <Register sx={style} setLoggedIn={props.setLoggedIn}/>
                </Grid>
            </Grid>
    );
};

export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default Auth;
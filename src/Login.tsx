import React from 'react';
import {Alert, Button, Snackbar, TextField} from "@mui/material";
import {validateEmail, LoggedInProps} from "./Auth";
import {axiosClient} from "./axiosClient";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

const Login = (props: LoggedInProps) => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [erEmail, setErEmail] = React.useState(false);

    const onEmailChange = (email: string) => {
        setErEmail(!validateEmail(email));
        setEmail(email);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setToken = (token: string) => {
        localStorage.setItem('token', token);
        props.setLoggedIn(true);
    }

    const login = async () => {
        await axiosClient.post('token/', {'username': email, password}).then(res => {
            if (res.status === 200) {
               setToken(res.data.access);
            }
            else
                setOpen(true);
        }).catch(err => {console.log(err); setOpen(true)});
    }

    const googleLogin = async (data: any) => {
        await axiosClient.post('google/', {'token': data.credential}).then(res => {
            setToken(res.data.access);
        }).catch(err => {console.log(err); setOpen(true)});
    };

    return (
        <div>
            <TextField error={erEmail} onChange={(e) => onEmailChange(e.target.value)} variant='outlined' label='Email' type='email'/> <br/><br/>
            <TextField onChange={(e)=>setPassword(e.target.value)} variant='outlined' label='Password' type='password'/> <br/><br/>
            <Button variant='contained' onClick={()=>login()}> Login </Button><br/><br/>
            <Button>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!.toString()}>
                    <GoogleLogin
                        shape={"circle"}
                        theme={"filled_black"}
                        size={"large"}
                        onSuccess={googleLogin}
                        onError={()=>setOpen(true)}
                    />
                </GoogleOAuthProvider>
            </Button>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
                autoHideDuration={5000}
            >
                <Alert severity='error'>
                    Login failed
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
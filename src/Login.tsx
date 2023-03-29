import React from 'react';
import {Alert, Button, Snackbar, TextField} from "@mui/material";
import {validateEmail, LoggedInProps} from "./Auth";
import {axiosClient} from "./axiosClient";

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


    const login = async () => {
        await axiosClient.post('token/', {'username': email, password}).then(res => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.access);
                props.setLoggedIn(true);
            }
            else
                setOpen(true);
        }).catch(err => {console.log(err); setOpen(true)});
    }

    return (
        <div>
            <TextField error={erEmail} onChange={(e) => onEmailChange(e.target.value)} variant='outlined' label='Email' type='email'/> <br/><br/>
            <TextField onChange={(e)=>setPassword(e.target.value)} variant='outlined' label='Password' type='password'/> <br/><br/>
            <Button variant='contained' onClick={()=>login()}> Login </Button>
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
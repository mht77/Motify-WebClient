import React from 'react';
import {Alert, Button, Snackbar, TextField} from "@mui/material";
import {AuthProps, validateEmail} from "./Auth";
import {axiosClient} from "./axiosClient";

const Register = (props: AuthProps) => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repPassword, setRepPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [errEmail, setErrEmail] = React.useState(false);
    const [errPass, setErrPass] = React.useState(false);

    const onEmailChange = (email: string) => {
        setErrEmail(!validateEmail(email));
        setEmail(email);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const checkPass = (pass: string) => {
        setRepPassword(pass);
        if (pass !== password){
            setError('Passwords do not match');
            setErrPass(true);
        }
        else
        {
            setError('');
            setErrPass(false);
        }
    }

    const onPassChange = (pass: string) => {
        setPassword(pass);
        if (repPassword !== pass)
        {
            setError('Passwords do not match');
            setErrPass(true);
        }
        else
        {
            setError('');
            setErrPass(false);
        }
    }


    const register = async () => {
        await axiosClient.post('user/', {email, password}).then(async () => {
            await axiosClient.post('token/', {'username': email, password}).then(res => {
                localStorage.setItem('token', res.data.access);
                props.setLoggedIn(true);
            })
        }).catch(err => {
            console.log(err);
            setError('Registration failed')
            setOpen(true);
        });
    }


    return (
        <div>
            <TextField id='register-email' sx={props.sx} error={errEmail} onChange={(e)=>onEmailChange(e.target.value)}
                       variant='outlined' label='Email' type='email'/> <br/><br/>
            <TextField id='register-pass' sx={props.sx} onChange={(e)=>onPassChange(e.target.value)}
                       variant='outlined' label='Password' type='password'/> <br/><br/>
            <TextField id='register-repeat' sx={props.sx} error={errPass} onChange={(e)=>checkPass(e.target.value)}
                       variant='outlined' label='Repeat' type='password'/> <br/><br/>
            <Button id='register-btn' disabled={errEmail || errPass || password===''} variant='contained' onClick={register}> Register </Button>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
                autoHideDuration={5000}
            >
                <Alert severity='error'>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Register;
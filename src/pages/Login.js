import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            enqueueSnackbar('Login successful!', { variant: 'success' });
            navigate('/');
        } catch (error) {
            enqueueSnackbar('Login failed: ' + error.message, { variant: 'error' });
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                Entrar
            </Button>
        </Box>
    );
};

export default Login;

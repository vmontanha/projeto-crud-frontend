import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            enqueueSnackbar('Registration successful!', { variant: 'success' });
            navigate('/');
        } catch (error) {
            enqueueSnackbar('Registration failed: ' + error.message, { variant: 'error' });
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Register
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
            <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
                Registrar
            </Button>
        </Box>
    );
};

export default Register;

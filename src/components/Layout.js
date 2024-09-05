import React from 'react';
import { Container } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Container sx={{ mt: 4 }}>
                {children}
            </Container>
        </div>
    );
};

export default Layout;

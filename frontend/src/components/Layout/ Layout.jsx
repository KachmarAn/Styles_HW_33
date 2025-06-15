import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../Header/Header';

import {Box, Container, CssBaseline} from '@mui/material';

const Layout = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <CssBaseline/>
            <Header/>
            <Container component="main" sx={{flexGrow: 1, py: 4}}>
                <Outlet/>
            </Container>
        </Box>
    );
};

export default Layout;
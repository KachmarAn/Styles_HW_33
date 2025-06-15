import React from 'react';
import {Link} from 'react-router-dom';

import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <PublicIcon sx={{mr: 1}}/>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Booking diploma version
                </Typography>
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/hotels">
                        Hotel List
                    </Button>
                    <Button color="inherit" component={Link} to="/about">
                        About
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
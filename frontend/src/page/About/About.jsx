import React from 'react';
import {Typography, Box, Link} from '@mui/material';

const AboutPage = () => {
    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Про проєкт "Booking App"
            </Typography>
            <Typography variant="body1">

            </Typography>
            <Typography variant="body1">
                Розробник: Качмар Андрій
            </Typography>
            <Typography variant="body1" >
                Посилання:
                <br/>
                <Link href="https://www.linkedin.com/in/your-linkedin-profile/" target="_blank" rel="noopener">
                    LinkedIn Профіль
                </Link>
                <br/>
                <Link href="https://github.com/your-github-profile/booking-app" target="_blank" rel="noopener">
                    GitHub Репозиторій
                </Link>
            </Typography>
        </Box>
    );
};

export default AboutPage;
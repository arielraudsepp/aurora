import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';

export const Info = () => {

    return (
        <Grid
            xs={12}
            lg={6}
            sx={{
                backgroundColor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}
        >
            <Grid
                xs={12}
                lg={6}
                sx={{
                    alignItems: 'center',
                    background: '#000b3b',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    '& img': {
                        maxWidth: '100%'
                    }
                }}
            >
                <Box>
                    <Typography
                        align="center"
                        color="inherit"
                        sx={{
                            fontSize: '24px',
                            lineHeight: '32px',
                            mb: 1
                        }}
                        variant="h1"
                    >
                        DBT Skills Tracker
                        <Box
                            component="a"
                            sx={{ color: '#00153F' }}
                            target="_blank"
                        >
                        </Box>
                    </Typography>
                    <Typography
                        align="center"
                        sx={{ mb: 3 }}
                        variant="subtitle1"
                    >
                        Toss that paper DBT diary card; track your DBT skill usage, emotions and more
                    </Typography>
                    <img
                        alt="aurora"
                        src="/assets/aurora.svg"
                    />
                    <a href="https://www.vecteezy.com/free-vector/northern">Northern Vectors by Vecteezy</a>
                </Box>
            </Grid>
        </Grid>
    );
};


/*
*     DBT (Dialectial Behavioural Theray) skill tracker replaces your paper DBT diary card. A diary card is a tool unique used in DBT.
*     It helps track when symptoms occur and which skills are used to cope with those symptoms. */

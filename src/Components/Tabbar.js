import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function Tabbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={6}>

        </Grid>
        <Grid item xs={10}>
          <Box
            sx={{
              width: 900,
              height: 500,
              backgroundColor: 'primary.green',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

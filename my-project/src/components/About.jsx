import { Box, Typography } from '@mui/material';

const About = () => (
  <Box sx={{ my: 6, textAlign: 'center' }}>
    <Typography variant="h4">About Us</Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      This is the About page.
    </Typography>
  </Box>
);

export default About;

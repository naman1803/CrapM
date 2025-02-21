import { Box, Typography } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Box sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        padding: '1rem',
        border: '1px solid white',
        borderRadius: '10px'
      }}>
        <Typography variant="h3" gutterBottom>
          404 Not Found
        </Typography>
        <Box>
          <img src={"../../../public/assets/404penguin.gif"} alt="not found penguin:)" width="200px" />
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;

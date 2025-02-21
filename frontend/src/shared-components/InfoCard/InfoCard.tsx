import {
  Box,
  Divider,
  Grid2,
  IconButton,
  SxProps,
  Typography,
} from '@mui/material';
import React from 'react';
import { Close } from '@mui/icons-material';

export interface InfoCardProps {
  /** The title of the card */
  title: string;
  /** A string of information to display. Two strings will be put on each line, if they fit */
  infoItems: string[];
  /** Optional handler to exit the card. If no handler is given, the close button will not render */
  handleClose?: () => void;
  /** Styling for the card box */
  containerStyles?: SxProps;
  children: React.ReactNode;
}

/**
 * A card which displays information in a grid format.
 */
const InfoCard: React.FC<InfoCardProps> = ({
  title,
  infoItems,
  handleClose,
  containerStyles,
  children,
}) => {
  return (
    <Box
      sx={{
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        border: '1px solid white',
        borderRadius: '8px',
        ...containerStyles,
      }}
      padding={'0.5rem'}
      data-testid="infocard-body"
    >
      <Box
        sx={{
          paddingX: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">{title}</Typography>
        {handleClose && (
          <IconButton onClick={handleClose} data-testid="infocard-exit">
            <Close />
          </IconButton>
        )}
      </Box>
      <Divider />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          marginTop: '0.5rem',
          paddingX: '0.5rem',
        }}
      >
        <Grid2 container spacing={2}>
          {infoItems.map((item) => (
            <Grid2 size={{ xs: 6 }} key={item}>
              <Typography variant="body1">{item}</Typography>
            </Grid2>
          ))}
          <Grid2 size={12}>
            {children}
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default InfoCard;

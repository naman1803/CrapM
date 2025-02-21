import { Box, Grid2, Paper, Typography } from '@mui/material';
import { TooltipProps } from 'recharts';
import React from 'react';

export interface ChartToolTipProps extends TooltipProps<number, string> {
  labels: Record<string, string>;
}

/**
 * custom tooltip for recharts, insert into content prop field in recharts tooltip
 * labels = Record of field -> label on final tooltip
 */
const ChartToolTip: React.FC<ChartToolTipProps> = ({ payload, labels }) => {

  if (!payload || !payload.length) return null;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#3a3a3a',
        borderRadius: 1,
      }}
      component={Paper}
      padding={'0.5rem'}
    >
      <Grid2>
        {Object.entries(payload[0].payload)
          // filter for only keys explicitly stated in `labels`
          .filter(([key]) => key in labels)
          .map(([key, value]) => (
            <Typography variant='h6' key={key}>
              {`${labels[key] || key}: ${value}`}
            </Typography>
          ))}
      </Grid2>
    </Box>
  );
};

export default ChartToolTip;

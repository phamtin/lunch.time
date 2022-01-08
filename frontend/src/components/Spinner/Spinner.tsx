import { memo } from 'react';

import { Box, CircularProgress } from '@mui/material';

interface Props {
  padding?: number;
}

const Spinner = ({ padding = 8 }: Props) => {
  return (
    <Box sx={{ boxShadow: 0, p: padding, textAlign: 'center' }}>
      <CircularProgress />
    </Box>
  );
};

export default memo(Spinner);

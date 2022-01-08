import React from 'react';

import { CheckCircle, ErrorRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

type Props = {
  type: 'success' | 'error';
  msg: string;
};

function Toastify({ type, msg }: Props) {
  let style: Record<string, string> = {};
  let icon: React.ReactNode;

  switch (type) {
    case 'success':
      style = { color: '#616161' };
      icon = (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
            alignItems: 'center',
            marginRight: '12px',
            width: '46px',
            height: '46px',
            backgroundColor: '#e0ffe1',
            borderRadius: '15px',
          }}
        >
          <CheckCircle sx={{ color: '#33db21', fontSize: '26px' }} />
        </Box>
      );
      break;
    case 'error':
      style = { color: '#da1f2f' };
      icon = (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
            alignItems: 'center',
            marginRight: '12px',
            width: '46px',
            height: '46px',
            backgroundColor: '#ffe8ea',
            borderRadius: '15px',
          }}
        >
          <ErrorRounded sx={{ fontSize: '26px', color: 'red' }} />
        </Box>
      );
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: '600',
        ...style,
      }}
    >
      {icon}
      {msg}
    </Box>
  );
}

export function toastify(key: 'success' | 'error', msg: string) {
  toast[key](<Toastify type={key} msg={msg} />);
}

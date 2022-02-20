import { Box, Typography, Avatar } from '@mui/material';

import { useStyles } from './profile-box.style';

interface ProfileBoxProps {
  src?: string;
  username: string;
  maxWidth?: string;
  title?: string;
}

const ProfileBox = ({
  src,
  username,
  title,
  maxWidth = '400px',
}: ProfileBoxProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <Avatar src={src} className={classes.avatar} />
      <Box sx={{ maxWidth }}>
        <Typography className={classes.username} variant="body2">
          <b>{username}</b>
        </Typography>

        {title && (
          <Typography noWrap className={classes.title}>
            {title}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default ProfileBox;

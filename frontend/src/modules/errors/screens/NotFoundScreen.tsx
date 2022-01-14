import { Box, Button } from '@mui/material';

import { useStyle } from './not-found-screen-style';

function NotFoundScreen() {
  const classes = useStyle();
  return (
    <Box className={classes.wrapper}>
      <h1 className={classes.title}>
        <b>Sorry, page not found!</b>
      </h1>
      <p className={classes.caption}>
        Sorry, we couldn’t find the page you’re looking for. Perhaps <br /> you’ve
        mistyped the URL? Be sure to check your spelling.
      </p>
      <img className={classes.img} src="/404.png" alt="" />
      <br />
      <br />
      <Button sx={{ py: '12px' }} href="/" variant="contained" size="large">
        Go to Home
      </Button>
    </Box>
  );
}

export default NotFoundScreen;

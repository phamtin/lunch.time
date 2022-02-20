import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Toolbar, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';

import { useStyles } from './enhance-table-toolbar.style';

export interface EnhancedTableToolbarProps {
  numSelected: number;
  searchUsers: (query: string) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, searchUsers } = props;
  const classes = useStyles();

  const { handleSubmit, register } = useForm<{ query: string }>({
    mode: 'onSubmit',
  });

  const onSubmitSearch = (data: { query: string }) => searchUsers(data.query);

  return (
    <Toolbar
      sx={{
        py: 2,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: color =>
            alpha(color.palette.primary.main, color.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.selectedNumber}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <form onSubmit={handleSubmit(onSubmitSearch)} className={classes.formSearch}>
          <Box className={classes.inputContainer}>
            <SearchIcon />
            <input
              {...register('query', { minLength: 2 })}
              type="text"
              placeholder="Search by name, phone or email..."
              className="input"
            />
          </Box>
        </form>
      )}

      {numSelected > 0 && (
        <IconButton>
          <DeleteIcon color="error" />
        </IconButton>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;

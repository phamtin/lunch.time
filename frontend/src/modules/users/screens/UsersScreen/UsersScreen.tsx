import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, IconButton, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import theme from '@app/styles/theme';

import CreateUpdateUserDialog from '../../components/CreateUpdateUserDialog/CreateUpdateUserDialog';
import EnhancedTableHead from '../../components/EnhanceTableHead/EnhanceTableHead';
import EnhancedTableToolbar from '../../components/EnhanceTableToolbar/EnhanceTableToolbar';
import { tabs } from '../../helpers/users.helper';
import { useCreateAdmin, useUpdateUser } from '../../hooks/users.hook';
import {
  CreateAdminInput,
  UpdateUserInput,
  UsernameProps,
} from '../../types/users.type';

const createData = (
  username: string,
  email: number,
  role: number,
  status: number,
  actions?: string
): UsernameProps => {
  return {
    username,
    email,
    role,
    status,
    actions,
  };
};

const rows = [
  createData('Cupcake', 305, 3.7, 67),
  createData('Donut', 452, 25.0, 51),
  createData('Eclair', 262, 16.0, 24),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Gingerbread', 356, 16.0, 49),
  createData('Honeycomb', 408, 3.2, 87),
  createData('Ice cream sandwich', 237, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94),
  createData('KitKat', 518, 26.0, 65),
  createData('Lollipop', 392, 0.2, 98),
  createData('Marshmallow', 318, 0, 81),
  createData('Nougat', 360, 19.0, 9),
  createData('Oreo', 437, 18.0, 63),
];

const UsersScreen = () => {
  const [isOpenUserDialog, setIsOpenUserDialog] = useState<boolean>(false);

  const { mutate: mutateAdmin, isLoading: isLoadingAdmin } = useCreateAdmin();
  const { mutate: mutateUser } = useUpdateUser();

  const handleOpenDialog = () => setIsOpenUserDialog(prev => !prev);

  const onCloseCreateUserDialog = () => setIsOpenUserDialog(false);

  const onSubmitUser = (
    mode: 'create' | 'update',
    data: CreateAdminInput & UpdateUserInput,
    userId?: string
  ) => {
    if (mode === 'create') mutateAdmin({ data });

    if (mode === 'update' && userId) mutateUser({ data, userId });

    setIsOpenUserDialog(false);
  };

  const exampleUser = {
    _id: '609269995b2e888426d019ef',
    email: 'tinpham@gmail.com',
    idToken: 'idtoken',
    role: 'user',
    username: 'tinphamtp',
    familyName: 'Pham',
    givenName: 'Tin',
    social: 'google',
    phone: '0763520041',
    avatarUrl: 'https://unsplash.com/wow',
    addressLine: 'Danang',
  };

  const [selected, setSelected] = useState<readonly string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = React.useState(0);

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = rows.map(n => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (e: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (e: unknown, page: number) => {
    setCurrentPage(page);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Box sx={{ display: 'flex', mb: '30px' }}>
        <Tabs value={value} onChange={handleChange} sx={{ flex: 1 }}>
          {tabs.map(tab => (
            <Tab label={tab.name} key={tab.id} />
          ))}
        </Tabs>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!!isLoadingAdmin}
          onClick={handleOpenDialog}
        >
          Create Admin
        </Button>
      </Box>

      {isOpenUserDialog && (
        <CreateUpdateUserDialog
          user={exampleUser}
          onClose={onCloseCreateUserDialog}
          onSubmit={onSubmitUser}
        />
      )}
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice(
                  currentPage * rowsPerPage,
                  currentPage * rowsPerPage + rowsPerPage
                )
                .map((row: UsernameProps, index: number) => {
                  const isItemSelected = isSelected(row.username);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.username)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.username}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.username}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          '.MuiButtonBase-root': { p: 0 },
                          '.MuiSvgIcon-root': { color: theme.palette.primary.dark },
                        }}
                      >
                        <IconButton sx={{ mr: '8px' }}>
                          <OpenInNewIcon />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow sx={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
        />
      </Paper>
    </>
  );
};

export default UsersScreen;

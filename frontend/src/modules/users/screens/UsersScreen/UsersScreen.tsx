import { useState, MouseEvent, SyntheticEvent, ChangeEvent } from 'react';

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

import Spinner from '@app/components/Spinner/Spinner';
import theme from '@app/styles/theme';

import CreateUpdateUserDialog from '../../components/CreateUpdateUserDialog/CreateUpdateUserDialog';
import EnhancedTableHead from '../../components/EnhanceTableHead/EnhanceTableHead';
import EnhancedTableToolbar from '../../components/EnhanceTableToolbar/EnhanceTableToolbar';
import { ROW_PER_PAGE } from '../../constants/users.constant';
import { tabs } from '../../helpers/users.helper';
import { useCreateAdmin, useGetUsers, useUpdateUser } from '../../hooks/users.hook';
import { CreateAdminInput, UpdateUserInput, User } from '../../types/users.type';

const UsersScreen = () => {
  const [isOpenUserDialog, setIsOpenUserDialog] = useState<boolean>(false);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const { mutate: mutateAdmin, isLoading: isLoadingAdmin } = useCreateAdmin();
  const { mutate: mutateUser } = useUpdateUser();
  const { data: dataUsers, isLoading: isLoadingGetUsers } = useGetUsers({
    q: search || undefined,
    usePage: true,
    page: currentPage + 1 ? currentPage + 1 : 1,
    limit: ROW_PER_PAGE,
  });
  const users = dataUsers?.data.data;
  const info = dataUsers?.data.info;

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

  const handleSelectAllClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = users?.map((n: any) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (e: MouseEvent<unknown>, name: string) => {
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

  const handleChangePage = (e: unknown, selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // if (!dataUsers) return null;

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
          user={selectedUser}
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
              rowCount={users?.length}
            />
            {isLoadingGetUsers ? (
              <Spinner />
            ) : (
              <TableBody>
                {users ? (
                  users.map((row: User, idx: number) => {
                    const isItemSelected = isSelected(row.username);
                    const labelId = `enhanced-table-checkbox-${idx}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={event => handleClick(event, row.username)}
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
                            '.MuiSvgIcon-root': {
                              color: theme.palette.primary.dark,
                            },
                          }}
                        >
                          <IconButton
                            sx={{ mr: '8px' }}
                            onClick={() => {
                              setSelectedUser(row);
                              setIsOpenUserDialog(true);
                            }}
                          >
                            <OpenInNewIcon />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <Spinner />
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={info?.total}
          rowsPerPage={ROW_PER_PAGE}
          rowsPerPageOptions={[ROW_PER_PAGE]}
          page={currentPage}
          onPageChange={handleChangePage}
        />
      </Paper>
    </>
  );
};

export default UsersScreen;

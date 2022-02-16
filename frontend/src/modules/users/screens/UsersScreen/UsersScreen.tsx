import { useState, MouseEvent, SyntheticEvent, ChangeEvent, useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Chip, IconButton, Tab, Tabs } from '@mui/material';
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
import { STATUS } from '@app/utils/constants/constants';

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

  const handleCreateAdmin = () => {
    setSelectedUser(undefined);
    setIsOpenUserDialog(prev => !prev);
  };

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
      const newSelecteds = users?.map((n: User) => n.username);
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

  const onSearchUsers = (query: string) => setSearch(query);

  return (
    <>
      <Box sx={{ display: 'flex', mb: '30px' }}>
        <Tabs value={value} onChange={handleChange} sx={{ flex: 1 }}>
          {tabs.map(tab => (
            <Tab
              label={tab.name}
              key={tab.id}
              sx={{ textTransform: 'capitalize', fontWeight: 'bolder' }}
            />
          ))}
        </Tabs>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!!isLoadingAdmin}
          onClick={handleCreateAdmin}
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
      <Paper>
        <EnhancedTableToolbar
          numSelected={selected.length}
          searchUsers={onSearchUsers}
        />
        <TableContainer>
          {isLoadingGetUsers ? (
            <Spinner />
          ) : (
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={users?.length}
              />
              <TableBody>
                {users &&
                  users.map((row: User, idx: number) => {
                    const isItemSelected = isSelected(row.username);
                    const labelId = `enhanced-table-checkbox-${idx}`;
                    return (
                      <TableRow
                        key={row.id}
                        tabIndex={-1}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        hover
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            onClick={event => handleClick(event, row.username)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <b>{row.username}</b>
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          <b>{row.role}</b>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            variant="outlined"
                            size="small"
                            color={
                              row.status === STATUS.ACTIVE ? 'success' : 'error'
                            }
                          />
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            '.MuiButtonBase-root': { p: 0 },
                            '.MuiSvgIcon-root': {
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          <IconButton
                            sx={{ mr: '14px' }}
                            onClick={() => {
                              setSelectedUser(row);
                              setIsOpenUserDialog(true);
                            }}
                          >
                            <OpenInNewIcon sx={{ fontSize: 19 }} />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon
                              sx={{
                                fontSize: 21,
                                '&.MuiSvgIcon-root': { color: '#e04346!important' },
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {info && (
          <TablePagination
            sx={{ mr: 0.75 }}
            component="div"
            count={info.total}
            rowsPerPage={ROW_PER_PAGE}
            rowsPerPageOptions={[ROW_PER_PAGE]}
            page={currentPage}
            onPageChange={handleChangePage}
          />
        )}
      </Paper>
    </>
  );
};

export default UsersScreen;

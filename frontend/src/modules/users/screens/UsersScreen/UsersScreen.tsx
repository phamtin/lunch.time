import { useState, MouseEvent, SyntheticEvent, ChangeEvent } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@mui/material';

import Spinner from '@app/components/Spinner/Spinner';
import { STATUS } from '@app/utils/constants/constants';

import CreateUpdateUserDialog from '../../components/CreateUpdateUserDialog/CreateUpdateUserDialog';
import EnhancedTableHead from '../../components/EnhanceTableHead/EnhanceTableHead';
import EnhancedTableToolbar from '../../components/EnhanceTableToolbar/EnhanceTableToolbar';
import ProfileBox from '../../components/ProfileBox/ProfileBox';
import { ROW_PER_PAGE } from '../../constants/users.constant';
import { tabs, UserTypeMapper } from '../../helpers/users.helper';
import { useCreateAdmin, useGetUsers, useUpdateUser } from '../../hooks/users.hook';
import { CreateAdminInput, UpdateUserInput, User } from '../../types/users.type';
import { useStyles } from './users-screen.style';

const UsersScreen = () => {
  const classes = useStyles();
  const [isOpenUserDialog, setIsOpenUserDialog] = useState<boolean>(false);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const { mutate: mutateAdmin, isLoading: isLoadingAdmin } = useCreateAdmin();
  const { mutate: mutateUser } = useUpdateUser();
  const { data: dataUsers, isLoading: isLoadingGetUsers } = useGetUsers({
    q: search || undefined,
    usePage: true,
    page: currentPage + 1 ? currentPage + 1 : 1,
    limit: ROW_PER_PAGE,
    role: UserTypeMapper[value] as string,
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
      const newSelecteds = users?.map((n: User) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setCurrentPage(0);
    setValue(newValue);
  };

  const handleClick = (e: MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const onSearchUsers = (query: string) => {
    setCurrentPage(0);
    setSearch(query);
  };

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
          onClose={onCloseCreateUserDialog}
          onSubmit={onSubmitUser}
        />
      )}
      <div className={classes.tableWrapper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          searchUsers={onSearchUsers}
        />
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
              {users?.map((row: User, idx: number) => {
                const isItemSelected = isSelected(row.id);
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
                        onClick={event => handleClick(event, row.id)}
                      />
                    </TableCell>
                    <TableCell
                      width="24%"
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <ProfileBox
                        src={row.avatarUrl}
                        maxWidth="350px"
                        username={row.username}
                        title={row.addressLine}
                      />
                    </TableCell>
                    <TableCell width="20%">{row.email}</TableCell>
                    <TableCell>
                      <b>{row.role}</b>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        variant="outlined"
                        size="small"
                        color={row.status === STATUS.ACTIVE ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell align="right" className={classes.optionCell}>
                      <IconButton
                      // onClick={}
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
      </div>
    </>
  );
};

export default UsersScreen;

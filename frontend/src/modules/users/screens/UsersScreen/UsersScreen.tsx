import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

import CreateUpdateUserDialog from '../../components/CreateUpdateUserDialog/CreateUpdateUserDialog';
import { useCreateAdmin, useUpdateUser } from '../../hooks/users.hook';
import { CreateAdminInput, UpdateUserInput } from '../../types/users.type';

export default () => {
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

  // const exampleUser = {
  //   _id: '609269995b2e888426d019ef',
  //   email: 'tinpham@gmail.com',
  //   role: 'user',
  //   username: 'tinphamtp',
  //   familyName: 'Pham',
  //   givenName: 'Tin',
  //   phone: '0763520041',
  //   avatarUrl: 'https://unsplash.com/wow',
  //   addressLine: 'Danang',
  // };

  return (
    <div>
      <h3>
        <b>USERS</b>
      </h3>
      <h5>Welcome Users </h5>

      <Button
        sx={{ '.MuiButton-startIcon': { m: 0.4 } }}
        variant="contained"
        startIcon={<AddIcon />}
        disabled={!!isLoadingAdmin}
        onClick={handleOpenDialog}
      >
        Create Admin
      </Button>

      {isOpenUserDialog && (
        <CreateUpdateUserDialog
          mode="create"
          onClose={onCloseCreateUserDialog}
          onSubmit={onSubmitUser}
        />
      )}
    </div>
  );
};

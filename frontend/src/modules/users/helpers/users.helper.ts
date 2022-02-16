import { HeadCell, User } from '../types/users.type';

export const renderFunctionalityText = (user: User | undefined) => {
  if (!user) {
    //  Create new Admin
    return {
      title: 'Create new lunchtime Admin',
      subtitle:
        'Fill in the fields below to create and add a new Admin for Lunchtime',
      buttonText: 'Create new Admin',
    };
  }
  //  Update existing User
  return {
    title: 'Update lunchtime User',
    subtitle: "Fill in the fields below to update user's information",
    buttonText: 'Update user',
  };
};

export const headCells: readonly HeadCell[] = [
  {
    id: 'username',
    numeric: false,
    disablePadding: true,
    label: 'USERNAME',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'EMAIL',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'ROLE',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'STATUS',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'ACTIONS',
  },
];

export const tabs = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Users',
  },
  {
    id: 3,
    name: 'Adminstrators',
  },
  {
    id: 4,
    name: 'Subcribers',
  },
];

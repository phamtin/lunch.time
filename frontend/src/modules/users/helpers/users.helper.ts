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
    numeric: true,
    disablePadding: false,
    label: 'EMAIL',
  },
  {
    id: 'role',
    numeric: true,
    disablePadding: false,
    label: 'ROLE',
  },
  {
    id: 'status',
    numeric: true,
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
    name: 'All Users',
  },
  {
    id: 2,
    name: 'Customers',
    url: '/',
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

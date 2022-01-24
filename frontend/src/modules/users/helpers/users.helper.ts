export const renderFunctionalityText = (mode: 'create' | 'update') => {
  if (mode === 'create') {
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

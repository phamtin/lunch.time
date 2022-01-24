/* eslint-disable @typescript-eslint/no-explicit-any */

export const validateFields = (
  name: string,
  isRequired: boolean,
  min = 2,
  max = 128
) => {
  const criteria: Record<string, any> = {
    required: false,
    maxLength: max,
    minLength: min,
  };
  if (isRequired) {
    criteria.required = {
      value: true,
      message: `${name} is required`,
    };
  }
  if (max) {
    criteria.maxLength = {
      value: max,
      message: `${name} is too long`,
    };
  }
  if (min) {
    criteria.minLength = {
      value: min,
      message: `${name} must be at least ${min} characters`,
    };
  }

  return criteria;
};

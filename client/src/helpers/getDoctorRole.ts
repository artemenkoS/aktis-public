import { Role } from '../api/role/types';

export const getDoctorRole = (roles: Role[] | undefined): Role | undefined => {
  return roles?.find((role) => role.role === 'doctor');
};

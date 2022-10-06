import { extractToken } from '../service/extractToken';

export const isAuthenticated = () => {
  const token = extractToken();

  if (!token) {
   // to.path !== '/login';
    return { path: '/login' };
  }
  return true;
};

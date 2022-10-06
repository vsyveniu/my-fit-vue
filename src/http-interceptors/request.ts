//import { useUserStore } from '../stores/user';
import { extractToken } from '../service/extractToken';

export const mutateReqConfig = async (config: any, router: any) => {
  try {
    //const userStore = useUserStore();

    const unprotectedRoutes = import.meta.env.VITE_APP_UNPROTECTED_ROUTES.split(',');

    if (unprotectedRoutes.includes(router?.currentRoute?.value?.path)) return config;

    const token = extractToken();

    if (!token) {
      return router.push('/login');
    }

    config.headers.authorization = token;
    config.headers.app = import.meta.env.VITE_APP_TYPE;
  } catch (e) {
    throw new Error(e.message);
  }
};

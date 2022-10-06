import VueCookies from 'vue-cookies';
import { useUserStore } from '../stores/user';

export const extractToken = (): string | null => {
  const token = VueCookies.get('authorization');
  return token;
};

//export const isExpired = ()

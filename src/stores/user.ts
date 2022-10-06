import { defineStore } from 'pinia';
import VueCookies from 'vue-cookies';

type State = {
  id: number | null;
  email: string;
  isAuthenticated: string | null | undefined;
};

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      id: null,
      email: 'asshole',
      isAuthenticated: VueCookies.get('authorization'),
    };
  },
  getters: {
    getUser: (state) => state,
    checkAuth: (state) => state.isAuthenticated,
  },
  actions: {
    logout() {
      this.isAuthenticated = null;
    },
  },
});

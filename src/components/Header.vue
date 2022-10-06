<script lang="ts">
import { useUserStore } from '../stores/user';
import VueCookies from 'vue-cookies';

export default {
  data() {
    return {};
  },
  computed: {
    isAuthenticated() {
      return VueCookies.get('authorization');
    },
  },
  setup() {
    const userStore = useUserStore();

    return { userStore };
  },
  methods: {
    async logout() {
      try {
        await this.axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/logout`);
        this.userStore.logout();
        this.$router.push({ path: '/login' });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item" href="https://bulma.io">
        <img src="../assets/logo.png" width="112" height="128" />
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div v-if="userStore.checkAuth" class="navbar-start">
        <router-link to="/chain" class="navbar-item"> Chain </router-link>

        <a class="navbar-item"> Browse exercices </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="!userStore.checkAuth" class="buttons">
            <router-link to="/login" class="button is-primary">
              <strong>Log in</strong>
            </router-link>
            <router-link to="/register" class="button is-light">
              <strong>Sign up</strong>
            </router-link>
          </div>
          <div v-if="userStore.checkAuth" class="buttons">
            <button class="button is-danger" @click="logout()">
              <strong>Logout</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.fuck {
  color: red;
}
</style>

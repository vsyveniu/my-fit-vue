<script lang="ts">
import { useUserStore } from '../stores/user';
export default {
  data() {
    return {
      email: '',
      password: '',
      isError: false,
      errorText: '',
    };
  },
  setup() {
    const userStore = useUserStore()

    return { userStore }
  },
  methods: {
    async login() {

      try {
        const user = await this.axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/login`, {
          email: this.email,
          password: this.password,
        });

        await this.userStore.$patch({
          id: user.data.id,
          email: user.data.email,
          isAuthenticated: true
        })
        
         
        this.$router.push({path: '/'});


      } catch (e) {
        this.errorText = ''
        this.isError = true;
        this.errorText = e?.response?.data?.message;
      }
    },
    hideError(){
      this.isError = false
    },
  },
};
</script>

<template>
  <section class="container is-max-desktop px-4 mt-6 mb-6">
    <form action="" @submit.prevent>
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="email" v-model="email" />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="password" v-model="password" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div v-if="isError" class="notification is-danger">
        <button class="delete" @click="hideError()"></button>
          {{ errorText }}
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button :disabled="!password || !email" class="button is-link" @click="login()">Submit</button>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>

</style>

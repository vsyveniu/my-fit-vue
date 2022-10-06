<script lang="ts">
import { useChainStore } from '../stores/chains';
import VueCookies from 'vue-cookies';

export default {
  props: {
    workouts: {
      type: Array<object>,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  setup() {
    const chainStore = useChainStore();

    return { chainStore };
  },
  methods: {
    async logout() {
      try {
        await this.axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/day/${1}`);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<template>
  <div class="box day is-flex is-flex-direction-column is-align-items-center" :class="`is-${this.type}`">
    <div class="title">{{ this.type }}</div>
    <img v-bind:src="`src/assets/${this.type}.png`" />
    <!-- here is a crutch with src bind-->
  </div>
</template>

<style scoped>
.day {
  height: 200px;
  width: 200px;
  cursor: pointer;
  column-gap: 20px;
}
img{
    width: 70px;
    height: 70px;
}
.title {
  font-size: 22px;
}
.is-Strenght {
 
}
.is-Endurance {
  border: 1px solid blue;
}
.is-Cycling {
 
}
.is-Free {
  border: 1px solid lightslategray;
}
.is-Special {
  border: 1px solid orange;
}
.is-Aero {
  border: 1px solid yellow;
}
@media all and (max-width: 960px) {
  .day {
    height: 150px;
    width: 150px;
  }
  img{
    width: 50px;
    height: 50px;
  }
}
</style>

<script lang="ts">
import { useChainStore } from '../stores/chains';
import Day from '../components/Day.vue';

export default {
  components: {
    Day,
  },
  data() {
    return {};
  },
  setup() {
    const chainStore = useChainStore();

    return { chainStore };
  },
  computed: {},

  methods: {
    async getChains() {
      try {
        const chains = await this.axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/chain`);
        const patcher = await this.chainStore.$patch({ data: chains.data });
      } catch (e) {
      }
    },
    async makeActive() {
      console.log('make active');
    },
  },
  mounted: async function () {
    await this.getChains();
  },
};
</script>

<template>
  <div v-if="!chainStore.chains.length">EMPTY</div>
  <div class="container chainContainer is-flex is-flex-direction-column is-justify-content-space-between">
    <section>
      <div class="is-flex is-flex-direction-column mt-3" v-for="chain in chainStore.chains">
        <div class="is-flex">
          <div v-if="chain.isActive" class="active is-flex is-align-items-center">
            <span class="tag is-primary is-light">active</span>
          </div>
          <p class="is-flex is-align-content-center chainName">{{ chain.name }}</p>

          <button v-if="!chain.isActive" class="button" @click="makeActive">make active</button>
        </div>
        <div class="is-flex is-flex-direction-row is-flex-wrap-wrap daysContainer">
          <Day v-for="day in chain.days" :workouts="day.workouts" :type="day.type" />
          <button class="addDay">
            <img v-bind:src="`src/assets/plus.png`" width="70" height="70" />
          </button>
        </div>
        <hr />
      </div>
    </section>
    <div class="createChainButton">
      <button class="button is-medium is-light is-info">create new chain</button>
    </div>
  </div>
</template>

<style scoped>
.chainContainer {
  height: 100%;
}

.chainName {
  margin-left: 20px;
  font-size: 22px;
}
.title {
  margin-left: 20px;
}
.daysContainer {
  column-gap: 20px;
  margin-top: 10px;
}
.button {
  margin-left: 20px;
}
.addDay {
  height: 100px;
  width: 100px;
  cursor: pointer;
  border-radius: 6px;
  background-color: rgba(243, 246, 217, 0.4);
  border: none;
}
.addDay:hover {
  border: 1px solid chocolate;
}
.createChainButton {
  margin-bottom: 20px;
}
@media all and (max-width: 960px) {
  .chainContainer {
    padding: 20px;
  }
}
</style>

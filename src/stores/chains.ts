import { defineStore } from 'pinia';

type Chain = {
  id: number;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
};

type State = {
  data: Chain[];
};

export const useChainStore = defineStore('chains', {
  state: (): State => ({data: []}),
  getters: {
    chains: (state) => {
      console.log('🚀 ~ file: chains.ts ~ line 17 ~ state', state);
      return state.data;
    },
  },
  actions: {},
});

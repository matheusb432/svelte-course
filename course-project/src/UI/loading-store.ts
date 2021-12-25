import { Writable, writable } from 'svelte/store';

const loadingStore: Writable<boolean> = writable(false);

const customStore = {
  subscribe: loadingStore.subscribe,
  setLoading: async (isLoading: boolean) => {
    loadingStore.set(isLoading);
  },
  toggleLoading: () => {
    loadingStore.update((isLoading) => !isLoading);
  },
};

export default customStore;

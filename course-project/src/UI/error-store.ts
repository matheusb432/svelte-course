import { Writable, writable } from 'svelte/store';

const errorStore: Writable<string> = writable('');

const customStore = {
  subscribe: errorStore.subscribe,
  setError: (err: string) => {
    errorStore.set(err);
  },
};

export default customStore;

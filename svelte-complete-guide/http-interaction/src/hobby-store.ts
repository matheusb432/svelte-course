import { writable } from 'svelte/store';

const hobbiesStore = writable([]);

const customStore = {
  subscribe: hobbiesStore.subscribe,
  setHobbies: (hobbies: string[]) => {
    hobbiesStore.set(hobbies);
  },
  addHobby: (hobby: string) => {
    hobbiesStore.update((hobbies) => [...hobbies, hobby]);
  },
};

export default customStore;

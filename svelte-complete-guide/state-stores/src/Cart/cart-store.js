import { writable } from 'svelte/store';

// NOTE stores can be used to enable app-wide cross component communications
const cart = writable([
  {
    id: 'p3',
    title: 'Test',
    price: 9.99,
  },
  {
    id: 'p4',
    title: 'Test',
    price: 9.99,
  },
]);

export default cart;

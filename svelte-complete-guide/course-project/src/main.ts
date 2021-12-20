import App from './App.svelte';

const app = new App({
  target: document.body,
  // NOTE * instead of the app being appended to the DOM body, it can also be appended to any element
  //   target: document.querySelector('#app')!,
  props: {
    name: 'world',
  },
});

// NOTE * adding the header component as a standalone UI component to index.html, but it will be in another component tree
// const header = new Header({
//   target: document.querySelector('#header')!,
// });

export default app;

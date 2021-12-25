/// <reference types="svelte" />

// NOTE adding this so TS doesn't throw a wrong error when importing .svelte files in index files
declare module '*.svelte' {
  const value: any;
  export default value;
}

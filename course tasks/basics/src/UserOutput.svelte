<script>
  export let courseGoal;

  // NOTE using a dynamic expression instead of a function
  $: shouldHighlight = typeof courseGoal === 'string' && courseGoal.includes('!');

  //   function shouldHighlight(word) {
  //       return typeof word === 'string' && word.includes('!')
  //   }
</script>

<h1 class:emphasis={shouldHighlight}>{courseGoal}</h1>

<style>
  .emphasis {
    color: red;
    font-weight: bold;
  }
</style>

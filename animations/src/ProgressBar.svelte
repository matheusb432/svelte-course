<script lang="ts">
  import { Tweened, tweened } from 'svelte/motion';
  import { cubicIn } from 'svelte/easing';

  // NOTE tweened provides a basic animations when it's store value changes
  const progress: Tweened<number> = tweened(0, {
    delay: 0,
    duration: 700,
    easing: cubicIn,
  });

  setTimeout(() => {
    progress.set(0.5);
  }, 1500);
</script>

<progress value={$progress} />

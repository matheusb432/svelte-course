<script lang="ts">
  import { spring, Spring } from 'svelte/motion';

  import type { SpringCard } from './types/spring-card';
  import type { SpringPosition } from './types/spring-position';

  // NOTE spring animates the transition of a value from another value while taking physics into account
  let cards: Spring<SpringCard[]> = spring([
    {
      id: 'c1',
      color: 'red',
    },
    {
      id: 'c2',
      color: 'blue',
    },
    {
      id: 'c3',
      color: 'green',
    },
    {
      id: 'c4',
      color: 'orange',
    },
  ]);
  let cardPos: Spring<SpringPosition[]> = spring(
    [
      {
        rotation: 10,
        dx: 0,
      },
      {
        rotation: -10,
        dx: 0,
      },
      {
        rotation: 19,
        dx: 0,
      },
      {
        rotation: -25,
        dx: 0,
      },
    ],
    {
      stiffness: 0.05,
      damping: 0.9,
      precision: 0.001,
    }
  );

  function discard(index) {
    cardPos.update((items) => {
      const updatedCardPositions = [...items];
      const updatedCardPos = { ...updatedCardPositions[index] };

      updatedCardPos.dx = 1200;
      updatedCardPos.rotation = 60;

      updatedCardPositions[index] = updatedCardPos;
      return updatedCardPositions;
    });
  }
</script>

<div class="page">
  <div class="cards">
    {#each $cards as card, i (card.id)}
      <div
        class="card"
        style="background: {card.color}; transform: rotateZ({$cardPos[i]
          .rotation}deg) translateX({$cardPos[i].dx}px)"
        on:click={discard.bind(this, i)} />
    {/each}
  </div>
</div>

<style>
  .page {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
  }

  .card {
    position: absolute;
    width: 20rem;
    height: 30rem;
    background: #ccc;
    left: calc(50% - 10rem);
    top: calc(50vh - 15rem);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
  }
</style>

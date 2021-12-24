<script>
  import Modal from './Modal.svelte';

  export let message;
</script>

<Modal title="An Error Ocurred!" on:cancel>
  <p>{message}</p>
</Modal>

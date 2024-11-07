<script>
  export let message;

  function handleClick(e) {
    document.body.removeChild(this.parentElement);
  }
</script>

<div class="alert">
  <p>{message}</p>
  <button on:click={handleClick}>X</button>
</div>

<style>
  .alert {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    background-color: orange;
    border: 1px solid black;
    align-items: center;
  }

  p {
    margin: 0;
  }

  button {
    background-color: transparent;
    color: black;
    cursor: pointer;
    justify-self: end;
  }
</style>

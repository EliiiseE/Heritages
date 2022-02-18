<script>
  import Triangle from './Triangle.svelte';
  import Square from './Square.svelte';
  import House from './House.svelte';
  import Button from '../Button.svelte';

  export let onValidate;
  export let shape;

  let isGameWin;

  const handleGameWin = () => {
    isGameWin = true;
  };
</script>

<div>
  <p class="instruction">Touche les points pour continuer</p>

  {#if shape === 'triangle'}
    <Triangle {handleGameWin} />
  {:else if shape === 'square'}
    <Square {handleGameWin} />
  {:else if shape === 'house'}
    <House {handleGameWin} />
  {/if}

  {#if isGameWin}
  <div class="button__container">
    <Button onClick={onValidate} text="Valider" isDark={true} />
  </div>
  {/if}
</div>

<style lang="scss">
  @import '../../var';

  .instruction {
    position: absolute;
    top: 11rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-family: $interaction-font;
    font-weight: 900;
    color: $dark-color;
  }

  .button__container {
    position: absolute;
    bottom: 6rem;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

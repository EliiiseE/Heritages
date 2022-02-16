<script>
  import Triangle from './Triangle.svelte';
  import Square from './Square.svelte';
  import House from './House.svelte';
  import Button from '../Button.svelte';

  export let onValidate;
  export let shape;
</script>

<div>
  <p class="instruction">Relie les points pour continuer</p>

  {#if shape === 'triangle'}
    <Triangle onValidate={onValidate} />
  {:else if shape === 'square'}
    <Square onValidate={onValidate} />
  {:else if shape === 'house'}
    <House onValidate={onValidate}/>
  {/if}

  <div class="button__container">
    <Button onClick={onValidate} text="Valider" isDark={false} />
  </div>
</div>

<style lang="scss">
  @import '../../var';

  .instruction {
    font-size: 1.6rem;
    font-family: $interaction-font;
    font-weight: 900;
    color: $primary-color;
  }

  .button__container {
    position: absolute;
    bottom: 6rem;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

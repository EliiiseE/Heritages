<script>
  export let onClick;
  export let text;
  export let isDark;
</script>

<button
  class={`homepage__btn-start ${isDark ? 'dark' : ''}`}
  type="button"
  on:click={onClick}>{text}</button
>

<style lang="scss">
  @import '../var';

  .homepage__btn-start {
    display: block;
    position: relative;
    background: none;
    border: none;
    margin: 0 auto;
    padding: 0 0.2em 3px 0.2em;
    white-space: nowrap;
    font-size: clamp(22px, 6.875%, 30px);
    font-family: $interaction-font;
    color: $primary-color;

    &.dark {
      color: $dark-color;

      &::after {
        background-color: $dark-color;
      }
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: $primary-color;
      height: 1px;
      width: 100%;
    }
  }
</style>

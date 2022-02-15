<script>
</script>

<button class="homepage__btn-start font-italic font-bold" type="button">Lancer l'expérience</button>

<style lang="scss">
  @import '../../var';

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

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: $primary-color;
      height: 1px;
      width: 100%;
    }

    @media all and (max-height: 670px) {
      .homepage__btn-start {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>

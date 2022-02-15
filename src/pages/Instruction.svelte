<script>
  import { navigate } from 'svelte-routing';

  const handleClick = () => {
    navigate('/story');
  };
</script>

<div on:click={handleClick} class="instructions">
  <div class="instructions__upperPart">
    <div class="instructions__upperPart-audio">
      <img src="../static/images/audio.svg" alt="audio" />
      <p>Port d’un casque audio conseillé.</p>
    </div>
    <div class="instructions__upperPart-navigation">
      <img src="../static/images/continue.svg" alt="navigation" />
      <p>Naviguez dans l’interface grâce aux zones situées à gauche et à droite de votre écran.</p>
    </div>
  </div>
  <div class="instructions__lowerPart">
    <div class="instructions__lowerPart-previous">
      <p>Précédent</p>
      <img src="../static/images/continue.svg" alt="navigation" />
    </div>
    <div class="instructions__lowerPart-next">
      <p>Suivant</p>
      <img src="../static/images/continue.svg" alt="navigation" />
    </div>
  </div>
</div>

<style lang="scss">
  @import '../var';
  .instructions {
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
    height: 100vh;
    background: url('/static/texture/texture-1.jpg');

    &__upperPart {
      &-audio,
      &-navigation {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin: 2rem 0;

        img {
          flex-basis: 20%;
          height: 20px;
        }
        p {
          flex-basis: 80%;
          font-family: $text-font;
          font-size: 1.5rem;
          font-style: italic;
        }
      }
      &-navigation {
        img {
          height: 1rem;
        }
      }
    }

    &__lowerPart {
      height: 100%;
      display: flex;
      justify-content: space-between;

      &-previous,
      &-next {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px $primary-color solid;

        p {
          font-family: $text-font;
          text-transform: uppercase;
          font-size: 1.8rem;
        }

        img {
          height: 1rem;
          margin-top: 1rem;
        }
      }

      &-previous {
        margin-right: 1.6rem;

        img {
          transform: rotate(-180deg);
        }
      }
    }
  }
</style>

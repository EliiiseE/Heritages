<script>
  import Button from '../components/Button.svelte';
  import { navigate } from 'svelte-routing';

  const handleClick = () => {
    navigate('/');
  };
</script>

<footer>
  <div class="endExperience">
    <p class="endExperience__text">Experience terminée</p>

    <Button onClick={handleClick} text="Recommencer l'expérience" />

    <div class="bottom-page">
      <p class="bottom-page__grateful">Merci !</p>
      <p class="bottom-page__grade">©MMI</p>
      <div class="name">
        <ul>
          <a target="_blank" href="https://www.linkedin.com/in/flavie-blanchet-9b64541b8/">
            <span>BLANCHET</span> FLAVIE</a
          >
          <a target="_blank" href="https://www.linkedin.com/in/vanon-borget/">
            <span>BORGET </span> VANON</a
          >
          <a target="_blank" href="https://www.linkedin.com/in/theo-saminadin/">
            <span>SAMINADIN</span> THÉO</a
          >
          <a target="_blank" href="https://www.linkedin.com/in/mahelapellot/">
            <span>PELLOT</span> MAHELA</a
          >
        </ul>
        <ul class="left-part">
          <a target="_blank" href="https://www.linkedin.com/in/elise-echasseriau-147a501a0/">
            <span>ECHASSERIAU</span> ELISE</a
          >
          <a target="_blank" href="https://www.linkedin.com/in/julian-laballe-050a931b8/">
            <span>LABALLE</span> JULIAN</a
          >
          <a target="_blank" href="https://www.linkedin.com/in/nathaël-labat/">
            <span>LABAT</span> NATHAËL</a
          >
        </ul>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  @import '../var';
  .endExperience {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 2rem 2.4rem 2rem;
    height: 100vh;
    background: url('/static/texture/texture-1.jpg');

    &__text {
      font-family: $text-font;
      font-size: 1.6rem;
      text-transform: uppercase;
      text-align: center;
      font-weight: 400px;
      margin: 4rem;
    }
    .bottom-page {
      position: relative;
      &__grateful {
        position: absolute;
        bottom: 95px;
        left: 0;
        font-family: $interaction-font;
        font-size: 6.4rem;
        font-style: italic;
        font-weight: 700;
      }
      &__grade {
        font-family: $text-font;
        font-size: 1.2rem;
      }

      .name {
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        ul {
          display: flex;
          flex-direction: column;

          a {
            color: $primary-color;
            font-size: 1.2rem;
            margin: 2px 0;
            font-family: $text-font;
            span {
              font-family: $text-font;
              font-size: 1.2rem;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
</style>

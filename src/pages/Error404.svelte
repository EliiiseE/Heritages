<script>
  import Button from '../components/Button.svelte';
  import Title from '../components/Title.svelte';
  import { navigate } from 'svelte-routing';

  const handleClick = () => {
    navigate('/');
  };
</script>

<div class="error">
  <div>
    <p class="error__title">Erreur 404</p>
    <p class="error__subtitle">Page non trouvée</p>
  </div>

  <Button onClick={handleClick} text="Retour à l’accueil" />

  <Title />
</div>

<style lang="scss">
  @import '../var';
  .error {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 1.6rem;
    height: 100vh;
    background: url('/static/texture/texture-1.jpg');

    &__title {
      font-family: $text-font;
      font-size: 1.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    &__subtitle {
      font-family: $text-font;
      font-size: 1.6rem;
      text-transform: uppercase;
    }
  }
</style>

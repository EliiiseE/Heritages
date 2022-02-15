<script>
  import Title from '../components/Title.svelte';
  import Button from '../components/Button.svelte';
  import IntroCredits from '../components/IntroCredits.svelte';

  import { navigate } from 'svelte-routing';

  const handleClick = () => {
    navigate('/instruction');
  };
</script>

<div class="homepage__container">
  <Title />
  <Button onClick={handleClick} text="Lancer l'expérience" />
  <IntroCredits />
</div>

<style lang="scss">
  .homepage__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 10px 24px 10px;
    height: 100%;
    background: url('/static/texture/texture-1.jpg');
  }
</style>

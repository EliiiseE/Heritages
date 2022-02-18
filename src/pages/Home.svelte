<script>
  import Title from '../components/Title.svelte';
  import Button from '../components/Button.svelte';
  import IntroCredits from '../components/IntroCredits.svelte';
  import { navigate } from 'svelte-routing';

  export let onClick;

  const handleClick = () => {
    onClick();
    navigate('/instruction');
  };
</script>

<div class="homepage__container">
  <Title />
  <div class="button__container">
    <Button onClick={handleClick} text="Lancer l'expérience" />
  </div>
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

  .button__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

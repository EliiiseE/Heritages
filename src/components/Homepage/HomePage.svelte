<script>
  import Title from './Title.svelte';
  import LaunchExperienceBtn from './LaunchExperienceBtn.svelte';
  import IntroCredits from './IntroCredits.svelte';
</script>

<div class="homepage__container">
    <!-- <Title/>
    <LaunchExperienceBtn/>
    <IntroCredits/> -->
  <img
    src="/static/images/intro-description.svg"
    alt="L'art est plus que technique c'est un héritage à préserver"
  />
</div>

<style lang="scss">
  .homepage__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 10px 24px 10px;
    height: 100%;
    background: url('/static/texture/texture-1.jpg');

    img {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>

<script>
  import { onMount } from 'svelte';
  import Vue from '../components/Vue.svelte';

  let hasBeenScroll = false;

  onMount(() => {
    window.onscroll = () => {
      // - 50 pour ne pas à avoir aller jusqu'au bout de l'écran
      if (window.scrollY >= window.innerHeight - 50) {
        hasBeenScroll = true;
      }
    };
  });
</script>

<main>
  {#if !hasBeenScroll}
    <div class="story__container">
      <div class="scroll">
        <p>Scroll pour continuer</p>
        <img src="../static/images/arrow-b.svg" alt="" />
      </div>
      <img
        class="title"
        src="/static/images/intro-description.svg"
        alt="L'art est plus que technique c'est un héritage à préserver"
      />
    </div>
  {/if}

  <div class="vue__container">
    <Vue />
  </div>
</main>

<style lang="scss">
  @import '../var';

  main {
    height: 100%;
    // overflow-y: scroll;
    // scroll-snap-type: y mandatory;

    .story__container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 10px 24px 10px;
      height: 100%;
      background: url('/static/texture/texture-1.jpg');
      // scroll-snap-align: start;

      .scroll {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);

        p {
          font-family: $interaction-font;
          font-size: 1.6rem;
          font-weight: 700;
          text-align: center;
          margin: 0;
          padding: 2rem 0 0 0;
        }
      }

      .title {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .vue__container {
      background: url('/static/texture/texture-1.jpg');
      // scroll-snap-align: start;
    }
  }
</style>

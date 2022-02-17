<script>
  import { onMount } from 'svelte';
  import Vue from '../components/Vue.svelte';
  import Game from '../components/Game/Game.svelte';
  import data from '../utils/data.json';
  import { navigate } from 'svelte-routing';
  import { characterNames } from '../../store';

  let hasBeenScroll = false;

  let actualPartIndex = 0;
  let actualDialogIndex = 0;

  let actualData;
  let actualImage;
  let nextImage;
  let actualCharacter;
  let actualAudio;
  let actualMessage;
  let isGame;

  onMount(() => {
    window.onscroll = () => {
      // - 50 pour ne pas à avoir aller jusqu'au bout de l'écran
      if (window.scrollY >= window.innerHeight - 50) {
        hasBeenScroll = true;
      }
    };

    let audio = document.getElementById("soundtrack");
    audio.volume = 0.6;
  });

  const preloadImage = () => {
    nextImage = data.parts[actualPartIndex + 1].url;

    const img = document.createElement('img');
    img.src = nextImage;
  };

  const updateImage = () => {
    actualImage = data.parts[actualPartIndex].url;
  };

  const updateDialog = () => {
    actualData = data.parts[actualPartIndex];

    const dialog = actualData.dialogs[actualDialogIndex];
    actualCharacter = characterNames[dialog.character];
    actualMessage = dialog.message;
    actualAudio = dialog.audio;

    if (actualPartIndex < data.parts.length - 1) {
      preloadImage();
    }
  };

  const checkLastDialog = () => {
    if (actualDialogIndex === data.parts[actualPartIndex].dialogs.length - 1) {
      return true;
    } else {
      return false;
    }
  };

  const checkFirstDialog = () => {
    if (actualDialogIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkClickPosition = (position) => {
    if (position >= window.innerWidth / 2) {
      return true;
    }
    return false;
  };

  const next = () => {
    const isLastDialog = checkLastDialog();

    if (isLastDialog) {
      if (actualPartIndex !== data.parts.length - 1) {
        if (data.parts[actualPartIndex + 1].shape) {
          isGame = true;
        }
        actualPartIndex += 1;
        actualDialogIndex = 0;

        updateImage();
      } else {
        navigate('/credit');
      }
    } else {
      actualDialogIndex += 1;
    }
  };

  const previous = () => {
    const isFirstDialog = checkFirstDialog();

    if (isFirstDialog) {
      if (actualPartIndex !== 0) {
        if (data.parts[actualPartIndex - 1].shape) {
          isGame = true;
        }
        actualPartIndex -= 1;
        if (!isGame) {
          actualDialogIndex = data.parts[actualPartIndex].dialogs.length - 1;
        }

        updateImage();
      }
    } else {
      actualDialogIndex -= 1;
    }
  };

  const handleClick = (e) => {
    const cursorPosititonX = e.clientX;
    const isClickRight = checkClickPosition(cursorPosititonX);

    if (isClickRight) {
      next();
    } else {
      previous();
    }

    if (!isGame) {
      updateDialog();
    }
  };

  const valideGame = () => {
    actualPartIndex += 1;
    actualDialogIndex = 0;

    updateImage();
    updateDialog();

    // Parce que le handleClick se déclenche aussi --> doublon dans l'update des variables
    setTimeout(() => {
      isGame = false;
    }, 100);
  };

  const init = () => {
    updateDialog();
    updateImage();
  };

 

  init();
</script>

<main>
  <audio id="soundtrack" autoplay src="/static/audio/soundtrack.mp3"/>
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

  <div on:click={hasBeenScroll && !isGame && handleClick} class="vue__container">
    {#if isGame}
      <Game onValidate={valideGame} shape={data.parts[actualPartIndex].shape} />
    {:else}
      <Vue
        isReady={hasBeenScroll}
        {actualMessage}
        {actualAudio}
        {actualImage}
        {actualCharacter}
        {actualData}
      />
    {/if}
  </div>
</main>

<style lang="scss">
  @import '../var';

  main {
    height: 100%;

    .story__container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 10px 24px 10px;
      height: 100%;
      background: url('/static/texture/texture-1.jpg');

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
      height: 100vh;
    }
  }
</style>

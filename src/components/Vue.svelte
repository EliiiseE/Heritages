<script>
  import data from '../utils/data.json';
  import { characterNames } from '../../store';
  import { navigate } from 'svelte-routing';
  
  
  let actualPartIndex = 0;
  let actualDialogIndex = 0;

  let actualData;
  let actualImage;
  let nextImage;
  let actualCharacter;
  let actualMessage;

  const updateImage = () => {
    actualImage = data.parts[actualPartIndex].url;
  };  

  
  const updateDialog = () => {
    actualData = data.parts[actualPartIndex];
    nextImage = data.parts[actualPartIndex+1].url;
    
    let img = document.createElement('img');
    img.src = nextImage

    const dialog = actualData.dialogs[actualDialogIndex];
    actualCharacter = characterNames[dialog.character];
    actualMessage = dialog.message;
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
        actualPartIndex -= 1;
        actualDialogIndex = data.parts[actualPartIndex].dialogs.length - 1;

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

    updateDialog();
  };

  const init = () => {
    updateDialog();
    updateImage();
  };

  init();

</script>

<div on:click={handleClick} class="container">
  {#if actualData.date}
    <p class="date">{actualData.date}</p>
  {/if}
  <div class="textArea__container" style={`background-image: url(${actualImage});`}>
    <div class={`textArea ${actualCharacter === characterNames.second ? 'right' : ''}`}>
      <h4>{actualCharacter}</h4>
      <div class="textArea__dialogs">
        <div class="dialog">
          <span class="left-quote">&ldquo</span>
          <p>{actualMessage}</p>
          <span class="right-quote">&bdquo</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import '../var';

  .container {
    position: relative;

    .date {
      position: absolute;
      top: 50%;
      right: 15px;
      font-family: $title-font;
      font-weight: 700;
      font-style: italic;
      font-size: 6rem;
      z-index: 2;
      opacity: 0.3;
    }
  }

  .textArea__container {
    background-size: cover;
    background-position: 35% 55%;
    background-repeat: no-repeat;
    height: 100vh;
    position: relative;
    z-index: 1;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.4;
      z-index: -1;
    }

    .textArea {
      position: absolute;
      bottom: 50px;
      left: 30px;
      right: 30px;

      &.right {
        h4 {
          text-align: right;
        }

        .textArea__dialogs {
          justify-content: flex-end;

          p {
            margin-right: 2rem;
            margin-left: 0;
            text-align: right;
          }
        }
      }

      h4 {
        font-family: $title-font;
        font-weight: 700;
        font-style: italic;
        font-size: 2.4rem;
      }

      .textArea__dialogs {
        margin-top: 2.5rem;
        display: flex;

        .dialog {
          position: relative;
          width: 70%;

          p {
            font-family: $text-font;
            font-size: 1.5rem;
            font-style: italic;
            margin-left: 2rem;
          }

          .left-quote,
          .right-quote {
            position: absolute;
            font-family: $interaction-font;
            font-size: 6.4rem;
            margin: 0;
          }

          .left-quote {
            top: 0;
            left: 0;
            transform: translate(-25%, -50%);
          }

          .right-quote {
            bottom: 0;
            right: 0;
            transform: translate(75%, 25%);
          }
        }
      }
    }
  }
</style>

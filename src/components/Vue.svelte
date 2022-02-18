<script>
  import { characterNames, showTextAnimation } from '../../store';

  export let actualMessage;
  export let actualAudio;
  export let actualCharacter;
  export let actualData;
  export let isPulsing;
</script>

<div class="container">
  {#if actualData.date}
    <p class="date">{actualData.date}</p>
  {/if}
  <div class="textArea__container">
    {#key actualMessage}
      <div class={`textArea ${actualCharacter === characterNames.second ? 'right' : ''}`}>
        <h4 in:showTextAnimation={{ isLeft: actualCharacter === characterNames.main }}>
          {actualCharacter}
        </h4>
        <div
          in:showTextAnimation={{ isLeft: actualCharacter === characterNames.main, delay: 400 }}
          class="textArea__dialogs"
        >
          <div class="dialog">
            <span class="left-quote">&ldquo</span>
            <p>
              {actualMessage}
            </p>
            <span class="right-quote">&bdquo</span>
          </div>
        </div>
      </div>
    {/key}

    {#if isPulsing}
      <div class="pulse" />
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../var';

  .container {
    position: relative;
    overflow-x: hidden;

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
    height: 100vh;

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

  .pulse {
    position: absolute;
    top: 50%;
    right: 3rem;
    background: rgba($primary-color, 0.5);
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    box-shadow: 0 0 0 0 rgba($primary-color, 1);
    transform: scale(1);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: translateY(-50%) scale(0.95);
      box-shadow: 0 0 0 0 rgba($primary-color, 0.7);
    }

    70% {
      transform: translateY(-50%) scale(1);
      box-shadow: 0 0 0 3rem rgba($primary-color, 0);
    }

    100% {
      transform: translateY(-50%) scale(0.95);
      box-shadow: 0 0 0 0 rgba($primary-color, 0);
    }
  }
</style>

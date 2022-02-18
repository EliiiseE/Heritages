<script>
  import { onMount } from 'svelte';

  export let handleGameWin;

  let squareContainer;
  let topLeftPointIsFill = false;
  let topRightPointIsFill = false;
  let bottomRightPointIsFill = false;
  let bottomLeftPointIsFill = false;
  let drawRectangle = false;

  onMount(() => {
    const THRESHOLD = 30;
    const POINT_RADIUS = 7;

    const firstSquareLine = document.querySelector('#first-square-line');
    const secondSquareLine = document.querySelector('#second-square-line');
    const thirdSquareLine = document.querySelector('#third-square-line');
    const fourthSquareLine = document.querySelector('#fourth-square-line');
    const squareLines = [firstSquareLine, secondSquareLine, thirdSquareLine, fourthSquareLine];
    const squarePoints = [...squareContainer.querySelectorAll('.square__point')];
    const squareContainerBoundingBox = squareContainer.getBoundingClientRect();

    const square = {
      topLeftPoint: {
        coordinates: {
          x: squarePoints[0].offsetLeft,
          y: squarePoints[0].offsetTop,
        },
      },
      topRightPoint: {
        coordinates: {
          x: squarePoints[1].offsetLeft,
          y: squarePoints[1].offsetTop,
        },
      },
      bottomRightPoint: {
        coordinates: {
          x: squarePoints[2].offsetLeft,
          y: squarePoints[2].offsetTop,
        },
      },
      bottomLeftPoint: {
        coordinates: {
          x: squarePoints[3].offsetLeft,
          y: squarePoints[3].offsetTop,
        },
      },
    };

    const distanceBetweenTwoPoints = calculateDistanceBetweenPoints(
      square.topLeftPoint.coordinates,
      square.topRightPoint.coordinates,
    );
    squareLines.forEach(
      (line) => (line.style.width = `${distanceBetweenTwoPoints + POINT_RADIUS}px`),
    );

    squareContainer.addEventListener('pointerdown', (e) => {
      const pointer = {
        x: e.clientX - squareContainerBoundingBox.left,
        y: e.clientY - squareContainerBoundingBox.top,
      };

      if (isNear(square.topLeftPoint.coordinates, pointer)) topLeftPointIsFill = true;
      else if (isNear(square.topRightPoint.coordinates, pointer)) topRightPointIsFill = true;
      else if (isNear(square.bottomRightPoint.coordinates, pointer)) bottomRightPointIsFill = true;
      else if (isNear(square.bottomLeftPoint.coordinates, pointer)) bottomLeftPointIsFill = true;
    });

    const isNear = (target, start) => {
      const distance = calculateDistanceBetweenPoints(target, start);

      return distance < THRESHOLD;
    };

    function calculateDistanceBetweenPoints(target, start) {
      const XDistance = Math.pow(start.x - target.x, 2);
      const YDistance = Math.pow(start.y - target.y, 2);

      return Math.sqrt(XDistance + YDistance);
    }

    squareContainer.addEventListener('pointerup', () => {
      const filledPoint = squarePoints.filter((point) => point.classList.contains('point--fill'));

      if (filledPoint.length === 4) {
        drawRectangle = true;
        handleGameWin();
      }
    });
  });
</script>

<div bind:this={squareContainer} class="square">
  <div class="square__point" class:point--fill={topLeftPointIsFill === true} />
  <div class="square__point" class:point--fill={topRightPointIsFill === true} />
  <div class="square__point" class:point--fill={bottomRightPointIsFill === true} />
  <div
    id="first-square-line"
    class="square__line"
    class:draw={drawRectangle === true}
    style="--index: 0;"
  />
  <div
    id="second-square-line"
    class="square__line"
    class:draw={drawRectangle === true}
    style="--index: 1;"
  />
  <div
    id="third-square-line"
    class="square__line"
    class:draw={drawRectangle === true}
    style="--index: 2;"
  />
  <div
    id="fourth-square-line"
    class="square__line"
    class:draw={drawRectangle === true}
    style="--index: 3;"
  />
  <div class="square__point" class:point--fill={bottomLeftPointIsFill === true} />
</div>

<style lang="scss">
  @import '../../var';

  .square {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50vw;
    width: 50vw;

    &__point {
      z-index: 20;
      position: absolute;
      height: 14px;
      width: 14px;
      border: 1px solid $dark-color;
      border-radius: 50%;
      pointer-events: none;

      &:first-of-type {
        top: 0;
        left: 0;
      }

      &:nth-of-type(2) {
        top: 0;
        right: 0;
      }

      &:nth-of-type(3) {
        bottom: 0;
        right: 0;
      }

      &:last-of-type {
        bottom: 0;
        left: 0;
      }
    }

    .point--fill {
      background-color: $dark-color;
    }

    &__line {
      position: absolute;
      width: 100px;
      height: 2px;
      overflow: hidden;
      pointer-events: none;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        left: -100%;
        height: 100%;
        background-color: $dark-color;
        transition: transform 0.6s cubic-bezier(0.15, 0.9, 0.34, 0.96) calc(var(--index) * 150ms);
      }
    }

    #first-square-line {
      top: 1.5625vw;
    }

    #second-square-line {
      transform: rotate(90deg);
    }

    #second-square-line {
      top: 25vw;
      left: 24vw;
    }

    #third-square-line {
      transform: rotate(180deg);
    }

    #third-square-line {
      bottom: 1.5625vw;
    }

    #fourth-square-line {
      left: -22.4vw;
      top: 25vw;
      transform: rotate(-90deg);
    }

    .square__line.draw.square__line::after {
      transform: translateX(100%);
    }
  }
</style>

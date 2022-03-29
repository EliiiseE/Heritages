<script>
  export let handleGameWin;
  import { onMount } from 'svelte';

  let pointsContainer;
  let topPointIsFill = false;
  let leftPointIsFill = false;
  let rightPointIsFill = false;
  let drawTriangle = false;

  onMount(() => {
    const THRESHOLD = 30;
    const POINT_RADIUS = 7;

    const triangleContainerBoundingBox = pointsContainer.getBoundingClientRect();
    const trianglePoints = [...pointsContainer.querySelectorAll('.point')];
    const firstLine = document.querySelector('#first-line');
    const secondLine = document.querySelector('#second-line');
    const thirdLine = document.querySelector('#third-line');

    const triangle = {
      topPoint: {
        coordinates: {
          x: trianglePoints[0].offsetLeft,
          y: trianglePoints[0].offsetTop,
        },
      },
      leftPoint: {
        coordinates: {
          x: trianglePoints[1].offsetLeft,
          y: trianglePoints[1].offsetTop,
        },
      },
      rightPoint: {
        coordinates: {
          x: trianglePoints[2].offsetLeft,
          y: trianglePoints[2].offsetTop,
        },
      },
    };

    const distanceTopPointToRightPoint = calculateDistanceBetweenPoints(
      triangle.topPoint.coordinates,
      triangle.rightPoint.coordinates,
    );
    const distanceRightPointToLeftPoint = calculateDistanceBetweenPoints(
      triangle.rightPoint.coordinates,
      triangle.leftPoint.coordinates,
    );
    const distanceLeftPointToTopPoint = calculateDistanceBetweenPoints(
      triangle.leftPoint.coordinates,
      triangle.topPoint.coordinates,
    );

    const xMidDistanceTopPointToRightPoint =
      (triangle.topPoint.coordinates.x + triangle.rightPoint.coordinates.x) / 2;
    const yMidDistanceTopPointToRightPoint =
      (triangle.topPoint.coordinates.y + triangle.rightPoint.coordinates.y) / 2;

    const xMidDistanceRightPointToLeftPoint =
      (triangle.rightPoint.coordinates.x + triangle.leftPoint.coordinates.x) / 2;
    const yMidDistanceRightPointToLeftPoint =
      (triangle.rightPoint.coordinates.y + triangle.leftPoint.coordinates.y) / 2;

    const xMidDistanceLeftPointToTopPoint =
      (triangle.leftPoint.coordinates.x + triangle.topPoint.coordinates.x) / 2;
    const yMidDistanceLeftPointToTopPoint =
      (triangle.leftPoint.coordinates.y + triangle.topPoint.coordinates.y) / 2;

    firstLine.style.width = `${distanceTopPointToRightPoint + POINT_RADIUS}px`;
    firstLine.style.left = `${
      xMidDistanceTopPointToRightPoint - distanceTopPointToRightPoint / 2
    }px`;
    firstLine.style.top = `${yMidDistanceTopPointToRightPoint + POINT_RADIUS}px`;
    firstLine.style.transform = `rotate(63deg)`;

    secondLine.style.width = `${distanceRightPointToLeftPoint + POINT_RADIUS}px`;
    secondLine.style.left = `${
      xMidDistanceRightPointToLeftPoint - distanceRightPointToLeftPoint / 2
    }px`;
    secondLine.style.top = `${yMidDistanceRightPointToLeftPoint + POINT_RADIUS}px`;
    secondLine.style.transform = `translate(1%, -5%) rotate(180deg)`;

    thirdLine.style.width = `${distanceLeftPointToTopPoint + POINT_RADIUS}px`;
    thirdLine.style.left = `${xMidDistanceLeftPointToTopPoint - distanceLeftPointToTopPoint / 2}px`;
    thirdLine.style.top = `${yMidDistanceLeftPointToTopPoint + POINT_RADIUS}px`;
    thirdLine.style.transform = `translateX(1%) rotate(296deg)`;

    pointsContainer.addEventListener('pointerdown', (e) => {
      const pointer = {
        x: e.clientX - triangleContainerBoundingBox.left,
        y: e.clientY - triangleContainerBoundingBox.top,
      };

      if (isNear(triangle.topPoint.coordinates, pointer)) topPointIsFill = true;
      else if (isNear(triangle.leftPoint.coordinates, pointer)) leftPointIsFill = true;
      else if (isNear(triangle.rightPoint.coordinates, pointer)) rightPointIsFill = true;
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

    pointsContainer.addEventListener('pointerup', () => {
      const filledPoint = trianglePoints.filter((point) => point.classList.contains('point--fill'));

      if (filledPoint.length === 3) {
        drawTriangle = true;

        handleGameWin();
      }
    });
  });
</script>

<div bind:this={pointsContainer} class="game-container">
  <div class="point" class:point--fill={topPointIsFill === true} />
  <div class="point" class:point--fill={leftPointIsFill === true} />
  <div id="first-line" class="line" class:draw={drawTriangle === true} style="--index: 0;" />
  <div id="second-line" class="line" class:draw={drawTriangle === true} style="--index: 1;" />
  <div id="third-line" class="line" class:draw={drawTriangle === true} style="--index: 2;" />
  <div class="point" class:point--fill={rightPointIsFill === true} />
</div>

<style lang="scss">
  @import '../../var';

  .game-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    height: 50vw;
    max-width: 500px;
    max-height: 500px;

    .point {
      z-index: 20;
      position: absolute;
      height: 20px;
      width: 20px;
      border: 1px solid $dark-color;
      border-radius: 50%;
      pointer-events: none;

      &:first-of-type {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      &:nth-of-type(2) {
        bottom: 0;
        left: 0;
      }

      &:last-of-type {
        bottom: 0;
        right: 0;
      }

      &--fill {
        background-color: $dark-color;
      }
    }

    .line {
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

    .line.draw.line::after {
      transform: translateX(100%);
    }
  }
</style>

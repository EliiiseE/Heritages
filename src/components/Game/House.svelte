<script>
  import { onMount } from 'svelte';

  export let handleGameWin;

  let houseContainer;
  let houseTopLeftPointIsFill = false;
  let houseTopRightPointIsFill = false;
  let houseBottomRightPointIsFill = false;
  let houseBottomLeftPointIsFill = false;
  let houseHighestPointIsFill = false;
  let drawHouse = false;

  onMount(() => {
    const THRESHOLD = 30;
    const POINT_RADIUS = 7;

    const firstHouseLine = document.querySelector('#first-house-line');
    const secondHouseLine = document.querySelector('#second-house-line');
    const housePoints = [...houseContainer.querySelectorAll('.house__point')];
    const houseContainerBoundingBox = houseContainer.getBoundingClientRect();
    const highestPointBoundingBox = housePoints[4].getBoundingClientRect();

    const house = {
      topLeftPoint: {
        coordinates: {
          x: housePoints[0].offsetLeft,
          y: housePoints[0].offsetTop,
        },
      },
      topRightPoint: {
        coordinates: {
          x: housePoints[1].offsetLeft,
          y: housePoints[1].offsetTop,
        },
      },
      bottomRightPoint: {
        coordinates: {
          x: housePoints[2].offsetLeft,
          y: housePoints[2].offsetTop,
        },
      },
      bottomLeftPoint: {
        coordinates: {
          x: housePoints[3].offsetLeft,
          y: housePoints[3].offsetTop,
        },
      },
      highestPoint: {
        coordinates: {
          x: housePoints[4].offsetLeft,
          y: housePoints[4].offsetTop,
        },
      },
    };

    const distanceBetweenPointsTriangle = calculateDistanceBetweenPoints(
      house.topLeftPoint.coordinates,
      house.highestPoint.coordinates,
    );
    firstHouseLine.style.width = `${distanceBetweenPointsTriangle}px`;
    secondHouseLine.style.width = `${distanceBetweenPointsTriangle}px`;

    houseContainer.addEventListener('pointerdown', (e) => {
      const pointer = {
        x: e.clientX - houseContainerBoundingBox.left,
        y: e.clientY - houseContainerBoundingBox.top,
      };

      if (isNear(house.topLeftPoint.coordinates, pointer)) houseTopLeftPointIsFill = true;
      else if (isNear(house.topRightPoint.coordinates, pointer)) houseTopRightPointIsFill = true;
      else if (isNear(house.bottomRightPoint.coordinates, pointer))
        houseBottomRightPointIsFill = true;
      else if (isNear(house.bottomLeftPoint.coordinates, pointer))
        houseBottomLeftPointIsFill = true;
    });

    window.addEventListener('pointerdown', (e) => {
      const pointer = {
        x: e.clientX,
        y: e.clientY,
      };

      if (isNear(highestPointBoundingBox, pointer)) houseHighestPointIsFill = true;
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

    houseContainer.addEventListener('pointerup', () => {
      const filledPoint = housePoints.filter((point) => point.classList.contains('point--fill'));

      if (filledPoint.length === 5) {
        drawHouse = true;
        handleGameWin();
      }
    });
  });
</script>

<div bind:this={houseContainer} class="house">
  <div class="house__point" class:point--fill={houseTopLeftPointIsFill === true} />
  <div class="house__point" class:point--fill={houseTopRightPointIsFill === true} />
  <div class="house__point" class:point--fill={houseBottomRightPointIsFill === true} />
  <div class="house__point" class:point--fill={houseBottomLeftPointIsFill === true} />
  <div class="house__point" class:point--fill={houseHighestPointIsFill === true} />
  <div
    id="first-house-line"
    class="house__line"
    class:draw={drawHouse === true}
    style="--index: 0;"
  />
  <div
    id="second-house-line"
    class="house__line"
    class:draw={drawHouse === true}
    style="--index: 1;"
  />
  <div
    id="third-house-line"
    class="house__line"
    class:draw={drawHouse === true}
    style="--index: 2;"
  />
  <div
    id="fourth-house-line"
    class="house__line"
    class:draw={drawHouse === true}
    style="--index: 3;"
  />
  <div
    id="fifth-house-line"
    class="house__line"
    class:draw={drawHouse === true}
    style="--index: 4;"
  />
</div>

<style lang="scss">
  @import '../../var';

  .house {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50vw;
    width: 50vw;

    &__point {
      z-index: 20;
      position: absolute;
      height: 20px;
      width: 20px;
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

      &:nth-of-type(4) {
        bottom: 0;
        left: 0;
      }

      &:nth-child(5) {
        left: 25vw;
        top: -25vw;
        transform: translate(-50%);
      }
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

    #first-house-line {
      top: 1.5625vw;
      left: -17.3vw;
      transform: translate(37%, -12vw) rotate(-47deg);
    }

    #second-house-line {
      top: 24vw;
      left: 24vw;
      transform: translate(-15%, -35vw) rotate(47deg);
    }

    #first-house-line,
    #second-house-line {
      width: 25vw;
    }

    #third-house-line {
      top: 0;
      right: -44.5%;
    }

    #fourth-house-line {
      bottom: 7px;
      left: 0;
      transform: rotate(180deg);
    }

    #fifth-house-line {
      left: -44.5%;
      transform: translateY(25vw) rotate(-90deg);
    }

    #third-house-line {
      transform: translateY(25vw) rotate(90deg);
    }

    #third-house-line,
    #fourth-house-line,
    #fifth-house-line {
      width: 49vw;
    }

    .point--fill {
      background-color: $dark-color;
    }

    .house__line.draw.house__line::after {
      transform: translateX(100%);
    }
  }
</style>

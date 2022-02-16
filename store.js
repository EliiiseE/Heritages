import { cubicOut } from 'svelte/easing';

export const characterNames = {
  main: 'Edouard',
  second: 'Loïs',
};

export const showTextAnimation = (node, params) => {
  return {
    delay: params.delay || 0,
    duration: params.duration || 800,
    easing: params.easing || cubicOut,
    css: (t, u) => `
      transform: translateX(${params.isLeft ? '-' : ''}${u * 100}px);
      opacity: ${t};
    `,
  };
};

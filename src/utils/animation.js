import BezierEasing from 'bezier-easing';

export const ease = (duration, animation, callback) => {
  const easer = BezierEasing(0.2, 0.5, 0.6, 1);
  let start;

  const step = (timestamp) => {
    if (!start) start = timestamp;

    const timeLapsed = timestamp - start;
    animation(easer(timeLapsed / duration));

    if (timeLapsed < duration) {
      window.requestAnimationFrame(step);
    } else {
      callback();
    }
  };

  window.requestAnimationFrame(step);
};


import { Star } from "./Star";

export const renderStarField = (
  ctx,
  width,
  height,
  scale,
  offsetX,
  offsetY,
) => {
  const stars = [];
  const FADE_INTERVAL = 5000;
  const DRAW_SPEED = 100;
  const WIDTH = width;
  const HEIGHT = height;

  function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.translate(offsetX, offsetY);

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.update();
      star.draw(ctx);
      if (star.alpha <= 0) {
        stars.splice(i, 1);
      }
    }

    ctx.restore();
    requestAnimationFrame(animate);
  }

  setInterval(() => {
    const randX = Math.random() * WIDTH;
    const randY = Math.random() * HEIGHT;
    const randFadeInterval = Math.random() * FADE_INTERVAL;
    const newStar = new Star(randX, randY, 15, 5);
    stars.push(newStar);
    setTimeout(() => newStar.startFade(2000), randFadeInterval);
  }, DRAW_SPEED);

  animate();
  // set a delay
};

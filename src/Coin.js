export const renderCoin = (canvas, ctx) => {
  const RADIUS_X = 35; // smaller X radius for a slightly oval start
  const RADIUS_Y = 50; // vertical radius
  const WIDTH = canvas.width / 2;
  const HEIGHT = canvas.height / 2;
  const ANIM_SPEED = 10;

  console.log("rendering coin");

  // draw initial oval shape before animation starts
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.fillStyle = "gold";
  ctx.ellipse(WIDTH, HEIGHT, RADIUS_X, RADIUS_Y, 0, 0, 2 * Math.PI);
  ctx.fill();

  const animation = () => {
    let i = 0;

    ctx.fillStyle = "gold";
    const shrink = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "gray";
      ctx.beginPath();
      ctx.ellipse(WIDTH, HEIGHT + RADIUS_Y, RADIUS_X, 5, 0, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "gold"

      ctx.beginPath();
      ctx.ellipse(WIDTH, HEIGHT, RADIUS_X - i, RADIUS_Y, 0, 0, 2 * Math.PI);
      ctx.fill();

      i++;
      if (i > RADIUS_X) {
        clearInterval(shrink);
        grow();
      }
    }, ANIM_SPEED);

    function grow() {
      let i = RADIUS_X;
      const interval2 = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.ellipse(WIDTH, HEIGHT + RADIUS_Y, RADIUS_X, 5, 0, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle ="gold"

        ctx.beginPath();
        ctx.ellipse(WIDTH, HEIGHT, RADIUS_X - i, RADIUS_Y, 0, 0, 2 * Math.PI);
        ctx.fill();

        i--;
        if (i <= 0) {
          clearInterval(interval2);
          animation(); // loop forever
        }
      }, ANIM_SPEED);
    }
  };

  // start animation slightly later so the oval is visible first
  setTimeout(animation, 200);
};

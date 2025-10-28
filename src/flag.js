import "./style.css";

export function drawStars(ctx, x, y, radius, sides, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.moveTo(x, y - radius);
  for (let i = 0; i < 2 * sides + 1; i++) {
    let r = i % 2 == 0 ? radius : radius / 2;
    let a = (Math.PI * i) / sides - Math.PI / 2;
    ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
  ctx.fill();
}

export const renderFlag = (canvas, ctx) => {
  const START_POS_X = (canvas.width / 2) / 2;
  const START_POS_Y = (canvas.height / 2) / 2;
  const stripeColors = ["red", "white"];

  // stripes
  for (let i = 0; i < 13; i++) {
    ctx.fillStyle = stripeColors[i % 2];
    ctx.fillRect(START_POS_X, START_POS_Y + 30 * i + 1, 700, 30);
  }

  // top blue square
  ctx.fillStyle = "blue";
  ctx.fillRect(START_POS_X, START_POS_Y, 300, 211);

  // stars

  // flag has 9 rows and 11 column
  // alternates 6 5 in each row
  for (let r = 0; r < 9; r++) {
    let starsInRows = r % 2 === 0 ? 6 : 5;
    for (let i = 0; i < starsInRows; i++) {
      let offset = r % 2 == 0 ? 25 : 50;
      drawStars(ctx, START_POS_X + offset + i * 50, START_POS_Y + 25 + r * 20, 12, 5, "white");
    }
  }
};

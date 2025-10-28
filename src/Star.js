const colors = ["red", "blue", "yellow", "green", "purple", "pink", "white"];

export class Star {
  constructor(x, y, radius, sides, fillColor = "") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.fillColor = fillColor ? fillColor : colors[Math.floor(Math.random() * colors.length)];
    this.alpha = 1.0;
    this.fading = false;
  }

  startFade(duration = 2000) {
    this.fading = true;
    this.fadeStep = 16 / duration;
  }

  update() {
    if (this.fading && this.alpha > 0) {
      this.alpha -= this.fadeStep;
      if (this.alpha < 0) this.alpha = 0;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.radius);
    for (let i = 0; i < 2 * this.sides + 1; i++) {
      let r = i % 2 == 0 ? this.radius : this.radius / 2;
      let a = (Math.PI * i) / this.sides - Math.PI / 2;
      ctx.lineTo(this.x + r * Math.cos(a), this.y + r * Math.sin(a));
    }
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
}

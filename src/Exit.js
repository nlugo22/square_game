export class Exit {
  constructor(x, y, width, height, nextLevel) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.nextLevel = nextLevel;
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x , this.y, this.width, this.height);
  }

}

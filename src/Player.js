export class Player {
  constructor(x, y, length, width, speed, hardMode = false) {
    this.currMap = "Level 1";
    this.x = x;
    this.y = y;
    this.length = length;
    this.width = width;
    this.speed = speed;
    this.velocityY = 0;
    this.velX = 0;
    this.gravity = 0.9;
    this.friction = 0.8; // horizontal velocity damping
    this.isJumping = false;
    this.isDead = false;
    this.onLeftWall = false;
    this.onRightWall = false;
    this.lastWallJump = null;
    this.worldHeight = 1080;
    this.hardMode = hardMode;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.length, this.width);
  }

  respawn(map) {
    this.x = map.spawn.x;
    this.y = map.spawn.y;
    this.velX = 0;
    this.velocityY = 0;
    this.isDead = false;
    this.isJumping = false;
    this.lastWallJump = null;
  }

  move(key) {
    switch (key) {
      case "a":
        this.velX = -this.speed;
        break;
      case "d":
        this.velX = this.speed;
        break;
      case " ":
        if (!this.isJumping) {
          this.velocityY = -20;
          this.isJumping = true;
        } else if (this.onLeftWall && this.lastWallJump !== "left") {
          if (!this.hardMode) {
            this.velocityY = -20;
          } else {
            this.velocityY = -15;
          }
          this.isJumping = true;
          this.gravity = 0.9;
          this.lastWallJump = "left";
        } else if (this.onRightWall && this.lastWallJump !== "right") {
          if (!this.hardMode) {
            this.velocityY = -20;
          } else {
            this.velocityY = -15;
          }
          this.isJumping = true;
          this.gravity = 0.9;
          this.lastWallJump = "right";
        }
        break;
    }
  }

  update(delta, platforms) {
    // Horizontal movement & friction
    let onIce = false;
    let onFloor = false;
    this.onLeftWall = false;
    this.onRightWall = false;

    this.x += this.velX * delta * 60;

    // Horizontal collisions (walls)
    for (const plat of platforms) {
      if (plat.type === "wall") {
        if (
          this.x + this.length > plat.x &&
          this.x < plat.x + plat.width &&
          this.y + this.width > plat.y &&
          this.y < plat.y + plat.height
        ) {
          if (this.velX > 0) {
            this.x = plat.x - this.length;
            this.onRightWall = true;
          } else if (this.velX < 0) {
            this.x = plat.x + plat.width;
            this.onLeftWall = true;
          }
          this.velX = 0;
        }
      }
    }

    // Vertical movement & gravity
    this.y += this.velocityY * delta * 60;
    this.velocityY += this.gravity * delta * 60;

    // --- Platform collisions ---
    for (const plat of platforms) {
      const onTop =
        this.x + this.length > plat.x &&
        this.x < plat.x + plat.width &&
        this.y + this.width >= plat.y &&
        this.y + this.width <=
        plat.y + plat.height + this.velocityY * delta * 60;

      const below =
        this.x + this.length > plat.x &&
        this.x < plat.x + plat.width &&
        this.y >= plat.y + plat.height &&
        this.y + this.velocityY * delta * 60 <= plat.y + plat.height;

      if (plat.type === "floor" && onTop) {
        this.y = plat.y - this.width;
        this.velocityY = 0;
        this.isJumping = false;
        onFloor = true;
      } else if (plat.type === "ice" && onTop) {
        this.y = plat.y - this.width;
        this.velocityY = 0;
        this.isJumping = false;
        onIce = true;
      } else if (below) {
        this.y = plat.y + plat.height;
        this.velocityY = 0;
      }
    }

    if (onIce) {
      this.velX *= 1;
    } else if (onFloor) {
      this.velX *= 0.8; // normal friction
    }
    if (Math.abs(this.velX) < 0.01) this.velX = 0;

    // Death check using world height
    if (this.y >= this.worldHeight) {
      this.isDead = true;
    }
  }

  collides(object) {
    return (
      this.x < object.x + object.width &&
      this.x + this.length > object.x &&
      this.y < object.y + object.height &&
      this.y + this.width > object.y
    );
  }
}

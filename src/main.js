import { Player } from "./Player";
import { Maps } from "./Maps";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const body = document.querySelector("body");
body.style.backgroundColor = "black";

let scale, offsetX, offsetY;
const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;

function updateScale() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  scale = Math.min(canvas.width / GAME_WIDTH, canvas.height / GAME_HEIGHT);
  offsetX = (canvas.width - GAME_WIDTH * scale) / 2;
  offsetY = (canvas.height - GAME_HEIGHT * scale) / 2;
}

updateScale();
window.addEventListener("resize", updateScale);

const maps = new Maps(ctx, GAME_WIDTH, GAME_HEIGHT);
maps.loadMap("Level 1");
const player = new Player(maps.spawn.x, maps.spawn.y, 50, 50, 15);

// handle key inputs
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

let lastTime = 0;
function gameLoop(timestamp) {
  const delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.scale(scale, scale);
  ctx.translate(offsetX, offsetY);

  if (player.isDead) {
    player.respawn(maps);
  } else {
    // Handle input
    if (keys["a"]) player.move("a");
    if (keys["d"]) player.move("d");
    if (keys[" "]) player.move(" ");

    // Physics update
    player.update(delta, maps.platforms, canvas);
  }

  if (player.currMap === "Level 1" && !player.hardMode) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "200px Arial"
    ctx.fillText("Square Game", GAME_WIDTH / 2, GAME_HEIGHT / 2)
    ctx.restore();
  }

  if (player.currMap === "Level 2" && !player.hardMode) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "200px Arial"
    ctx.fillText("By N. Lugo", GAME_WIDTH / 2, GAME_HEIGHT / 2)
    ctx.restore();
  }

  player.draw(ctx);
  maps.drawMap();

  for (const exit of maps.exits) {
    if (player.collides(exit)) {
      if (player.currMap === "Level 11" && !player.hardMode) {
        player.hardMode = true;
        maps.hardMode = true;
      } else if (player.currMap === "Level 11" && player.hardMode) {
        player.hardMode = false;
        maps.hardMode = false;
      }

      maps.loadMap(exit.nextLevel);
      player.currMap = exit.nextLevel;
      player.velocityY = 0;
      player.velX = 0;
      player.isJumping = false;

      if (maps.spawn) {
        player.x = maps.spawn.x;
        player.y = maps.spawn.y;
      }
    }
  }

  if (player.currMap === "Level 11") {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    if (!player.hardMode || !maps.hardMode) {
      ctx.font = "100px Arial";
      ctx.fillText("The End!", GAME_WIDTH / 2, GAME_HEIGHT / 3);

      ctx.font = "50px Arial";
      ctx.fillText("Hard Mode?", GAME_WIDTH / 2 - 30, GAME_HEIGHT - 250);
    } else {
      ctx.font = "100px Arial";
      ctx.fillText("The Official End!", GAME_WIDTH / 2, GAME_HEIGHT / 3);

      ctx.font = "50px Arial";
      ctx.fillText("Restart?", GAME_WIDTH / 2 - 30, GAME_HEIGHT - 250);
    }
    ctx.restore();
  }

  ctx.restore();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

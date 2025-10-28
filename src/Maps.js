import { Exit } from "./Exit";
import { renderStarField } from "./starField";

export class Maps {
  constructor(ctx, worldWidth, worldHeight, hardMode = false) {
    this.ctx = ctx;
    this.width = worldWidth;
    this.height = worldHeight;
    this.exits = [];
    this.platforms = [];
    this.currMap = "Level 1";
    this.spawn = {};
    this.level10Interval = null;
    this.hardMode = hardMode;
  }

  loadMap(mapName) {
    this.exits = [];
    this.platforms = [];
    this.currMap = mapName;

    // Level 1
    if (mapName === "Level 1") {
      this.exits.push(
        new Exit(this.width - 100, this.height / 2 - 53, 50, 50, "Level 2"),
      );

      if (!this.hardMode) {
        this.platforms.push({
          x: 0,
          y: this.height / 2,
          width: this.width,
          height: 3,
          color: "red",
          type: "floor",
        });
      } else {
        this.platforms.push(
          {
            x: 0,
            y: this.height / 2,
            width: 50,
            height: 3,
            color: "red",
            type: "floor",
          },
          {
            x: this.width / 2.5,
            y: this.height / 2,
            width: 50,
            height: 3,
            color: "red",
            type: "floor",
          },
          {
            x: this.width / 1.2,
            y: this.height / 2,
            width: 50,
            height: 3,
            color: "red",
            type: "floor",
          },
        );
      }
      this.spawn = { x: 0, y: this.height / 2 - 53 };
    }

    // Level 2
    if (mapName === "Level 2") {
      this.exits.push(
        new Exit(this.width - 100, this.height / 2 - 50, 50, 50, "Level 3"),
      );

      if (!this.hardMode) {
        this.platforms.push(
          {
            x: 0,
            y: this.height / 2,
            width: this.width / 4,
            height: 3,
            color: "orange",
            type: this.hardMode ? "ice" : "floor",
          },
          {
            x: this.width / 4,
            y: this.height / 2,
            width: 3,
            height: this.height - this.height / 2,
            color: "orange",
            type: "wall",
          },
          {
            x: this.width - this.width / 1.7,
            y: this.height / 2,
            width: 3,
            height: this.height - this.height / 2,
            color: "orange",
            type: "wall",
          },
          {
            x: this.width - this.width / 1.7,
            y: this.height / 2,
            width: this.width / 1.7,
            height: 3,
            color: "orange",
            type: this.hardMode ? "ice" : "floor",
          },
        );
      } else {
        this.platforms.push(
          {
            x: 0,
            y: this.height / 2,
            width: 100,
            height: 3,
            color: "blue",
            type: "ice",
          },
          {
            x: 3,
            y: this.height / 2,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall",
          },
          {
            x: 100,
            y: this.height / 2,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall",
          },
          {
            x: 200,
            y: this.height / 3,
            width: 100,
            height: 3,
            color: "blue",
            type: "ice",
          },
          {
            x: 200,
            y: this.height / 3,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall",
          },
          {
            x: 300,
            y: this.height / 3,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall",
          },
          {
            x: 400,
            y: this.height / 5,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall",
          },
          {
            x: 400,
            y: this.height / 5,
            width: 100,
            height: 3,
            color: "blue",
            type: "ice",
          },
          {
            x: 500,
            y: this.height / 5,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall",
          },
          {
            x: 600,
            y: this.height / 7,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall",
          },
          {
            x: 600,
            y: this.height / 7,
            width: 100,
            height: 3,
            color: "blue",
            type: "ice",
          },
          {
            x: 700,
            y: this.height / 7,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall",
          },
          {
            x: 800,
            y: this.height / 9,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall"
          },
          {
            x: 800,
            y: this.height / 9,
            width: 150,
            height: 3,
            color: "blue",
            type: "ice"
          },
          {
            x: 950,
            y: this.height / 9,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall"
          },
        );
      }

      this.spawn = { x: 0, y: this.height / 2 - 53 };
    }

    // Level 3
    if (mapName === "Level 3") {
      if (!this.hardMode) {
      this.exits.push(
        new Exit(this.width - 100, this.height / 2 - 50, 50, 50, "Level 4"),
      );
      } else {
        this.exits.push(
          new Exit(this.width - 80, this.height - 50, 50, 50, "Level 4")
        )
      }

      this.platforms.push(
        {
          x: 0,
          y: this.height / 2,
          width: this.width / 6,
          height: 3,
          color: this.hardMode ? "blue" : "yellow",
          type: this.hardMode ? "ice" : "floor",
        },
        {
          x: this.width / 2.6,
          y: this.height / 3.3,
          width: this.hardMode ? 100 : this.width / 7,
          height: 3,
          color: this.hardMode ? "blue": "yellow",
          type: this.hardMode ? "ice" : "floor",
        },
      );

      if (this.hardMode) {
        this.platforms.push(
          {
            x: 0,
            y: this.height / 2,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall"
          },
          {
            x: this.width / 6,
            y: this.height / 2,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall"
          },
          {
            x: this.width / 2.6,
            y: this.height / 3.3,
            width: 3,
            height: this.height,
            color: "yellow",
            type: "wall"
          },
          {
            x: this.width / 2.6 + 100,
            y: this.height / 3.3,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall"
          },
          {
            x: this.width - 10,
            y: 0,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall"
          },
          {
            x: this.width - 100,
            y: 50,
            width: 3,
            height: this.height,
            color: "orange",
            type: "wall"
          },
          {
            x: this.width - 200,
            y: 0,
            width: 3,
            height: this.height - 300,
            color: "orange",
            type: "wall"
          },
        )
      }

      this.spawn = { x: 0, y: this.height / 2 - 53 };
    }

    // Level 4
    if (mapName === "Level 4") {
      this.exits.push(new Exit(this.hardMode ? 100 : 0, this.height / 2 + 10, 50, 50, "Level 5"));
      this.platforms.push(
        {
          x: 0,
          y: this.height / 2,
          width: 150,
          height: 5,
          color: "green",
          type: "floor",
        },
        {
          x: 150,
          y: this.height / 2,
          width: 5,
          height: this.hardMode ? 0 : 200,
          color: "green",
          type: "wall",
        },
        {
          x: 0,
          y: 0,
          width: 3,
          height: this.height - this.height / 2,
          color: "green",
          type: "wall",
        },
      );

      if (this.hardMode) {
        this.platforms.push(
          {
            x: 150,
            y: 100,
            width: 3,
            height: this.height / 2 - 100,
            color: "green",
            type: "wall"
          },
          {
            x: 300,
            y: 100,
            width: 3,
            height: this.height,
            color: "green",
            type: "wall"
          }
        )
      }

      this.spawn = { x: 3, y: this.height / 2 - 53 };
    }

    // Level 5
    if (mapName === "Level 5") {
      this.exits.push(
        new Exit(this.width - 45, this.height / 1.5 - 50, 50, 50, "Level 6"),
      );
      this.platforms.push(
        {
          x: 0,
          y: this.height / 2,
          width: 100,
          height: 3,
          color: "black",
          type: "floor",
        },
        {
          x: 0,
          y: this.height - 40,
          width: 100,
          height: 3,
          color: this.hardMode ? "black" : "white",
          type: "",
        },
        {
          x: this.width / 2,
          y: this.height / 1.5,
          width: 100,
          height: 3,
          color: "black",
          type: "floor",
        },
        {
          x: this.width / 2,
          y: this.height - 40,
          width: 100,
          height: 3,
          color: this.hardMode ? "black" : "white",
          type: "",
        },
        {
          x: this.width - 200,
          y: this.height / 1.5,
          width: 200,
          height: 3,
          color: "black",
          type: "floor",
        },
        {
          x: this.width - 200,
          y: this.height - 40,
          width: 200,
          height: 3,
          color: this.hardMode ? "black" : "white",
          type: "",
        },
      );
      this.spawn = { x: 0, y: this.height / 2 - 53 };
    }

    // Level 6
    if (mapName === "Level 6") {
      this.exits.push(
        new Exit(this.width / 5 + 5, this.height / 4 + 5, 50, 50, "Level 7"),
      );

      if (!this.hardMode) {
        this.platforms.push(
          {
            x: 0,
            y: this.height / 2,
            width: 50,
            height: 3,
            color: "red",
            type: "floor"
          }
        )
      }

      this.platforms.push(
        {
          x: this.width / 9,
          y: this.height / 6.5,
          width: 5,
          height: this.height - 800,
          color: this.hardMode ? "red" : "blue",
          type: "wall",
        },
        {
          x: this.width / 5,
          y: this.height / 4,
          width: 5,
          height: this.height - 400,
          color: this.hardMode ? "red" : "blue",
          type: "wall",
        },
        {
          x: this.width / 5,
          y: this.height / 4,
          width: this.hardMode ? 700 : 500,
          height: 3,
          color: this.hardMode ? "red" : "blue",
          type: "floor",
        },
      );
      this.spawn = { x: 0, y: this.height / 2 - 53 };
    }

    // Level 7
    if (mapName === "Level 7") {
      this.exits.push(
        new Exit(this.width - 80, this.height - 90, 50, 50, "Level 8"),
      );

      if (!this.hardMode) {
        this.platforms.push(
                  {
          x: this.width / 3.3,
          y: this.height / 3,
          width: 58,
          height: 3,
          color: "purple",
          type: "floor",
        },
        )
      }

      this.platforms.push(
        {
          x: 0,
          y: 0,
          width: 3,
          height: this.height,
          color: "purple",
          type: "wall",
        },
        {
          x: 0,
          y: this.height / 2,
          width: this.width / 40,
          height: 3,
          color: "purple",
          type: "floor",
        },
        {
          x: this.width / 7,
          y: this.height / 8,
          width: 3,
          height: this.height / 2,
          color: "purple",
          type: "wall",
        },
        {
          x: this.width / 3,
          y: 0,
          width: 3,
          height: this.height / 3,
          color: "purple",
          type: "wall",
        },
        {
          x: this.width / 3,
          y: this.hardMode ? this.height / 2 - 100 : this.height / 2,
          width: 3,
          height: this.hardMode ? this.height : this.height / 3,
          color: "purple",
          type: "wall",
        },
        {
          x: this.hardMode ? this.width / 2 - 100 : this.width / 2,
          y: this.height / 10,
          width: 3,
          height: this.height,
          color: "purple",
          type: "wall",
        },
        {
          x: this.width / 2,
          y: this.height - 40,
          width: this.width,
          height: 5,
          color: "purple",
          type: "floor",
        },
      );
      this.spawn = { x: 3, y: this.height / 2 - 53 };
    }

    // Level 8
    if (mapName === "Level 8") {
      this.exits.push(
        new Exit(
          this.width - this.width / 2.5 + 15,
          this.height - 55,
          50,
          50,
          "Level 9",
        ),
      );
      this.platforms.push(
        {
          x: this.width / 2.3,
          y: 0,
          width: 5,
          height: this.height,
          color: "pink",
          type: "wall",
        },
        {
          x: this.width / 2.3,
          y: this.height - 5,
          width: this.width / 5,
          height: 5,
          color: "pink",
          type: "floor",
        },
        {
          x: this.width - this.width / 2.5,
          y: this.height / 8,
          width: 5,
          height: this.height,
          color: "pink",
          type: "wall",
        },
      );
      this.spawn = { x: this.width / 2, y: this.height - 55 };
    }

    // Level 9
    if (mapName === "Level 9") {
      this.exits.push(
        new Exit(this.width - 50, this.height - 90, 50, 50, "Level 10"),
      );

      if (!this.hardMode) {
        this.platforms.push(
          {
            x: this.width / 2,
            y: this.height / 2 + 200,
            width: 50,
            height: 5,
            color: "white",
            type: "floor"
          }
        )
      }

      this.platforms.push(
        { x: 0, y: 55, width: 55, height: 5, color: "white", type: "floor" },
        { x: 50, y: 0, width: 5, height: 55, color: "white", type: "wall" },
        {
          x: this.width / 1.7,
          y: this.height - 40,
          width: this.width,
          height: 5,
          color: "white",
          type: "floor",
        },
        {
          x: this.width / 1.7,
          y: 0,
          width: 5,
          height: this.height / 1.5 - 10,
          color: "white",
          type: "wall",
        },
        {
          x: this.width / 1.7,
          y: this.height / 1.5 + 60,
          width: 5,
          height: this.height / 4 - 30,
          color: "white",
          type: "wall",
        },
      );

      this.spawn = { x: 0, y: 0 };
    }

    // Level 10
    if (mapName === "Level 10") {
      if (this.level10Interval) clearInterval(this.level10Interval);
      // Random exits appear and disappear
      this.level10Interval = setInterval(() => {
        const exitX = Math.random() * this.width;
        const exitY = Math.random() * this.height;
        const newExit = new Exit(exitX, exitY, 50, 50, "Level 11");
        this.exits.push(newExit);
        setTimeout(() => {
          const index = this.exits.indexOf(newExit);
          if (index > -1) this.exits.splice(index, 1);
        }, 1000);
      }, 1000);

      this.platforms.push(
        {
          x: 0,
          y: 0,
          width: 5,
          height: this.height,
          color: "white",
          type: "wall",
        },
        {
          x: 0,
          y: 0,
          width: this.width,
          height: 5,
          color: "white",
          type: "wall",
        },
        {
          x: this.width - 5,
          y: 0,
          width: 5,
          height: this.height,
          color: "white",
          type: "wall",
        },
        {
          x: 0,
          y: this.height - 5,
          width: this.width,
          height: 5,
          color: "white",
          type: "floor",
        },
      );

      this.spawn = { x: this.width / 2, y: this.height - 55 };
    } else {
      if (this.level10Interval) {
        clearInterval(this.level10Interval);
        this.level10Interval = null;
      }
    }

    // End game
    if (mapName === "Level 11") {
      const starCanvas = document.getElementById("stars");
      const starCtx = starCanvas.getContext("2d");
      starCanvas.width = window.innerWidth;
      starCanvas.height = window.innerHeight;

      const starScale = Math.min(
        starCanvas.width / 1920,
        starCanvas.height / 1080,
      );
      const starOffsetX = (starCanvas.width / starScale - 1920) / 2;
      const starOffsetY = (starCanvas.height / starScale - 1080) / 2;

      renderStarField(starCtx, 1920, 1080, starScale, starOffsetX, starOffsetY);

      this.exits.push(
        new Exit(this.width / 2 - 50, this.height - 200, 50, 50, "Level 1"),
      );

      this.platforms.push({
        x: this.width / 2 - 50,
        y: this.height / 2,
        width: 50,
        height: 3,
        color: "white",
        type: "floor",
      });

      this.spawn = { x: this.width / 2 - 50, y: this.height / 2 - 55 };
    }
  }

  drawMap() {
    for (const plat of this.platforms) {
      this.ctx.fillStyle = plat.color;
      this.ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    }

    for (const exit of this.exits) {
      exit.draw(this.ctx);
    }
  }
}

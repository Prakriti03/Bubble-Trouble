import { CANVAS_DIMENSIONS } from "./constants";
import { Player } from "./components/Player";
import { Movement } from "./utils/enum";
import bgImage from "/background.png";
import { Bubble } from "./components/Bubble";
import { Ground } from "./components/Ground";
import { GameState } from "./utils/enum";
import { Arrow } from "./components/Arrow";
// import { collisionDetection } from "./utils/utils";

export class GameManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player?: Player;
  x: number;
  y: number;
  bgImage: CanvasImageSource;
  bubble ?: Bubble;
  ground?: Ground;
  gameState: GameState;
  bubblePlayerDx?: number;
  bubblePlayerDy?: number;
  bubblePlayerDistance?: number;
  bubbleArrowDx?: number;
  bubbleArrowDy?: number;
  bubbleArrowDistance ?: number;
  arrow?: Arrow;
  arrowActive : boolean;
  numberOfBubbles: number;
  bubbleRadius: number;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
    this.canvas.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT;

    this.x = 0;
    this.y = 0;

    this.bgImage = new Image();
    this.bgImage.src = bgImage;

    this.gameState = GameState.RUNNING;

    this.numberOfBubbles = 1;
    this.bubbleRadius = 40;

    this.arrowActive = false;

    this.initialSetup();
    this.start();

    //when the arrow keys are pressed
    document.addEventListener("keydown", (key) => {
      if (key.code === "ArrowLeft") {
        this.player!.movement = Movement.LEFT;
      }
      if (key.code === "ArrowRight") {
        this.player!.movement = Movement.RIGHT;
      }
    });

    //when the arrow keys are released
    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        this.player!.movement = Movement.STATIONARY;
      }
    });

    document.addEventListener("keydown", (key) => {
      if (key.code === "Space") {
        this.arrow = new Arrow(this.ctx, this.player!.posX);
      }
    });

  }

  //initializes components
  initialSetup() {
    this.player = new Player(this.ctx);
    this.bubble = new Bubble(this.ctx, this.numberOfBubbles, this.bubbleRadius);
    this.ground = new Ground(this.ctx);
  }

  // to draw player, bubbles and power ups
  draw() {
    switch (this.gameState) {
      case GameState.RUNNING:
        this.runningStateRender();
        break;
      case GameState.END:
        this.endGameStateRender();
        break;
    }
  }

  runningStateRender() {
    this.ctx.clearRect(
      this.x,
      this.y,
      CANVAS_DIMENSIONS.CANVAS_WIDTH,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT
    ); //running game state

    this.ctx.drawImage(
      this.bgImage,
      this.x,
      this.y,
      this.canvas.width,
      this.canvas.height
    );
    //draw player
    this.player?.draw();

    //draw bubbles
    this.bubble?.draw();

    //draw ground
    this.ground?.draw();

    //draw arrow
    this.arrow?.draw();   
  }

  //Checks collision between arrow & bubbles, bubbles & player
  checkCollision() {
    //get distance between center of bubble and player
    this.bubblePlayerDx = this.bubble!.centerX - this.player!.posX;
    this.bubblePlayerDy = this.bubble!.centerY - this.player!.posY;
    this.bubblePlayerDistance = Math.sqrt(
      this.bubblePlayerDx * this.bubblePlayerDx +
        this.bubblePlayerDy * this.bubblePlayerDy
    );

    //check collision between bubble and player
    if (this.bubblePlayerDistance <= this.bubble!.radius) {
      this.endGameStateRender();
    }

 
  }
 

  endGameStateRender() {
    this.gameState = GameState.END;
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(100, 100, 100, 100);
  }

  update() {
    if (this.gameState !== GameState.RUNNING) return;
    this.player?.update();

    //change the direction of bubbble bouncing
    if (
      this.bubble!.centerY + this.bubble!.radius >= this.ground!.posY ||
      this.bubble!.centerY < 100
    ) {
      this.bubble?.resetDy();
    }
    if (
      this.bubble!.centerX + this.bubble!.radius >= this.canvas.width ||
      this.bubble!.centerX - this.bubble!.radius <= 0
    ) {
      this.bubble?.resetDx();
    }

    this.bubble?.update();
    this.arrow?.update();
  }

  start() {
    this.draw();
    this.checkCollision();
    this.update();
    this.start = this.start.bind(this);
    requestAnimationFrame(this.start);
  }
}

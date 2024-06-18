import { CANVAS_DIMENSIONS } from "./constants";
import { Player } from "./components/Player";
import { Movement } from "./utils/enum";
import bgImage from "/background.png";
import { Bubble } from "./components/Bubble";
import { Ground } from "./components/Ground";
import { GameState } from "./utils/enum";
import { Arrow } from "./components/Arrow";
import { BUBBLE_RADIUS } from "./constants";

export class GameManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player?: Player;
  x: number;
  y: number;
  bgImage: CanvasImageSource;
  bubble?: Bubble;
  ground?: Ground;
  gameState: GameState;
  bubblePlayerDx?: number;
  bubblePlayerDy?: number;
  bubblePlayerDistance?: number;
  bubbleArrowDx?: number;
  bubbleArrowDy?: number;
  bubbleArrowDistance?: number;
  arrow?: Arrow;
  arrowActive: boolean;
  numberOfBubbles: number;
  bubbleRadius: number;
  tempMovement?: Movement;
  isBubbleArrowCollisionTrue?: boolean[];
  // isPlayerBubbleCollisionTrue?: boolean;
  bubbleArray?: Bubble[];
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
    this.bubbleRadius = BUBBLE_RADIUS;

    this.bubbleArray = [];

    this.arrowActive = false;

    this.tempMovement = Movement.STATIONARY;

    this.initialSetup();
    this.start();

    //when the arrow keys are pressed
    document.addEventListener("keydown", (key) => {
      if (key.code === "ArrowLeft") {
        this.player!.movement = Movement.LEFT;
        this.tempMovement = Movement.LEFT;
      }
      if (key.code === "ArrowRight") {
        this.player!.movement = Movement.RIGHT;
        this.tempMovement = Movement.RIGHT;
      }
    });

    //when the arrow keys are released
    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        this.player!.movement = Movement.STATIONARY;
        this.tempMovement = Movement.STATIONARY;
      }
    });

    //when space key is pressed for arrows
    document.addEventListener("keydown", (key) => {
      if (key.code === "Space") {
        // Bubble.bubbleArray.forEach((bubble) => {
        //   bubble.isHittable = true; //one arrow can only shoot bubble once
        // });
        this.arrow = new Arrow(this.ctx, this.player!.posX);
        this.arrow.isHittable = true;
        this.player!.movement = Movement.STATIONARY;
      }
    });
    document.addEventListener("keyup", (key) => {
      if (key.code === "Space") {
        this.player!.movement = this.tempMovement;
      }
    });
  }

  //initializes components
  initialSetup() {
    this.player = new Player(this.ctx);
    this.bubble = new Bubble(this.ctx, this.numberOfBubbles, this.bubbleRadius);
    this.ground = new Ground(this.ctx);
    this.bubbleArray!.push(this.bubble);
    Bubble.bubbleArray = this.bubbleArray!;
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

    //draw arrow
    this.arrow?.draw();

    //draw player
    this.player?.draw();

    //draw bubbles
    this.bubbleArray!.forEach((bubble) => {
      console.log(`${Bubble.bubbleArray.length}`);
      bubble.draw(bubble.centerX, bubble.centerY);
    });

    //draw ground
    this.ground?.draw();
    if(this.bubbleArray?.length==0){
      this.waitingStateRender();
    }
  }

  waitingStateRender(){
    this.gameState = GameState.WAITING;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(100, 100, 100, 100);
  }

  //Checks collision between arrow & bubbles, bubbles & player
  checkCollision() {
    this.bubbleArray!.forEach((bubble) => {
      //check collision between player and bubble
      bubble.checkCollision(
        this.player!.posX,
        this.player!.posY,
        bubble.centerX,
        bubble.centerY,
        bubble.radius
      );

      if (bubble.isPlayerBubbleCollisionTrue) {
        this.endGameStateRender();
      }
    });

    //check collision between bubble and arrow
    this.bubbleArray!.forEach((bubble) => {
      bubble.isBubbleArrowCollisionTrue = this.arrow?.checkCollision(
        bubble.centerX,
        bubble.centerY,
        bubble.radius
      );
    });
  }

  endGameStateRender() {
    this.gameState = GameState.END;
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(100, 100, 100, 100);
  }

  update() {

    this.player?.update();

    if (this.gameState !== GameState.RUNNING) return;
    
    //arrow splits bubbles
    this.bubbleArray!.forEach((bubble, index) => {
      if (
        bubble.isBubbleArrowCollisionTrue &&
        this.arrow!.isHittable &&
        this.arrow!.isActive
      ) {
        if (bubble.radius<10){
          this.bubbleArray?.splice(index, 1);

        }
        else{

          bubble.splitBubbles()!;

        }
        this.arrow!.isActive = false;
        this.arrow!.isHittable = false;
      }
    });

    this.bubbleArray!.forEach((bubble) => {
      //change the direction of bubbble bouncing


      bubble.update();
    });

    this.arrow?.update();
  }

  start() {
    this.update();
    this.draw();
    this.checkCollision();
    this.start = this.start.bind(this);
    requestAnimationFrame(this.start);
  }
}

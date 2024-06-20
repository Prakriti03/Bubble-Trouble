import {  CANVAS_DIMENSIONS } from "./constants";
import { Player } from "./components/Player";
import { Movement } from "./utils/enum";
import { Bubble } from "./components/Bubble";
import {  GroundWalls } from "./components/Ground";
import { GameState } from "./utils/enum";
import { Arrow } from "./components/Arrow";
import { LevelLoader } from "./LevelLoader";
import { Wall } from "./components/Wall";

export class GameManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player?: Player;
  x: number;
  y: number;
  bgImage: CanvasImageSource;
  bubble?: Bubble;
  ground?: GroundWalls;
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
  bubbleRadius ?: number;
  tempMovement?: Movement;
  isBubbleArrowCollisionTrue?: boolean[];
  bubbleArray?: Bubble[];
  levelLoader : LevelLoader;
  timeLimit : number;
  elapsedTime : number;
  startTime : number;
  timeRemaining : number;
  level : number;
  wall ?: Wall;
  isWallPresent : boolean = false;
  isBubbleToWallRight : boolean = false ;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
    this.canvas.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT;

    this.levelLoader = new LevelLoader(this);

    this.x = 0;
    this.y = 0;

    this.gameState = GameState.RUNNING;
    this.bgImage = new Image();
    
    // this.bgImage.src = bgImage;
    this.numberOfBubbles = 1;
    // this.bubbleRadius = BUBBLE_RADIUS;

    this.bubbleArray = [];

    this.arrowActive = false;

    this.tempMovement = Movement.STATIONARY;

    this.timeLimit = 40 * 1000 ; // 40 seconds
    this.startTime = Date.now();
    this.timeRemaining = this.timeLimit;
    this.elapsedTime = 0;

    this.level = 1;
    this.levelLoader.loadLevel(0);  //start with level 0
    
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
    this.ground = new GroundWalls(this.ctx);

    //change the number during custom mapping
    this.wall = new Wall(this.ctx, 0,0,13,14); 

    Bubble.bubbleArray = this.bubbleArray!;
  }

  // to draw player, bubbles and power ups
  draw() {
    switch (this.gameState) {
      case GameState.RUNNING:
        this.runningStateRender();
        this.drawTimer();
        break;
      case GameState.END:
        this.endGameStateRender();
        break;
    }
  }
  
  drawTimer() {
    const minutes = Math.floor(this.timeRemaining / 60000);
    const seconds = Math.floor((this.timeRemaining % 60000) / 1000);
    const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(timeString, this.canvas.width - 100, 50);
  }
  resetTimer() {
    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.timeRemaining = this.timeLimit;
  }
  
  runningStateRender() {
    // this.levelOne?.draw();
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

    
    //draw default walls
    this.wall?.drawDefaultWalls();
    
    //draw ground
    this.ground?.draw(this.level);

    //draw walls in between if present
    if(this.isWallPresent){
      this.wall?.drawExtraWalls();
    }
    if(this.bubbleArray?.length==0){
      // this.waitingStateRender();
      this.level+=1;
      this.levelLoader.loadNextLevel();
    }
  }

  waitingStateRender() {
    this.gameState = GameState.WAITING;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(100, 100, 100, 100);
    this.levelLoader.loadNextLevel();
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
        this.gameState = GameState.END;
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
    
    if (this.gameState !== GameState.RUNNING) return;

    this.elapsedTime = Date.now() - this.startTime;
    this.timeRemaining = this.timeLimit - this.elapsedTime;

    if(this.timeRemaining<= 0){
      this.gameState = GameState.END;
      this.endGameStateRender();
    }

    this.player?.update(this.isWallPresent);

    //arrow splits bubbles
    this.bubbleArray!.forEach((bubble, index) => {
      if (
        bubble.isBubbleArrowCollisionTrue &&
        this.arrow!.isHittable &&
        this.arrow!.isActive
      ) {
        if (bubble.radius < 10) {
          this.bubbleArray?.splice(index, 1);
        } else {
          bubble.splitBubbles()!;
        }
        this.arrow!.isActive = false;
        this.arrow!.isHittable = false;
      }
    });

    this.bubbleArray!.forEach((bubble) => {
      //change the direction of bubbble bouncing

      bubble.update(this.isWallPresent, this.isBubbleToWallRight);
    });

    this.arrow?.update();
  }

  start() {
    this.checkCollision();
    this.update();
    this.draw();
    this.start = this.start.bind(this);
    requestAnimationFrame(this.start);
  }
}

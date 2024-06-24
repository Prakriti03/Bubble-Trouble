import { Player } from "./components/Player";
import { Bubble } from "./components/Bubble";
import { GroundWalls } from "./components/Ground";
import { Arrow } from "./components/Arrow";
import { Wall } from "./components/Wall";
import { LevelLoader } from "./LevelLoader";
import { CANVAS_DIMENSIONS, GROUND_HEIGHT, WALL_WIDTH } from "./constants";
import { Movement } from "./utils/enum";
import { GameState } from "./utils/enum";
import { PowerUp } from "./components/Power-ups";
import { getRandomInt } from "./utils/utils";
import { checkCollision } from "./utils/utils";
import { Score } from "./components/Score";

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
  bubbleRadius?: number;
  tempMovement?: Movement;
  isBubbleArrowCollisionTrue?: boolean[];
  static bubbleArray?: Bubble[];
  levelLoader: LevelLoader;
  timeLimit: number;
  elapsedTime: number;
  startTime: number;
  timeRemaining: number;
  level?: number;
  wall?: Wall;
  isWallPresent: boolean = false;
  isBubbleToWallRight: boolean = false;
  customLevelConfig: any;
  powerUp?: PowerUp | null;
  powerUpOption ?: number;
  isCollisionPlayerPowerUp : boolean = false;
  score ?: Score;
  powerUpArray : PowerUp[]=[];

  constructor(canvas: HTMLCanvasElement, customLevelConfig?: any) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
    this.canvas.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT;

    this.levelLoader = new LevelLoader(this);

    this.x = 0;
    this.y = 0;

    this.gameState = GameState.RUNNING;
    this.bgImage = new Image();

    this.numberOfBubbles = 1;

    GameManager.bubbleArray = [];

    this.arrowActive = false;

    this.tempMovement = Movement.STATIONARY;

    this.timeLimit = 40 * 1000; 
    this.startTime = Date.now();
    this.timeRemaining = this.timeLimit;
    this.elapsedTime = 0;


    this.customLevelConfig = customLevelConfig;

    if (this.customLevelConfig) {
      this.levelLoader.levels.push(this.customLevelConfig);
      this.levelLoader.loadLevel(this.levelLoader.levels.length - 1);
    }
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
    this.wall = new Wall(
      this.ctx,
      (CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH) / 2,
      0,
      WALL_WIDTH / 2,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT
    );
    console.log(`${this.wall!.height}`);

    this.score = new Score(this.ctx)
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

    //draw power-ups
    this.powerUpArray.forEach(powerUp => powerUp.draw());

    //draw bubbles
    GameManager.bubbleArray!.forEach((bubble) => {
      console.log(`${GameManager.bubbleArray!.length}`);
      bubble.draw(bubble.centerX, bubble.centerY);
    });

    //draw default walls
    this.wall?.drawDefaultWalls(); //remove them from animation to stop recursion

    //draw ground
    this.ground?.draw(); //same as above

    //draw walls in between if present
    if (this.isWallPresent) {
      this.wall?.drawExtraWalls();
    }

    this.drawTimer();

    if (GameManager.bubbleArray?.length == 0) {
      // this.waitingStateRender();
      this.levelLoader.loadNextLevel();
    }

    this.score?.draw();
  }
  drawTimer() {
    // if (this.isCollisionPlayerPowerUp) {
    //   this.timeRemaining += 10000; 
    //   // this.powerUp = undefined;
    //   console.log(`time remaining!!! : ${this.timeRemaining}`)
    // }
    console.log(`time reamining inside drawTime !!1 : ${this.timeRemaining}`)
    const minutes = Math.floor(this.timeRemaining / 60000);
    const seconds = Math.floor((this.timeRemaining % 60000) / 1000);
    const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(timeString, this.canvas.width - 100, 50);
  }
  resetTimer() {
    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.timeRemaining = this.timeLimit;
  }

  waitingStateRender() {
    this.gameState = GameState.WAITING;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(100, 100, 100, 100);
    this.levelLoader.loadNextLevel();
  }

  //Checks collision between arrow & bubbles, bubbles & player
  checkCollision() {
    //check collision between player and bubble
    GameManager.bubbleArray!.forEach((bubble) => {
      //closest X-coordinate of player to the bubble
      const closestX = Math.max(
        this.player!.posX,
        Math.min(bubble.x, this.player!.posX + this.player!.width)
      );
      //closest Y-coordinate of player to the bubble
      const closestY = Math.max(
        this.player!.posY,
        Math.min(bubble.y, this.player!.posY + this.player!.height)
      );

      //distance between player and bubble
      const distanceX = bubble.x - closestX;
      const distanceY = bubble.y - closestY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance <= bubble.r) {
        this.gameState = GameState.END;
        this.endGameStateRender();
      }
    });

    //check collision between bubble and arrow
    GameManager.bubbleArray!.forEach((bubble) => {
      bubble.isBubbleArrowCollisionTrue = this.arrow?.checkCollision(
        bubble.centerX,
        bubble.centerY,
        bubble.radius
      );
    });

    //check collision between player and power-ups
    this.powerUpArray.forEach((powerUp, index)=>{
      if (checkCollision(
        this.player!.posX,
        this.player!.posY,
        this.player!.width,
        this.player!.height,
        powerUp.posX,
        powerUp.posY,
        powerUp.width,
        powerUp.height
      )){
        this.isCollisionPlayerPowerUp = true;
        this.handlePowerUpCollision(powerUp, index);
      }
    })
    
  }
  handlePowerUpCollision(powerUp: PowerUp, index: number) {
    if (powerUp.powerUpOption == 1) {
      this.score?.increment();
    }
  
    // Remove the power-up from the array
    this.powerUpArray.splice(index, 1);
  }

  endGameStateRender() {
    this.gameState = GameState.END;
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(100, 100, 100, 100);
  }

  update() {
    this.powerUpArray.forEach(powerUp => powerUp.update());

    if (this.gameState !== GameState.RUNNING) return;

    this.elapsedTime = Date.now() - this.startTime;
    this.timeRemaining = this.timeLimit - this.elapsedTime;

    if (this.timeRemaining <= 0) {
      this.gameState = GameState.END;
      this.endGameStateRender();
    }

    if (this.wall!.height <= 0) {
      this.isWallPresent = false;
    }

    this.player?.update(this.isWallPresent);

    //arrow splits bubbles
    GameManager.bubbleArray!.forEach((bubble, index) => {
      if (
        bubble.isBubbleArrowCollisionTrue &&
        this.arrow!.isHittable &&
        this.arrow!.isActive
      ) {
        if (bubble.radius < 10) {
          GameManager.bubbleArray?.splice(index, 1);
        } else {
          this.powerUpOption = getRandomInt(0,3)
          bubble.splitBubbles()!;
          this.powerUpArray.push( new PowerUp(
            this.ctx,
            bubble.centerX,
            bubble.centerY,
            this.powerUpOption
          ));
        }
        this.arrow!.isActive = false;
        this.arrow!.isHittable = false;
        this.score?.increment();
      }
    });

    GameManager.bubbleArray!.forEach((bubble) => {
      //change the direction of bubbble bouncing

      bubble.update(this.isWallPresent);
    });

    this.arrow?.update();

    this.checkBubblesOnPlayerSide();

    this.wall?.update();

    // if (this.isCollisionPlayerPowerUp) {
    //   this.timeRemaining += 10000; 
    // }
  }
  checkBubblesOnPlayerSide() {
    let allBubblesPopped = true;
    for (let bubble of GameManager.bubbleArray!) {
      //check if bubbles are present on the left side of the wall
      if (bubble.centerX <= this.wall!.posX) {
        allBubblesPopped = false;
        break;
      }
    }
    if (allBubblesPopped) {
      this.wall?.startDisappearing();
    }
  }

  start() {
    this.checkCollision();
    this.update();
    this.draw();
    this.start = this.start.bind(this);
    requestAnimationFrame(this.start);
  }
}

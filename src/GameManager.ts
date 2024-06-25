import { Player } from "./components/Player";
import { Bubble } from "./components/Bubble";
import { GroundWalls } from "./components/Ground";
import { Arrow } from "./components/Arrow";
import { Wall } from "./components/Wall";
import { LevelLoader } from "./LevelLoader";
import { CANVAS_DIMENSIONS, WALL_WIDTH } from "./constants";
import { Movement } from "./utils/enum";
import { GameState } from "./utils/enum";
import { PowerUp } from "./components/Power-ups";
import { getRandomInt } from "./utils/utils";
import { checkCollision } from "./utils/utils";
import { Score } from "./components/Score";
import playerCollideAudioSrc from "/punch-audio.mp3";
import { Lives } from "./Lives";
import arrowAudioSrc from "/Harpoon-audio.mp3";
import splitAudioSrc from "/pop-audio.mp3";
import wallSlideAudioSrc from "/Sliding-audio.mp3";
import gameOverImgSrc from "/game-over.png";

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
  static bubbleArray: Bubble[] = [];
  levelLoader: LevelLoader;
  timeLimit: number;
  elapsedTime: number;
  startTime: number;
  timeRemaining: number;
  adjustedTime: number;
  level: number = 1;
  wall?: Wall;
  isWallPresent: boolean = false;
  customLevelConfig: any;
  powerUp?: PowerUp | null;
  powerUpOption?: number;
  isCollisionPlayerPowerUp: boolean = false;
  score?: Score;
  powerUpArray: PowerUp[] = [];
  static wallSlidingSound: HTMLAudioElement;
  static punchAudio: HTMLAudioElement;
  life?: Lives;
  isPlayerHit: boolean = false;
  players: Player[] = [];
  static walls: Wall[] = [];
  gameOverImg: HTMLImageElement;

  constructor(
    canvas: HTMLCanvasElement,
    numberOfPlayers: number,
    customLevelConfig?: any
  ) {
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

    // GameManager.bubbleArray = [];

    this.arrowActive = false;

    this.tempMovement = Movement.STATIONARY;

    this.timeLimit = 40 * 1000;
    this.startTime = Date.now();
    this.timeRemaining = this.timeLimit;
    this.elapsedTime = 0;
    this.adjustedTime = 0;

    this.customLevelConfig = customLevelConfig;

    GameManager.wallSlidingSound = new Audio(wallSlideAudioSrc);
    GameManager.wallSlidingSound.loop = false;
    GameManager.punchAudio = new Audio(playerCollideAudioSrc);
    GameManager.punchAudio.loop = false;

    //need to do this in initialSetUp (cannot do so because of event listeners)
    for (let i = 0; i < numberOfPlayers; i++) {
      this.player = new Player(this.ctx, i, 5, 0);
      this.players.push(this.player);
    }

    if (this.customLevelConfig) {
      this.levelLoader.levels.push(this.customLevelConfig);
      this.levelLoader.loadLevel(this.levelLoader.levels.length - 1);
    }

    this.gameOverImg = new Image();
    this.gameOverImg.src = gameOverImgSrc;

    this.initialSetup();
    this.start();

    document.addEventListener("keydown", (key) => {
      this.players.forEach((player) => {
        if (key.code === player.controls!.left) {
          player.movement = Movement.LEFT;
          player.tempMovement = Movement.LEFT;
        }
        if (key.code === player.controls!.right) {
          player.movement = Movement.RIGHT;
          player.tempMovement = Movement.RIGHT;

          // obj.right = true;
        }
      });
    });
    // const obj = {right:false, }

    // while(true){

    // }

    document.addEventListener("keyup", (e) => {
      this.players.forEach((player) => {
        if (
          e.code === player.controls!.left ||
          e.code === player.controls!.right
        ) {
          player.movement = Movement.STATIONARY;
          player.tempMovement = Movement.STATIONARY;
        }
      });
    });

    document.addEventListener("keydown", (key) => {
      this.players.forEach((player) => {
        if (key.code === player.controls!.shoot) {
          const arrowSound = new Audio(arrowAudioSrc);
          arrowSound.play();
          this.arrow = new Arrow(this.ctx, player.posX);
          this.arrow.isHittable = true;
          player.movement = Movement.STATIONARY;
        }
      });
    });
    document.addEventListener("keyup", (key) => {
      this.players.forEach((player) => {
        if (key.code === player.controls!.shoot) {
          player.movement = player.tempMovement;
        }
      });
    });
  }

  //initializes components
  initialSetup() {
    // this.player = new Player(this.ctx);
    this.ground = new GroundWalls(this.ctx, this.level!);

    //change the number during custom mapping
    this.wall = new Wall(
      this.ctx,
      (CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH) / 2
    );

    this.score = new Score(this.ctx);
    this.life = new Lives(this.ctx);
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
    this.players.forEach((player) => player.draw());

    //draw power-ups
    this.powerUpArray.forEach((powerUp) => powerUp.draw());

    //draw bubbles
    GameManager.bubbleArray!.forEach((bubble) => {
      bubble.draw(bubble.centerX, bubble.centerY);
    });

    //draw default walls
    this.wall?.drawDefaultWalls(); //remove them from animation to stop recursion

    //draw ground
    this.ground!.draw(); //same as above

    //draw walls in between if present
    // if (this.isWallPresent) {
    //   this.wall?.drawExtraWalls();
    // }
    GameManager.walls.forEach((wall) => {
      wall.drawExtraWalls();
    });

    this.drawTimer();

    if (GameManager.bubbleArray?.length == 0) {
      // this.waitingStateRender();
      this.levelLoader.loadNextLevel();
    }

    this.players.forEach((player, index) => {
      this.score?.draw(player.score, index);
      this.life?.draw(player.life, index);
    });
  }
  drawTimer() {
    const minutes = Math.floor(this.timeRemaining / 60000);
    const seconds = Math.floor((this.timeRemaining % 60000) / 1000);
    const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(timeString, this.canvas.width - 100, 50);
  }
  resetTimer() {
    this.adjustedTime = 0;
    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.timeRemaining = this.timeLimit;
  }


  //Checks collision between arrow & bubbles, bubbles & player
  checkCollision() {
    if (this.gameState !== GameState.RUNNING) return;
    //check collision between player and bubble
    GameManager.bubbleArray!.forEach((bubble) => {
      this.players.forEach((player) => {
        //closest X-coordinate of player to the bubble
        const closestX = Math.max(
          player.posX,
          Math.min(bubble.x, player.posX + player.width)
        );
        //closest Y-coordinate of player to the bubble
        const closestY = Math.max(
          player.posY,
          Math.min(bubble.y, player.posY + player.height)
        );

        //distance between player and bubble
        const distanceX = bubble.x - closestX;
        const distanceY = bubble.y - closestY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        if (distance <= bubble.r) {
          GameManager.punchAudio.play();

          this.resetGame(player);
        }
      });
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
    this.powerUpArray.forEach((powerUp, index) => {
      this.players.forEach((player) => {
        if (
          checkCollision(
            player.posX,
            player.posY,
            player.width,
            player.height,
            powerUp.posX,
            powerUp.posY,
            powerUp.width,
            powerUp.height
          )
        ) {
          this.isCollisionPlayerPowerUp = true;
          this.handlePowerUpCollision(powerUp, index, player);
        }
      });
    });
  }
  handlePowerUpCollision(powerUp: PowerUp, index: number, player: Player) {
    if (powerUp.powerUpOption == 1) {
      player.incrementScore();
    } else if (powerUp.powerUpOption == 2) {
      // Arrow.isSticky = true;\
      player.activateStickyArrow();
    } else {
      this.adjustedTime -= 10000;
    }
    // Remove the power-up from the array
    this.powerUpArray.splice(index, 1);
  }

  endGameStateRender() {
    this.gameState = GameState.END;
    this.ctx.drawImage(
      this.gameOverImg,
      CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 100,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2 - 200
    );
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  update() {
    if (this.gameState !== GameState.RUNNING) return;

    this.powerUpArray.forEach((powerUp) => powerUp.update());

    this.elapsedTime = Date.now() - this.startTime;
    this.timeRemaining = this.timeLimit - this.elapsedTime - this.adjustedTime;

    if (this.timeRemaining <= 0) {
      this.gameState = GameState.END;
      // this.endGameStateRender();
    }

    GameManager.walls.forEach((wall) => {
      if (wall.height <= 0) {
        this.isWallPresent = false; //
      }
    });

    this.players.forEach((player) => player.update());

    //arrow splits bubbles
    GameManager.bubbleArray!.forEach((bubble, index) => {
      this.players.forEach((player) => {
        if (
          bubble.isBubbleArrowCollisionTrue &&
          this.arrow!.isHittable &&
          this.arrow!.isActive
        ) {
          const bubblePopSound = new Audio(splitAudioSrc);
          bubblePopSound.play();
          if (bubble.radius < 10) {
            GameManager.bubbleArray?.splice(index, 1);
          } else {
            this.powerUpOption = getRandomInt(0, 3);
            bubble.splitBubbles()!;
            this.powerUpArray.push(
              new PowerUp(
                this.ctx,
                bubble.centerX,
                bubble.centerY,
                this.powerUpOption
              )
            );
          }
          this.arrow!.isActive = false;
          this.arrow!.isHittable = false;
          player.incrementScore();
        }
      });
    });

    GameManager.bubbleArray!.forEach((bubble) => {
      //change the direction of bubbble bouncing

      bubble.update();
    });

    this.arrow?.update();

    this.checkBubblesOnPlayerSide();

    GameManager.walls.forEach((wall) => {
      wall.update();
    });
  }
  //to restart the game when a player loses life
  resetGame(player: Player) {
    GameManager.bubbleArray = [];
    this.players.forEach((player) => {
      player.posX = player.initialPosX;
    });

    this.powerUpArray = [];

    this.wall = new Wall(
      this.ctx,
      (CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH) / 2
    );
    this.levelLoader.loadLevel(this.level! - 1);

    this.resetTimer();

    player.updateLives();
    if (this.player!.life === 0) {
      this.gameState = GameState.END;
      this.endGameStateRender();
    }
  }
  checkBubblesOnPlayerSide() {
    var allBubblesPopped = true;
    for (let bubble of GameManager.bubbleArray) {
      //check if bubbles are present on the left side of the wall

      if (GameManager.walls[0] && bubble.centerX <= GameManager.walls[0].posX) {
        // console.log(GameManager.walls[0])
        allBubblesPopped = false;
        break;
      }
    }
    if (allBubblesPopped && GameManager.walls[0]) {
      if (GameManager.walls[0].height <= 0) {
        return;
      }
      GameManager.wallSlidingSound.play();
      // wallSlidingSound.loop = false;
      GameManager.walls[0].startDisappearing();
      GameManager.walls.shift();
    }
  }

  start() {
    if (!(this.gameState == GameState.RUNNING)) {
      return;
    }
    this.checkCollision();
    this.update();
    this.draw();
    this.start = this.start.bind(this);
    requestAnimationFrame(this.start);
  }
}

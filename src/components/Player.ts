import { PLAYER_DIMENSIONS, WALL_WIDTH } from "../constants";
import { CANVAS_DIMENSIONS } from "../constants";
import { GROUND_HEIGHT } from "../constants";
import { Movement } from "../utils/enum";
import { Sprite } from "../Sprite";
import heroImage from "/hero.png";
import { GameManager } from "../GameManager";

export class Player {
  heroImage: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  posX !: number;
  posY: number;
  movement?: Movement;
  dx: number;
  playerWidth: number;
  playerHeight: number;
  spriteWidth: number;
  spriteHeight: number;
  frameX: number;
  frameY: number;
  gameFrame: number;
  staggerFrame: number;
  sprite!: Sprite;
  controls ?: { left: string, right: string, shoot: string };
  tempMovement ?: Movement;
  life : number ;
  score : number ;
  powerUps : number[];

  constructor(ctx: CanvasRenderingContext2D, playerIndex : number, initialLife : number, initialScore: number) {
    this.heroImage = new Image();
    this.heroImage.src = heroImage;
    this.ctx = ctx;
    this.playerHeight = PLAYER_DIMENSIONS.PLAYER_HEIGHT;
    this.playerWidth = PLAYER_DIMENSIONS.PLAYER_WIDTH;
    this.posY =
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - this.playerHeight - GROUND_HEIGHT;
    this.dx = 3;
    this.movement = Movement.STATIONARY;
    this.spriteWidth = 47.25;
    this.spriteHeight = 56;
    this.frameX = 0;
    this.frameY = 0;
    this.gameFrame = 0;
    this.staggerFrame = 20;
    this.life = initialLife;
    this.score = initialScore;
    this.powerUps = [];

    // Set controls based on player index
    if (playerIndex === 0) {
      this.controls = { left: "ArrowLeft", right: "ArrowRight", shoot: "Space" };
      this.posX = WALL_WIDTH
    } else if (playerIndex === 1) {
      this.controls = { left: "KeyA", right: "KeyD", shoot: "KeyW" };
      this.posX = CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH - this.playerWidth;
    }

    // this.posX = playerIndex === 0 ? WALL_WIDTH : WALL_WIDTH+this.playerWidth+30;

    
  }

  get x() {
    return this.posX;
  }

  get y() {
    return this.posY;
  }

  get width(){
    return this.playerWidth;
  }

  get height(){
    return this.playerHeight;
  }

  draw() {
    this.ctx.beginPath();
    if (this.movement === Movement.STATIONARY) {
      this.sprite = new Sprite(
        this.ctx,
        heroImage,
        8,
        112,
        this.posX,
        this.posY
      );
    }

    if (this.movement === Movement.LEFT) {
      this.sprite = new Sprite(
        this.ctx,
        heroImage,
        this.frameX * this.spriteWidth,
        57,
        this.posX,
        this.posY
      );
      if (this.gameFrame % this.staggerFrame == 0) {
        if (this.frameX < 3) this.frameX++;
        else this.frameX = 0;
      }
      this.gameFrame++;
    }
    if (this.movement === Movement.RIGHT) {
      this.sprite = new Sprite(
        this.ctx,
        heroImage,
        this.frameX * this.spriteWidth,
        0,
        this.posX,
        this.posY
      );
      if (this.gameFrame % this.staggerFrame == 0) {
        if (this.frameX < 3) this.frameX++;
        else this.frameX = 0;
      }
      this.gameFrame++;
    }

    this.ctx.closePath();
  }


  update() {
    if (this.movement === Movement.LEFT && this.posX >= WALL_WIDTH) {
      this.posX -= this.dx;
    }

    //if wall is present in between
    GameManager.walls.forEach((wall)=>{
      if (this.posX >= wall.posX - this.playerWidth) {
        this.posX -= this.dx;
      }
    })
 
    if (
      this.movement === Movement.RIGHT &&
      this.posX + this.spriteWidth <=
        CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH
    ) {
      this.posX += this.dx;
    }
  }
  updateLives(){
    this.life = this.life -1;
  }
  incrementScore() {
    this.score += 1;
  }

  addPowerUp(powerUp: any) {
    this.powerUps.push(powerUp);
  }
}


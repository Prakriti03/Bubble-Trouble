import { PLAYER_DIMENSIONS, WALL_WIDTH } from "../constants";
import { CANVAS_DIMENSIONS } from "../constants";
import { GROUND_HEIGHT } from "../constants";
import { Movement } from "../utils/enum";
import { Wall } from "./Wall";
import heroImage from "/hero.png";

export class Player {
  heroImage: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  posX: number;
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
  constructor(ctx: CanvasRenderingContext2D) {
    this.heroImage = new Image();
    this.heroImage.src = heroImage;
    this.ctx = ctx;
    this.playerHeight = PLAYER_DIMENSIONS.PLAYER_HEIGHT;
    this.playerWidth = PLAYER_DIMENSIONS.PLAYER_WIDTH;
    this.posX = WALL_WIDTH; //when walls are present in between
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
  }

  draw() {
    this.ctx.beginPath();
    if (this.movement === Movement.STATIONARY) {
      this.ctx.drawImage(
        this.heroImage,
        8,
        112,
        31,
        55,
        this.posX,
        this.posY,
        this.playerWidth,
        this.playerHeight
      );
    }

    if (this.movement === Movement.LEFT) {
      this.ctx.drawImage(
        this.heroImage,
        this.frameX * this.spriteWidth,
        57,
        this.spriteWidth,
        this.spriteHeight,
        this.posX,
        this.posY,
        this.spriteWidth,
        this.spriteHeight
      );
      if (this.gameFrame % this.staggerFrame == 0) {
        if (this.frameX < 3) this.frameX++;
        else this.frameX = 0;
      }
      this.gameFrame++;
    }
    if (this.movement === Movement.RIGHT) {
      this.ctx.drawImage(
        this.heroImage,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.posX,
        this.posY,
        this.spriteWidth,
        this.spriteHeight
      );
      if (this.gameFrame % this.staggerFrame == 0) {
        if (this.frameX < 3) this.frameX++;
        else this.frameX = 0;
      }
      this.gameFrame++;
    }

    this.ctx.closePath();
  }

  update(isWallPresent: boolean) {
    if (this.movement === Movement.LEFT && this.posX >= WALL_WIDTH) {
      this.posX -= this.dx;
    }

    //if wall is present in between

    if (isWallPresent) {
      if (this.posX >= Wall.posX - this.playerWidth) {
        this.posX -= this.dx;
      }
    }
    this.posX >= Wall.posX - this.playerWidth;
    if (
      this.movement === Movement.RIGHT &&
      this.posX + this.spriteWidth <=
        CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH
    ) {
      this.posX += this.dx;
    }
  }
}

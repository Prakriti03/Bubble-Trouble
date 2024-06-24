import { GameManager } from "../GameManager";
import { GROUND_HEIGHT, CANVAS_DIMENSIONS, WALL_WIDTH } from "../constants";
import {
  BUBBLE_CENTER_X,
  BUBBLE_CENTER_Y,
  MAX_BUBBLE_RADIUS,
  BUBBLE_DY,
  BUBBLE_DX,
} from "../constants";
import { GRAVITY } from "../constants";
import { Wall } from "./Wall";

export class Bubble {
  ctx: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;
  radius: number;
  dy: number;
  dx: number;
  numberOfBubbles: number;
  bubblePlayerDx?: number;
  bubblePlayerDy?: number;
  bubblePlayerDistance?: number;
  closestPlayerPosX?: number;
  closestPlayerPosY?: number;
  // static bubbleArray: Bubble[] = [];
  isBubbleArrowCollisionTrue?: boolean;
  isPlayerBubbleCollisionTrue?: boolean;
  mass: number;
  gravity: number;
  wall : Wall;
  constructor(
    ctx: CanvasRenderingContext2D,
    numberOfBubbles: number,
    radius: number,
    bubbleCenterX: number,
    bubbleCenterY: number
  ) {
    this.ctx = ctx;
    this.centerX = bubbleCenterX;
    this.centerY = bubbleCenterY;
    this.radius = radius;
    this.gravity = GRAVITY;
    this.dy = BUBBLE_DY;
    this.dx = BUBBLE_DX;
    this.numberOfBubbles = numberOfBubbles;
    this.mass = this.radius;
    this.wall = new Wall(
      this.ctx,
      (CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH) / 2,
      0,
      WALL_WIDTH / 2,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT
    );
  }

  getBallGradient(
    highlightColor: string,
    mainColor: string,
    shadowColor: string
  ) {
    const gradient = this.ctx.createRadialGradient(
      this.centerX - this.radius / 3, // Inner circle x
      this.centerY - this.radius / 3, // Inner circle y
      this.radius / 4, // Inner circle radius
      this.centerX, // Outer circle x
      this.centerY, // Outer circle y
      this.radius // Outer circle radius
    );

    // Define the gradient color stops
    gradient.addColorStop(0, highlightColor);
    gradient.addColorStop(0.5, mainColor);
    gradient.addColorStop(1, shadowColor);

    return gradient;
  }

  get x() {
    return this.centerX;
  }

  get y() {
    return this.centerY;
  }

  get r() {
    return this.radius;
  }

  draw(centerX: number, centerY: number) {
    const gradient = this.getBallGradient("white", "red", "darkred");

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();
  }

  calculateInitialVelocity(radius: number): number {
    const baseVelocity = -4; // Base upward velocity value
    const maxRadius = MAX_BUBBLE_RADIUS;
    const velocityScalingFactor = radius / maxRadius; // Linear scaling factor
    return baseVelocity * (1 + velocityScalingFactor); // Adjusted velocity
  }

  //need to move the logic regarding wall to GameManager.ts

  update(isWallPresent: boolean) {
    this.dy += this.gravity;
    this.centerX += this.dx;
    this.centerY += this.dy;

    if (
      this.centerY + this.radius >=
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT
    ) {
      this.centerY =
        CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT - this.radius;
      this.dy = this.calculateInitialVelocity(this.radius);
    }

    if (
      this.centerX + this.radius >=
        CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH ||
      this.centerX - this.radius <= WALL_WIDTH
    ) {
      this.dx *= -1;
    }

    if (isWallPresent) {

      if (
        (this.centerX + this.radius >= this.wall.posX &&
          this.centerX + this.radius <= this.wall.posX + WALL_WIDTH / 2) ||
        (this.centerX - this.radius <= this.wall.posX + WALL_WIDTH / 2 &&
          this.centerX + this.radius > this.wall.posX)
      ) {
        this.dx *= -1;
      }
    }
  }

  splitBubbles() {
    this.radius /= 2;

    const bubble1 = new Bubble(
      this.ctx,
      this.numberOfBubbles,
      this.radius,
      this.centerX,
      this.centerY
    );
    bubble1.centerX = this.centerX - this.radius;
    bubble1.centerY = this.centerY;
    bubble1.dx = -Math.abs(this.dx); //move left after splitting
    bubble1.dy = this.calculateInitialVelocity(this.radius) * 0.8;

    //create second new bubble
    const bubble2 = new Bubble(
      this.ctx,
      this.numberOfBubbles,
      this.radius,
      BUBBLE_CENTER_X,
      BUBBLE_CENTER_Y
    );
    bubble2.centerX = this.centerX + this.radius;
    bubble2.centerY = this.centerY;
    bubble2.dx = Math.abs(this.dx); //move right after splitting
    bubble2.dy = this.calculateInitialVelocity(this.radius) * 0.8; //animation after splitting

    const index = GameManager.bubbleArray!.indexOf(this);

    if (index >= 0 && index < GameManager.bubbleArray!.length) {
      GameManager.bubbleArray!.splice(index, 1);
    }

    GameManager.bubbleArray!.push(bubble1, bubble2);
  }
}

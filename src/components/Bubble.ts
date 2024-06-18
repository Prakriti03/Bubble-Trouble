// import { GRAVITY } from "../constants";
import { BUBBLE_DY, BUBBLE_DX } from "../constants";
import { BUBBLE_CENTER_X, BUBBLE_CENTER_Y } from "../constants";
import { PLAYER_DIMENSIONS } from "../constants";
import { DEFAULT_BUBBLE_MAX_POSX } from "../constants";

export class Bubble {
  ctx: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;
  radius: number;
  dy: number;
  dx: number;
  numberOfBubbles: number;
  isHittable: boolean = false;
  bubblePlayerDx?: number;
  bubblePlayerDy?: number;
  bubblePlayerDistance?: number;
  closestPlayerPosX?: number;
  closestPlayerPosY?: number;
  static bubbleArray: Bubble[] = [];
  isBubbleArrowCollisionTrue?: boolean;
  isPlayerBubbleCollisionTrue?: boolean;
  maxBubbleHeight : number;

  //   gravity: number;
  hasLanded: boolean;
  constructor(
    ctx: CanvasRenderingContext2D,
    numberOfBubbles: number,
    radius: number
  ) {
    this.ctx = ctx;
    this.centerX = BUBBLE_CENTER_X;
    this.centerY = BUBBLE_CENTER_Y;
    this.radius = radius;
    // this.gravity = GRAVITY;
    this.dy = BUBBLE_DY;
    this.dx = BUBBLE_DX;
    this.hasLanded = false;
    this.isHittable = false;
    this.numberOfBubbles = numberOfBubbles;
    this.maxBubbleHeight = DEFAULT_BUBBLE_MAX_POSX;
  
  }
  draw(centerX: number, centerY: number) {
    const gradient = this.ctx.createRadialGradient(
      this.centerX - this.radius / 3, // Inner circle x
      this.centerY - this.radius / 3, // Inner circle y
      this.radius / 4, // Inner circle radius
      this.centerX, // Outer circle x
      this.centerY, // Outer circle y
      this.radius // Outer circle radius
    );

    // Define the gradient color stops
    gradient.addColorStop(0, "white"); // Highlight color
    gradient.addColorStop(0.5, "red"); // Main color
    gradient.addColorStop(1, "darkred"); // Shadow color

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();
  }
  resetDy() {
    this.dy = -this.dy;
  }
  resetDx() {
    this.dx = -this.dx;
  }
  update() {
    this.centerX += this.dx;
    this.centerY += this.dy;
    // this.dy += this.gravity;
  }
  //check collision with player
  checkCollision(
    playerPosX: number,
    playerPosY: number,
    centerX: number,
    centerY: number,
    radius: number
  ) {
    //find the closest point on the player to the bubble
    this.closestPlayerPosX = Math.max(
      playerPosX,
      Math.min(centerX, playerPosX + PLAYER_DIMENSIONS.PLAYER_WIDTH)
    );
    this.closestPlayerPosY = Math.max(
      playerPosY,
      Math.min(centerY, playerPosY + PLAYER_DIMENSIONS.PLAYER_HEIGHT)
    );

    //get distance between center of bubble and player'
    this.bubblePlayerDx = centerX - this.closestPlayerPosX;
    this.bubblePlayerDy = centerY - this.closestPlayerPosY;
    this.bubblePlayerDistance = Math.sqrt(
      this.bubblePlayerDx * this.bubblePlayerDx +
        this.bubblePlayerDy * this.bubblePlayerDy
    );

    if (this.bubblePlayerDistance <= radius) {
      this.isPlayerBubbleCollisionTrue = true;
    } else {
      this.isPlayerBubbleCollisionTrue = false;
    }
  }
  splitBubbles(height : number) {    
    this.radius /= 2;

    // this.maxBubbleHeight +=150

    const bubble1 = new Bubble(this.ctx, this.numberOfBubbles, this.radius);
    bubble1.centerX = this.centerX - this.radius;
    bubble1.centerY = this.centerY;
    bubble1.dx = -Math.abs(this.dx); //move left after splitting
    bubble1.dy = -Math.abs(this.dy);
    bubble1.radius = this.radius;
    bubble1.maxBubbleHeight   = height + 100;

    //create second new bubble
    const bubble2 = new Bubble(this.ctx, this.numberOfBubbles, this.radius);
    bubble2.centerX = this.centerX + this.radius;
    bubble2.centerY = this.centerY;
    bubble2.dx = Math.abs(this.dx); //move right after splitting
    bubble2.dy = -Math.abs(this.dy);
    bubble2.radius = this.radius;
    bubble2.maxBubbleHeight  = height + 100;

    const index = Bubble.bubbleArray.indexOf(this);

    if (index >= 0 && index < Bubble.bubbleArray.length) {
      Bubble.bubbleArray.splice(index, 1);
    }

    Bubble.bubbleArray.push(bubble1, bubble2);

    this.isHittable = false;
 

  }
  
}

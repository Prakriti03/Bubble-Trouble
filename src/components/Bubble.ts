// import { GRAVITY } from "../constants";
import { BUBBLE_DY, BUBBLE_DX, GROUND_HEIGHT, CANVAS_DIMENSIONS } from "../constants";
import { BUBBLE_CENTER_X, BUBBLE_CENTER_Y } from "../constants";
import { PLAYER_DIMENSIONS } from "../constants";
import { GRAVITY } from "../constants";

export class Bubble {
  ctx: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;
  radius: number;
  dy: number;
  dx: number;
  numberOfBubbles: number;
  // isHittable: boolean = false;
  bubblePlayerDx?: number;
  bubblePlayerDy?: number;
  bubblePlayerDistance?: number;
  closestPlayerPosX?: number;
  closestPlayerPosY?: number;
  static bubbleArray: Bubble[] = [];
  isBubbleArrowCollisionTrue?: boolean;
  isPlayerBubbleCollisionTrue?: boolean;
  mass : number;
  gravity: number;
  constructor(
    ctx: CanvasRenderingContext2D,
    numberOfBubbles: number,
    radius: number
  ) {
    this.ctx = ctx;
    this.centerX = BUBBLE_CENTER_X;
    this.centerY = BUBBLE_CENTER_Y;
    this.radius = radius;
    this.gravity = GRAVITY;
    this.dy = BUBBLE_DY;
    this.dx = BUBBLE_DX;
    this.numberOfBubbles = numberOfBubbles;
    this.mass = this.radius;
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
  calculateInitialVelocity(radius: number): number {
    const baseVelocity = -9; // Base upward velocity value
    const maxRadius = 40; 
    const velocityScalingFactor = (radius / maxRadius); // Linear scaling factor
    return baseVelocity * (1 + velocityScalingFactor); // Adjusted velocity
  }
  update() {
    this.dy += this.gravity;
    this.centerX += this.dx;
    this.centerY += this.dy;

    if (this.centerY + this.radius >= CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT) {
      this.centerY = CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT - this.radius;
      this.dy =  this.calculateInitialVelocity(this.radius); 
    }

    if (this.centerX + this.radius >= CANVAS_DIMENSIONS.CANVAS_WIDTH || this.centerX - this.radius <= 0) {
      this.dx *= -1; 
    }
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
  splitBubbles() {    
    this.radius /= 2;


    const bubble1 = new Bubble(this.ctx, this.numberOfBubbles, this.radius);
    bubble1.centerX = this.centerX - this.radius;
    bubble1.centerY = this.centerY;
    bubble1.dx = -Math.abs(this.dx); //move left after splitting
    bubble1.dy = this.calculateInitialVelocity(this.radius)* 0.7;
    bubble1.radius = this.radius;
   

    //create second new bubble
    const bubble2 = new Bubble(this.ctx, this.numberOfBubbles, this.radius);
    bubble2.centerX = this.centerX + this.radius;
    bubble2.centerY = this.centerY;
    bubble2.dx = Math.abs(this.dx); //move right after splitting
    bubble2.dy = this.calculateInitialVelocity(this.radius) * 0.7;  //animation after splitting 
    bubble2.radius = this.radius;
  

    const index = Bubble.bubbleArray.indexOf(this);

    if (index >= 0 && index < Bubble.bubbleArray.length) {
      Bubble.bubbleArray.splice(index, 1);
    }

    Bubble.bubbleArray.push(bubble1, bubble2);
 

  }
  
}

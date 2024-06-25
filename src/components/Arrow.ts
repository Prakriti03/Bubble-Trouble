import arrowImage from "/arrow.png";
import { Bubble } from "./Bubble";
import { GROUND_HEIGHT, CANVAS_DIMENSIONS } from "../constants";
import { Movement } from "../utils/enum";

export class Arrow {
  posX: number;
  posY: number;
  ctx: CanvasRenderingContext2D;
  arrowImage: CanvasImageSource;
  isActive: boolean;
  playerMovement?: Movement;
  bubbleArray?: Bubble[];
  isBubbleArrowCollisionTrue?: boolean[];
  isHittable ?: boolean =false;
  static isSticky : boolean = false;

  constructor(ctx: CanvasRenderingContext2D, posX: number) {
    this.ctx = ctx;
    // this.bubble = new Bubble(ctx, 1, 40);
    // this.posX = posX + this.player.playerWidth / 2;
    this.posX = posX;
    this.posY = CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT;
    this.arrowImage = new Image();
    this.arrowImage.src = arrowImage;
    this.isActive = true; //Flag to make arrow visible/invisible
  }

  draw() {
    if (this.isActive) {
      this.ctx.drawImage(this.arrowImage, this.posX, this.posY);
    }
  }

  update() {
    if(Arrow.isSticky && this.posY<=0){
      return
    }
    if (this.posY <= 0) {
      this.isActive = false;
    }
    if (this.isActive) {
     
      this.posY -= 6;
    }
  }
  
  //check collision with bubbles
  checkCollision(centerX: number, centerY: number, bubbleRadius: number) {
    if (
      this.posX >= centerX - bubbleRadius &&
      this.posX <= centerX + bubbleRadius
    ) {
      if (this.posY <= centerY + bubbleRadius) {
        return true;
      }
    }
    return false;
  }
}

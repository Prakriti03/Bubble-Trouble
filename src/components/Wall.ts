import wallImage from "/wall.jpg";
import { CANVAS_DIMENSIONS, GROUND_HEIGHT, WALL_WIDTH } from "../constants";

export class Wall {
  posX: number;
  posY: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  wallImage: CanvasImageSource;
  disappearing: boolean = false;
  disappearingSpeed : number = 10;
  constructor(
    ctx: CanvasRenderingContext2D,
    posX : number,
  ) {
    this.posX = posX;
    this.posY = 0;
    this.width = WALL_WIDTH/2;
    this.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT;
    this.ctx = ctx;
    this.wallImage = new Image();
    this.wallImage.src = wallImage;
  }


  drawExtraWalls() {
    this.ctx.drawImage(
      this.wallImage,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
  startDisappearing(){
    this.disappearing = true;
  }
  update(){
    if(this.disappearing && this.height>0){
      this.height -= this.disappearingSpeed;
    }
  
  }

  drawDefaultWalls() {
    this.ctx.drawImage(
      this.wallImage,
      0,
      0,
      WALL_WIDTH,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT
    );
    this.ctx.drawImage(
      this.wallImage,
      CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH,
      0,
      WALL_WIDTH,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT
    );
  }
}

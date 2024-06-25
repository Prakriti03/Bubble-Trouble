/* The `Sprite` class in TypeScript represents a sprite object with properties for image, position, and
drawing on a canvas. */
export class Sprite {
  img: HTMLImageElement;
  posX: number;
  posY: number;
  ctx: CanvasRenderingContext2D;
  spriteWidth: number;
  spriteHeight: number;
  spriteX: number;
  spriteY: number;
  constructor(
    ctx: CanvasRenderingContext2D,
    imgSource: string,
    spriteX: number,
    spriteY: number,
    posX: number,
    posY: number
  ) {
    this.img = new Image();
    this.img.src = imgSource;
    this.spriteWidth = 47.25;
    this.spriteHeight = 56;
    this.ctx = ctx;
    this.spriteX = spriteX;
    this.spriteY = spriteY;
    this.posX = posX;
    this.posY = posY;
    this.drawSprite();
  }
  drawSprite() {
    this.ctx.drawImage(
      this.img,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight,
      this.posX,
      this.posY,
      this.spriteWidth,
      this.spriteHeight
    );
  }
}

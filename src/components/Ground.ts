import { GROUND_X, GROUND_HEIGHT } from "../constants";
import { CANVAS_DIMENSIONS } from "../constants";
import groundImage from '/wall.jpg'

export class GroundWalls{
    posX : number;
    posY : number;
    width : number;
    height: number;
    ctx : CanvasRenderingContext2D;
    groundImg : CanvasImageSource
    constructor(ctx : CanvasRenderingContext2D){
        this.ctx = ctx;
        this.posX = GROUND_X;
        this.posY = CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT;
        this.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
        this.height = GROUND_HEIGHT;
        this.groundImg = new Image();
        this.groundImg.src = groundImage;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.drawImage(this.groundImg, 0, 0 , 40,CANVAS_DIMENSIONS.CANVAS_HEIGHT );
        this.ctx.drawImage(this.groundImg, CANVAS_DIMENSIONS.CANVAS_WIDTH-40, 0 , 40,CANVAS_DIMENSIONS.CANVAS_HEIGHT );
        this.ctx.drawImage(this.groundImg, this.posX, this.posY, this.width, this.height);
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.closePath();
    }
}
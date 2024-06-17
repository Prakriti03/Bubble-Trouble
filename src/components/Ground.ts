import { GROUND_X, GROUND_HEIGHT } from "../constants";
import { CANVAS_DIMENSIONS } from "../constants";

export class Ground{
    posX : number;
    posY : number;
    width : number;
    height: number;
    ctx : CanvasRenderingContext2D;
    constructor(ctx : CanvasRenderingContext2D){
        this.ctx = ctx;
        this.posX = GROUND_X;
        this.posY = CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT;
        this.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
        this.height = GROUND_HEIGHT;
    }
    draw(){
        console.log("inside ground draw");
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.posX,this.posY,this.width,this.height);
        this.ctx.closePath();
    }
}
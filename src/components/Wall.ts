import wallImage from '/wall.jpg'
import { CANVAS_DIMENSIONS, GROUND_HEIGHT, WALL_WIDTH } from '../constants';

export class Wall{
    static posX: number;
    static posY: number;
    static width : number;
    static height : number;
    ctx : CanvasRenderingContext2D;
    wallImage : CanvasImageSource;
    disappearing : boolean = false;
    constructor(ctx: CanvasRenderingContext2D, posY : number, width : number, height : number){

        Wall.posX = (CANVAS_DIMENSIONS.CANVAS_WIDTH-WALL_WIDTH)/2;
        Wall.posY = posY;
        Wall.width = width;
        Wall.height = height;
        this.ctx = ctx;
        this.wallImage = new Image();
        this.wallImage.src = wallImage;
    }
    drawDefaultWalls(){

        this.ctx.drawImage(this.wallImage, 0, 0 , WALL_WIDTH,CANVAS_DIMENSIONS.CANVAS_HEIGHT );
        console.log(`wall width : ${Wall.posX}`)
        
        // this.ctx.drawImage(this.wallImage, Wall.posX ,0, WALL_WIDTH/2,CANVAS_DIMENSIONS.CANVAS_HEIGHT-GROUND_HEIGHT);

        this.ctx.drawImage(this.wallImage, CANVAS_DIMENSIONS.CANVAS_WIDTH-WALL_WIDTH, 0 , WALL_WIDTH,CANVAS_DIMENSIONS.CANVAS_HEIGHT );

    }
    drawExtraWalls(){
        this.ctx.drawImage(this.wallImage, Wall.posX ,0, WALL_WIDTH/2,CANVAS_DIMENSIONS.CANVAS_HEIGHT-GROUND_HEIGHT);

    }

}

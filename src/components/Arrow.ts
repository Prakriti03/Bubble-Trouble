import arrowImage from '/arrow.png'
import { Player } from './Player';
import { GROUND_HEIGHT } from '../constants';
import { CANVAS_DIMENSIONS } from '../constants';
import { Movement } from '../utils/enum';

export class Arrow{
    posX : number;
    posY : number;
    ctx : CanvasRenderingContext2D;
    player : Player;
    arrowImage : CanvasImageSource;
    isVisible : boolean
    playerMovement ?: Movement;

    constructor(ctx : CanvasRenderingContext2D, posX : number){
        this.ctx = ctx;
        this.player = new Player(ctx);
        this.posX = posX + this.player.playerWidth/2;
        this.posY = CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT;
        this.arrowImage = new Image();
        this.arrowImage.src = arrowImage; 
        this.isVisible = true; //Flag to make arrow visible/invisible
        
    };
    draw(){
        if(this.isVisible){

            this.ctx.drawImage(this.arrowImage, this.posX, this.posY)
        }

    };
    update(){
        if (this.posY<=0){
            this.isVisible = false;
        }
        if(this.isVisible){
            this.posY -= 5;
        }
        
    }
}
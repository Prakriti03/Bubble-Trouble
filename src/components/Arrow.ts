import arrowImage from '/arrow.png'
import { Player } from './Player';
import { GROUND_HEIGHT } from '../constants';
import { CANVAS_DIMENSIONS } from '../constants';
import { Movement } from '../utils/enum';
import { Bubble } from './Bubble';

export class Arrow{
    posX : number;
    posY : number;
    ctx : CanvasRenderingContext2D;
    player : Player;
    arrowImage : CanvasImageSource;
    isActive : boolean
    playerMovement ?: Movement;
    bubble : Bubble;
    bubbleArray ?: Bubble[];
    isBubbleArrowCollisionTrue ?: boolean[];

    constructor(ctx : CanvasRenderingContext2D, posX : number){
        this.ctx = ctx;
        this.player = new Player(ctx);
        this.bubble = new Bubble(ctx, 1, 40);
        this.posX = posX + this.player.playerWidth/2;
        this.posY = CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT;
        this.arrowImage = new Image();
        this.arrowImage.src = arrowImage; 
        this.isActive = true; //Flag to make arrow visible/invisible
        
    };
    draw(){
        if(this.isActive){

            this.ctx.drawImage(this.arrowImage, this.posX, this.posY)
        }

    };
    update(){
        if (this.posY<=0){
            this.isActive = false;
        }
        if(this.isActive){
            this.posY -= 5;
        }
        
    }
    //check collision with bubbles 
    checkCollision(centerX: number, centerY : number, bubbleRadius : number){
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
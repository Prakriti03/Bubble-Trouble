import { CANVAS_DIMENSIONS, GROUND_HEIGHT, LEVEL_ONE, PLAYER_DIMENSIONS } from "./constants";
import { GroundWalls } from "./components/Ground";
import groundImg from '/wall.jpg'
import { GameManager } from "./GameManager";
import { Bubble } from "./components/Bubble";

export class CustomGamesCreator{
    canvas : HTMLCanvasElement
    ctx : CanvasRenderingContext2D
    bgImage : HTMLImageElement
    ground !: GroundWalls
    groundImg : HTMLImageElement
    bubble ?: Bubble
    gamemanager ?: GameManager;
    constructor(canvas : HTMLCanvasElement){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')!;
        this.bgImage = new Image();
        this.bgImage.src = LEVEL_ONE.imageSrc;
        this.ground = new GroundWalls(this.ctx);
        this.groundImg = new Image();
        this.groundImg.src = groundImg;

        // this.gamemanager = new GameManager(this.canvas);

        GameManager.bubbleArray = [];

        this.initialSetup();
    }
    public initialSetup():void{
        this.clearCanvas();
        this.bgImage.onload = ()=>{
            this.groundImg.onload=()=>{

                this.setupStaticLevel();
                this.addBallOption();
                this.createPlayButton();
            }
        }
    }
    private setupStaticLevel():void{
        //default background       
        this.ctx.drawImage(this.bgImage, 0,0, this.canvas.width, this.canvas.height);

        //draw static player
    
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.canvas.width/2,this.canvas.height - GROUND_HEIGHT-PLAYER_DIMENSIONS.PLAYER_HEIGHT, 50,50);

        //draw ground
        this.ground.draw(0);

    }
    private addBallOption():void{
        const container = document.createElement('select');
        container.id = "ball-options"
        container.style.position = "absolute";
        container.style.bottom = `${GROUND_HEIGHT/2}px`;
        container.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH/4}px`;
        container.style.zIndex = "1";

        const ball_Sizes = [10,20,30,40,50,60];
        ball_Sizes.forEach((size)=>{
     
            const optionElement = document.createElement('option');
            optionElement.value = size.toString();
            optionElement.textContent = size.toString();
            optionElement.onclick= ()=>{
                this.selectBall(size)
            }
            container.appendChild(optionElement);
            
        })
        document.body.appendChild(container);
    }
    private selectBall(size : number):void{
        const bubbleRadius = size;
        this.bubble = new Bubble(
            this.ctx,
            0,
            bubbleRadius,
            200,
            200
        );
        GameManager.bubbleArray!.push(this.bubble);
        // this.gamemanager.initialSetup();
    }
    private clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
    private createPlayButton(){
        const button = document.createElement("button");
        button.innerText = "Play";
        button.onclick=()=>{
            this.gamemanager = new GameManager(this.canvas)
            // this.gamemanager!.initialSetup();
        }
        document.body.appendChild(button);
    }
    // private setupWall(){
    //     const buttonWall = document.createElement("button");
    //     buttonWall.innerText = "Wall";
    //     buttonWall.onclick=()=>{

    //     }
    // }
    // private drawWall(){
        
    // }

}
import {
  CANVAS_DIMENSIONS,
  GROUND_HEIGHT,
  PLAYER_DIMENSIONS,
  WALL_WIDTH,
} from "./constants";
import { LEVEL_ONE} from "./constants";
import groundImg from "/wall.jpg";
import { GameManager } from "./GameManager";
import { GroundWalls } from "./components/Ground";
import { Bubble } from "./components/Bubble";
import { Wall } from "./components/Wall";

export class CustomGamesCreator {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bgImage: HTMLImageElement;
  ground!: GroundWalls;
  groundImg: HTMLImageElement;
  bubble?: Bubble;
  gamemanager?: GameManager;
  selectedBubbleRadius: number = 30;
  draggingBubble: boolean = false;
  currentBubble?: Bubble;
  addBubbleButton?: HTMLButtonElement;
  playButton?: HTMLButtonElement;
  bubbleOptions?: HTMLSelectElement;
  wallOptions?: HTMLSelectElement;
  walls: Wall[] = [];
  wall ?: Wall;
  draggingWall: boolean = false;
  resizingWall: boolean = false;
  currentWall?: Wall;
  addWallButton?: HTMLButtonElement;
  selectedWallIndex: number = -1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.bgImage = new Image();
    this.bgImage.src = LEVEL_ONE.imageSrc;
    this.ground = new GroundWalls(this.ctx);
    this.groundImg = new Image();
    this.groundImg.src = groundImg;

    GameManager.bubbleArray = [];

    this.initialSetup();
  }

  public initialSetup(): void {
    this.clearCanvas();
    this.bgImage.onload = () => {
      this.groundImg.onload = () => {
        this.setupStaticLevel();
        this.selectSizeOption();
        this.createAddBubbleButton();
        this.createPlayButton();
        this.createAddWallButton();
        this.addEventListeners();
      };
    };
  }

  //before player begins the game
  private setupStaticLevel(): void {
    this.ctx.beginPath();
    //default background
    this.ctx.drawImage(
      this.bgImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    //draw static player
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      this.canvas.width / 2,
      this.canvas.height - GROUND_HEIGHT - PLAYER_DIMENSIONS.PLAYER_HEIGHT,
      50,
      50
    );

    //draw ground
    this.ground.draw();

    //add initial bubble in the center
    // this.addBubble(this.canvas.width / 2, this.canvas.height / 2);
  }

  //drop-down element for choosing radius of circle
  private selectSizeOption(): void {
    const bubbleContainer = document.createElement("select");
    bubbleContainer.id = "ball-options";
    bubbleContainer.style.position = "absolute";
    bubbleContainer.style.bottom = `${GROUND_HEIGHT / 2}px`;
    bubbleContainer.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH / 4}px`;
    bubbleContainer.style.zIndex = "1";

    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Select Radius";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    bubbleContainer.appendChild(placeholderOption);

    const BUBBLE_SIZES = [10, 20, 30, 40, 50, 60];
    BUBBLE_SIZES.forEach((size) => {
      const optionElement = document.createElement("option");
      optionElement.value = size.toString();
      optionElement.textContent = size.toString();
      bubbleContainer.appendChild(optionElement);
    });
    bubbleContainer.addEventListener("change", (event) => {
      const target = event.target as HTMLSelectElement;
      this.selectedBubbleRadius = parseInt(target.value);
    });
    document.body.appendChild(bubbleContainer);
    this.bubbleOptions = bubbleContainer;
  }

  //Create + button to add the bubbles
  private createAddBubbleButton() {
    const button = document.createElement("button");
    button.innerText = "+";
    button.style.position = "absolute";
    button.style.bottom = `${GROUND_HEIGHT / 2}px`;
    button.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 150}px`;
    button.style.zIndex = "1";
    button.onclick = () => {
      this.addBubble(this.canvas.width / 2, this.canvas.height / 2);
    };
    document.body.appendChild(button);
    this.addBubbleButton = button;
  }

  //create + button to add wall onto the canvas
  private createAddWallButton() {
    const wallButton = document.createElement("button");
    wallButton.innerText = "+";
    wallButton.style.position = "absolute";
    wallButton.style.bottom = `${GROUND_HEIGHT / 2}px`;
    wallButton.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 + 70}px`;
    wallButton.style.zIndex = "1";
    wallButton.onclick = () => {

      this.addWall(this.canvas.width / 2, 0);
    };
    document.body.appendChild(wallButton);
    this.addWallButton = wallButton;
  }

  //add bubble to the array
  private addBubble(x: number, y: number) {
    const bubble = new Bubble(this.ctx, 0, this.selectedBubbleRadius, x, y);
    GameManager.bubbleArray?.push(bubble);
    this.draw();
  }

  //add walls to the array
  private addWall(x: number, y: number){
    this.wall = new Wall(this.ctx, x, y, WALL_WIDTH/2, this.canvas.height-GROUND_HEIGHT);
    this.walls.push(this.wall);
    this.draw();
  }

  private addEventListeners(): void {
    //event listeners for bubbles manipulation
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
  }

  //remove event listeners after the game begins
  private removeEventListeners(): void {
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
  }

  private onMouseDown = (event: MouseEvent) => {
    const { offsetX, offsetY } = event;

    //find the bubble that is clicked
    this.currentBubble = GameManager.bubbleArray!.find((bubble) => {
      return (
        Math.hypot(bubble.centerX - offsetX, bubble.centerY - offsetY) <
        bubble.radius
      );
    });

    //inititate dragging property after the bubble is clicked
    if (this.currentBubble) {
      this.draggingBubble = true;
    }else {
      this.selectedWallIndex = this.walls.findIndex((wall) => {
        return (
          offsetX >= wall.posX &&
          offsetX <= wall.posX + wall.width &&
          offsetY >= wall.posY &&
          offsetY <= wall.posY + wall.height
        );
      });
      if (this.selectedWallIndex >= 0) {
        this.currentWall = this.walls[this.selectedWallIndex];
        this.draggingWall = true;
        this.resizingWall = offsetX >=  this.wall!.posX + this.wall!.width - 10 && offsetY >= this.wall!.posY + this.wall!.height - 10;
      }
    }
 
  };

  //logic for dragging movement of bubble & wall(only horizontally)
  private onMouseMove = (event: MouseEvent) => {
    const { offsetX, offsetY } = event;
    if (this.draggingBubble && this.currentBubble) {
      this.currentBubble.centerX = offsetX;
      this.currentBubble.centerY = offsetY;
      this.draw();
    }
    else if(this.draggingWall && this.currentWall){
        if(this.resizingWall){
            this.currentWall.width = Math.max(10, offsetX - this.currentWall.posX);
            this.currentWall.height = Math.max(10, offsetY - this.currentWall.posY);
        }else{
            this.currentWall.posX = offsetX;
        }
        this.draw();
    }
  };

  //dragging is stopped after click is removed
  private onMouseUp = () => {
    this.draggingBubble = false;
    this.currentBubble = undefined;
    this.draggingWall = false;
    this.resizingWall = false;
    this.currentWall = undefined;
  };

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private createPlayButton() {
    const button = document.createElement("button");
    button.innerText = "Play";
    button.style.position = "absolute";
    button.style.top = "100px";
    button.style.right = "100px";
    button.onclick = () => {
      const customLevelConfig = {
        imageSrc: LEVEL_ONE.imageSrc,
        Bubbles: GameManager.bubbleArray!.map((bubble) => ({
          centerX: bubble.centerX,
          centerY: bubble.centerY,
          radius: bubble.radius,
        })),
        Walls: this.walls.map((wall) => ({
            posX: wall.posX,
            posY: wall.posY,
            width: wall.width,
            height: wall.height,
          })),
        isWallPresent: true,
        level: 4,
      };
      this.removeUIElements();
      this.removeEventListeners();

      this.gamemanager = new GameManager(this.canvas, 1, customLevelConfig);
    };
    document.body.appendChild(button);
    this.playButton = button;
  }

  private removeUIElements() {
    document.body.removeChild(this.addBubbleButton!);
    this.addBubbleButton = undefined;

    document.body.removeChild(this.playButton!);
    this.playButton = undefined;

    document.body.removeChild(this.bubbleOptions!);
    this.bubbleOptions = undefined;

    // document.body.removeChild(this.wallOptions!);
    // this.wallOptions = undefined;

    document.body.removeChild(this.addWallButton!);
    this.addWallButton = undefined;
  }

  private draw() {
    this.clearCanvas();
    this.setupStaticLevel();
    GameManager.bubbleArray?.forEach((bubble) => {
      bubble.draw(bubble.centerX, bubble.centerY);
    });
    this.walls.forEach((wall)=>{
      wall.drawExtraWalls();
    })
  }
}

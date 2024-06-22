import {
  CANVAS_DIMENSIONS,
  GROUND_HEIGHT,
  LEVEL_ONE,
  PLAYER_DIMENSIONS,
} from "./constants";
import { GroundWalls } from "./components/Ground";
import groundImg from "/wall.jpg";
import { GameManager } from "./GameManager";
import { Bubble } from "./components/Bubble";

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
  ballOptions?: HTMLSelectElement;

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
        this.addEventListeners();
      };
    };
  }

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

  private selectSizeOption(): void {
    const container = document.createElement("select");
    container.id = "ball-options";
    container.style.position = "absolute";
    container.style.bottom = `${GROUND_HEIGHT / 2}px`;
    container.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH / 4}px`;
    container.style.zIndex = "1";

    const BUBBLE_SIZES = [10, 20, 30, 40, 50, 60];
    BUBBLE_SIZES.forEach((size) => {
      const optionElement = document.createElement("option");
      optionElement.value = size.toString();
      optionElement.textContent = size.toString();
      container.appendChild(optionElement);
    });
    container.addEventListener("change", (event) => {
      const target = event.target as HTMLSelectElement;
      this.selectedBubbleRadius = parseInt(target.value);
    });
    document.body.appendChild(container);
    this.ballOptions = container;
  }

  private createAddBubbleButton() {
    const button = document.createElement("button");
    button.innerText = "+";
    button.style.position = "absolute";
    button.style.bottom = `${GROUND_HEIGHT / 2}px`;
    button.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH / 4 + 80}px`;
    button.style.zIndex = "1";
    button.onclick = () => {
      this.addBubble(this.canvas.width / 2, this.canvas.height / 2);
    };
    document.body.appendChild(button);
    this.addBubbleButton = button;
  }

  private addBubble(x: number, y: number) {
    const bubble = new Bubble(this.ctx, 0, this.selectedBubbleRadius, x, y);
    GameManager.bubbleArray?.push(bubble);
    this.draw();
  }

  private addEventListeners(): void {
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
  }

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

    if (this.currentBubble) {
      this.draggingBubble = true;
    }
  };

  private onMouseMove = (event: MouseEvent) => {
    if (this.draggingBubble && this.currentBubble) {
      const { offsetX, offsetY } = event;
      this.currentBubble.centerX = offsetX;
      this.currentBubble.centerY = offsetY;
      this.draw();
    }
  };

  private onMouseUp = () => {
    this.draggingBubble = false;
    this.currentBubble = undefined;
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
        isWallPresent: false,
        level: 4, 
      };
      console.log(`${customLevelConfig}`)
      this.removeUIElements();
      this.removeEventListeners();

      this.gamemanager = new GameManager(this.canvas, customLevelConfig);

    };
    document.body.appendChild(button);
    this.playButton = button;

  }

  private removeUIElements() {
    if (this.addBubbleButton) {
        document.body.removeChild(this.addBubbleButton);
        this.addBubbleButton = undefined;
      }
      if (this.playButton) {
        document.body.removeChild(this.playButton);
        this.playButton = undefined;
      }
      if (this.ballOptions) {
        document.body.removeChild(this.ballOptions);
        this.ballOptions = undefined;
      }
  }

  private draw() {
    this.clearCanvas();
    this.setupStaticLevel();
    GameManager.bubbleArray?.forEach((bubble) => {
      bubble.draw(bubble.centerX, bubble.centerY);
    });
  }
}

import { CustomGamesCreator } from "./CustomGameCreator";
import { LevelSelector } from "./LevelSelector";
import backgroundImgSrc from "/wall.jpg";
import foregroundImgSrc from "/start-screen.png";
import { CANVAS_DIMENSIONS } from "./constants";
export class StartScreen {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  onePlayerButton!: HTMLButtonElement;
  twoPlayersButton!: HTMLButtonElement;
  settingsButton!: HTMLButtonElement;
  createGameButton!: HTMLButtonElement;
  backgroundWallImg: HTMLImageElement;
  foregroundImg: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;

    this.backgroundWallImg = new Image();
    this.backgroundWallImg.src = backgroundImgSrc;

    this.foregroundImg = new Image();
    this.foregroundImg.src = foregroundImgSrc;

    this.createUI();
    this.addEventListeners();
  }
  createUI() {
    this.clearCanvas();

    this.backgroundWallImg.onload = () => {
      this.ctx.drawImage(
        this.backgroundWallImg,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    };

    this.foregroundImg.onload = () => {
      this.ctx.drawImage(
        this.foregroundImg,
        CANVAS_DIMENSIONS.CANVAS_WIDTH - 400,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT - 400,
        400,
        400
      );
      this.drawTitle();
    };

    this.onePlayerButton = this.createButton("One Player", 400, 300);
    this.twoPlayersButton = this.createButton("Two Players", 400, 400);
    this.createGameButton = this.createButton("Create Game", 400, 500);
  }
  drawTitle() {
    this.ctx.font = '80px "Comic Sans MS", sans-serif';
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 3;
    this.ctx.textAlign = "center";
    this.ctx.fillText("Bubble Trouble", this.canvas.width / 2, 150);
    this.ctx.strokeText("Bubble Trouble", this.canvas.width / 2, 150);
  }
  createButton(text: string, x: number, y: number): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerText = text;
    button.style.position = "absolute";
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.padding = "20px";
    button.style.fontSize = "24px";
    button.style.border = "2px solid #8B4513"; // Wooden look
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.borderRadius = "10px";
    button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    button.style.cursor = "pointer";
    document.body.appendChild(button);
    return button;
  }
  addEventListeners() {
    this.onePlayerButton.addEventListener("click", () => {
      this.clearUI();
      new LevelSelector(this.canvas, 1);
    });
    this.twoPlayersButton.addEventListener("click", () => {
      this.clearUI();
      new LevelSelector(this.canvas, 2);
    });
    this.createGameButton.addEventListener("click", () => {
      this.clearUI();
      new CustomGamesCreator(this.canvas);
    });
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  clearUI() {
    document.body.removeChild(this.onePlayerButton);
    document.body.removeChild(this.twoPlayersButton);
    document.body.removeChild(this.createGameButton);
    this.onePlayerButton = undefined!;
    this.twoPlayersButton = undefined!;
    this.createGameButton = undefined!;
  }
}

import { GameManager } from "./GameManager";

export class LevelSelector {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  levelButtons: HTMLButtonElement[] = [];
  numberofPlayers : number;

  constructor(canvas: HTMLCanvasElement, numberofPlayers : number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.createUI();
    this.addEventListeners();
    this.numberofPlayers = numberofPlayers;
  }

  createUI() {
    for (let i = 1; i <= 5; i++) {
      const button = this.createButton(`Level ${i}`, 400, 150 + i * 80);
      this.levelButtons.push(button);
    }
  }
  createButton(text: string, x: number, y: number): HTMLButtonElement {
    const button = document.createElement('button');
    button.innerText = text;
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.padding = '20px 50px';
    button.style.fontSize = '20px';
    button.style.border = '2px solid #8B4513'; // Wooden look
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
    button.style.borderRadius = '10px';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    button.style.cursor = 'pointer';
    document.body.appendChild(button);
    return button;
  }

  addEventListeners() {
    this.levelButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        this.clearUI();
        new GameManager(this.canvas, this.numberofPlayers).levelLoader.loadLevel(index);
      });
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearUI() {
    this.levelButtons.forEach((button) => {
      document.body.removeChild(button);
    });
  }
}

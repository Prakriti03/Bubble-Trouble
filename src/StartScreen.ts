import { CustomGamesCreator } from "./CustomGameCreator";
import { LevelSelector } from "./LevelSelector";
export class StartScreen {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  startButton !: HTMLButtonElement;
  selectPlayerButton !: HTMLButtonElement;
  settingsButton !: HTMLButtonElement;
  createGameButton! : HTMLButtonElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.createUI();
    this.addEventListeners();
  }
  createUI() {
    this.clearCanvas();
    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = "black";
    this.ctx.fillText('Bubble Trouble Game', 100, 100);

    this.startButton = this.createButton('Start Game', 500, 200);
    this.selectPlayerButton = this.createButton('Select Player', 500, 300);
    this.settingsButton = this.createButton('Settings', 500, 400);
    this.createGameButton = this.createButton('Create Game', 500, 500);

  }
  createButton(text: string, x: number, y: number): HTMLButtonElement {
    const button = document.createElement('button');
    button.innerText = text;
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    document.body.appendChild(button);
    return button;
  }
  addEventListeners() {
    this.startButton.addEventListener('click', () => {
      this.clearUI();
      new LevelSelector(this.canvas);
    });
    this.createGameButton.addEventListener('click', ()=>{
        this.clearUI();
        new CustomGamesCreator(this.canvas);
    })
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  clearUI() {
    document.body.removeChild(this.startButton);
    document.body.removeChild(this.selectPlayerButton);
    document.body.removeChild(this.settingsButton);
    document.body.removeChild(this.createGameButton);
  }
}

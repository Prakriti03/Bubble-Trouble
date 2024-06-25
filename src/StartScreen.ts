import { CustomGamesCreator } from "./CustomGameCreator";
import { LevelSelector } from "./LevelSelector";
export class StartScreen {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  onePlayerButton !: HTMLButtonElement;
  twoPlayersButton !: HTMLButtonElement;
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

    this.onePlayerButton = this.createButton('One Player', 500, 200);
    this.twoPlayersButton = this.createButton('Two Players', 500, 300);
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
    this.onePlayerButton.addEventListener('click', () => {
      this.clearUI();
      new LevelSelector(this.canvas, 1);
    });
    this.twoPlayersButton.addEventListener('click', () => {
      this.clearUI();
      new LevelSelector(this.canvas, 2);
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
    document.body.removeChild(this.onePlayerButton);
    document.body.removeChild(this.twoPlayersButton);
    document.body.removeChild(this.settingsButton);
    document.body.removeChild(this.createGameButton);
  }
}

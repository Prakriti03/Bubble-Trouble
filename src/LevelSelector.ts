import { GameManager } from "./GameManager";

export class LevelSelector {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  levelButtons: HTMLButtonElement[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.createUI();
    this.addEventListeners();
  }

  createUI() {
    this.clearCanvas();
    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Select Level', 100,100);

    for (let i = 1; i <= 5; i++) {
        const button = this.createButton(`Level ${i}`, 500, 150 + i * 50);
        this.levelButtons.push(button);
        console.log(`${this.levelButtons}`)
    }

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
    this.levelButtons.forEach((button, index)=>{
        button.addEventListener('click',()=>{
            this.clearUI();
            new GameManager(this.canvas).levelLoader.loadLevel(index);
        })
    })
  }

  clearCanvas(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
  }


  clearUI() {
    this.levelButtons.forEach(button => {
      document.body.removeChild(button);
  });
}
}

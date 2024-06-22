import { StartScreen } from './StartScreen';
import { CANVAS_DIMENSIONS } from './constants';
import './style/style.css'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
canvas.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
canvas.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT;
canvas.style.border = "1px solid black";

new StartScreen(canvas);


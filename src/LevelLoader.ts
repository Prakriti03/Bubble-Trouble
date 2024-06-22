import { GameManager } from "./GameManager";
import { Bubble } from "./components/Bubble";
import { Wall } from "./components/Wall";
import { LEVEL_ONE, LEVEL_TWO, LEVEL_THREE, WALL_WIDTH } from "./constants";

export class LevelLoader {
  private gameManager: GameManager;
  private levels: any[];
  private currentLevelIndex: number;
  private bubble?: Bubble;
  level: number;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.levels = [LEVEL_ONE, LEVEL_TWO, LEVEL_THREE];
    this.currentLevelIndex = 0;
    this.level = 1;
  }

  loadLevel(levelIndex: number) {
    const level = this.levels[levelIndex];
    this.applyLevelConfig(level);
    this.currentLevelIndex = levelIndex;
  }

  loadNextLevel() {
    const nextLevelIndex = this.currentLevelIndex + 1;
    if (nextLevelIndex < this.levels.length) {
      this.level += 1;
      this.loadLevel(nextLevelIndex);
      this.gameManager.resetTimer();
    } else {
      return;
    }
  }

  private applyLevelConfig(level: any) {
    this.gameManager.bgImage = new Image();
    this.gameManager.bgImage.src = level.imageSrc;
    this.gameManager.level = level.level;
    this.gameManager.numberOfBubbles = level.Bubbles.length;
    GameManager.bubbleArray = [];
    this.gameManager.isWallPresent = level.isWallPresent;

    for (let i = 0; i < level.Bubbles.length; i++) {
      const bubbleConfig = level.Bubbles[i];
      const bubbleCenterX = bubbleConfig.centerX;

      //check if bubble is at the left or right side of wall
      if (bubbleCenterX >= Wall.posX + WALL_WIDTH) {
        this.gameManager.isBubbleToWallRight = true;
      }
      this.bubble = new Bubble(
        this.gameManager.ctx,
        i,
        bubbleConfig.radius,
        bubbleCenterX,
        bubbleConfig.centerY,
      );
      GameManager.bubbleArray.push(this.bubble);
    }

    this.gameManager.initialSetup();
  }
}

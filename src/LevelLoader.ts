import { GameManager } from "./GameManager";
import { Bubble } from "./components/Bubble";
import { Wall } from "./components/Wall";
import { LEVEL_ONE,LEVEL_TWO, LEVEL_THREE, LEVEL_FOUR, LEVEL_FIVE } from "./utils/levels";

export class LevelLoader {
  private gameManager: GameManager;
  public levels: any[];
  private currentLevelIndex: number;
  private bubble?: Bubble;
  wall?: Wall;
  level: number;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.levels = [LEVEL_ONE, LEVEL_TWO, LEVEL_THREE, LEVEL_FOUR, LEVEL_FIVE];
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
    GameManager.walls = [];
    this.gameManager.isWallPresent = level.isWallPresent;

    for (let i = 0; i < level.Bubbles.length; i++) {
      const bubbleConfig = level.Bubbles[i];
      const bubbleCenterX = bubbleConfig.centerX;

      this.bubble = new Bubble(
        this.gameManager.ctx,
        i,
        bubbleConfig.radius,
        bubbleCenterX,
        bubbleConfig.centerY
      );
      GameManager.bubbleArray.push(this.bubble);
    }

    // Load walls
    if (level.wallsPosX && level.wallsPosX.length > 0) {
      level.wallsPosX.forEach((wallX: number) => {
        const wall = new Wall(this.gameManager.ctx, wallX);
        GameManager.walls.push(wall);
      });
    }

    this.gameManager.initialSetup();
  }
}

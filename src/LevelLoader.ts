import { GameManager } from "./GameManager";
import { LEVEL_ONE, LEVEL_TWO, LEVEL_THREE } from './constants'

import { Bubble } from "./components/Bubble";

export class LevelLoader {
    private gameManager: GameManager;
    private levels: any[];
    private currentLevelIndex: number;
    private bubble ?: Bubble;

    constructor(gameManager: GameManager ) {
        this.gameManager = gameManager;
        this.levels = [LEVEL_ONE, LEVEL_TWO, LEVEL_THREE];
        this.currentLevelIndex = 0;
   
    }

    loadLevel(levelIndex: number) {
        const level = this.levels[levelIndex];
        this.applyLevelConfig(level);
        this.currentLevelIndex = levelIndex;
    }

    loadNextLevel() {
        const nextLevelIndex = this.currentLevelIndex + 1;
        if (nextLevelIndex < this.levels.length) {
            this.loadLevel(nextLevelIndex);
            this.gameManager.resetTimer();
        } else {
            return;
        }
    }

    private applyLevelConfig(level: any) {
        this.gameManager.bgImage = new Image();
        this.gameManager.bgImage.src = level.BG_IMG_SRC;
        this.gameManager.numberOfBubbles = level.BUBBLES_COUNT;
        this.gameManager.bubbleArray = [];

        for (let i = 0; i < level.BUBBLES_COUNT; i++) {
            const bubbleRadius = i === 0 ? level.BUBBLE_RADIUS_ONE || level.BUBBLE_RADIUS : level.BUBBLE_RADIUS_TWO || level.BUBBLE_RADIUS;
            this.bubble = new Bubble(
                this.gameManager.ctx,
                i,
                bubbleRadius,
                level.BUBBLE_CENTER_X,
                level.BUBBLE_CENTER_Y
            );
            this.gameManager.bubbleArray.push(this.bubble);
        }

        this.gameManager.initialSetup();
    }
}

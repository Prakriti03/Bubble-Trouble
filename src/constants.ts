import bgImageLevelOne from "/background.png"
import bgImageLevelTwo from "/bgImage2.jpeg"
import bgImageLevelThree from "/bgImage3.jpeg"
// import bgImageLevelFour from "/bgImage4.png"

export const CANVAS_DIMENSIONS={
    CANVAS_HEIGHT : window.innerHeight - 10,
    CANVAS_WIDTH : window.innerWidth-300,
}
export const PLAYER_DIMENSIONS = {
    PLAYER_WIDTH : 31,
    PLAYER_HEIGHT : 55,
}
// export const GRAVITY = 0.7
export const BUBBLE_DY = 3;
export const BUBBLE_DX = 2;
export const BUBBLE_CENTER_X = 50;
export const BUBBLE_CENTER_Y = 150;
// export const BUBBLE_RADIUS = 50;
export const GROUND_HEIGHT = 100;
export const GROUND_X = 0;
export const MAX_BUBBLE_RADIUS = 60;
export const MIN_BUBBLE_RADIUS = 10;
export const DEFAULT_BUBBLE_MAX_POSX = 150;
export const GRAVITY = 0.4;
export const WALL_WIDTH = 40;

export const LEVEL_ONE = {
     BUBBLE_CENTER_X  : WALL_WIDTH+30,
     BUBBLE_CENTER_Y  : 250,
     BUBBLE_RADIUS  : 30,
     BG_IMG_SRC : bgImageLevelOne,
     BUBBLES_COUNT : 1
}
export const LEVEL_TWO = {
    BUBBLE_CENTER_X  : WALL_WIDTH + 60,
    BUBBLE_CENTER_Y  : 250,
    BUBBLE_RADIUS  : 60,
    BG_IMG_SRC : bgImageLevelTwo,
    BUBBLES_COUNT : 1,
}
export const LEVEL_THREE = {
    BUBBLE_CENTER_X  : WALL_WIDTH+25,
    BUBBLE_CENTER_Y  : 250,
    BUBBLE_RADIUS_ONE  : 50,
    BUBBLE_RADIUS_TWO : 30,
    BG_IMG_SRC : bgImageLevelThree,
    BUBBLES_COUNT : 2,
}


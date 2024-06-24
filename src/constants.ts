import bgImageLevelOne from "/background.png";
import bgImageLevelTwo from "/bgImage2.jpeg";
import bgImageLevelThree from "/bgImage3.jpeg";
// import bgImageLevelFour from "/bgImage4.png"

export const CANVAS_DIMENSIONS = {
  CANVAS_HEIGHT: window.innerHeight - 10,
  CANVAS_WIDTH: window.innerWidth - 300,
};
export const PLAYER_DIMENSIONS = {
  PLAYER_WIDTH: 31,
  PLAYER_HEIGHT: 55,
};
// export const GRAVITY = 0.7
export const BUBBLE_DY = 0.5;
export const BUBBLE_DX = 1.5;
export const BUBBLE_CENTER_X = 50;
export const BUBBLE_CENTER_Y = 150;
// export const BUBBLE_RADIUS = 50;
export const GROUND_HEIGHT = 100;
export const GROUND_X = 0;
export const MAX_BUBBLE_RADIUS = 60;
export const MIN_BUBBLE_RADIUS = 10;
export const DEFAULT_BUBBLE_MAX_POSX = 150;
export const GRAVITY = 0.1;
export const WALL_WIDTH = 80;

export const POWER_UPS = {
  WIDTH : 30,
  HEIGHT : 30,
}


export const LEVEL_ONE={
  Bubbles: [ { 
    centerX  : WALL_WIDTH+30,
    centerY  : 250,
    radius  : 10}],
  imageSrc: bgImageLevelOne,
  walls : [{
    posX : 100,
    posY : 200,
    width : 50,
    height : 200
  }
  ],
  isWallPresent : 0,
  level : 1,
}
export const LEVEL_TWO={
  Bubbles: [ { 
    centerX  : WALL_WIDTH+60,
    centerY  : 250,
    radius  : 60}],
  imageSrc: bgImageLevelTwo,
  isWallPresent: 0,
  level : 2,
}
export const LEVEL_THREE={
  Bubbles: [ { 
      centerX  : WALL_WIDTH+30,
      centerY  : 250,
      radius  : 30},
    {
      centerX : 800,
      centerY : 250,
      radius : 50
    }
    ],
  walls: [
    { posX: 150, posY: 250, width: 70, height: 150 },
    { posX: 350, posY: 100, width: 120, height: 120 },
  ],
  imageSrc: bgImageLevelThree,
  isWallPresent: 1,
  level : 3,
}
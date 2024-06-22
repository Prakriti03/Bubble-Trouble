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


export const LEVEL_ONE={
  Bubbles: [ { 
    centerX  : WALL_WIDTH+30,
    centerY  : 250,
    radius  : 30}],
  imageSrc: bgImageLevelOne,
  isWallPresent : false,
  level : 1,
}
export const LEVEL_TWO={
  Bubbles: [ { 
    centerX  : WALL_WIDTH+60,
    centerY  : 250,
    radius  : 60}],
  imageSrc: bgImageLevelTwo,
  isWallPresent: false,
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
  imageSrc: bgImageLevelThree,
  isWallPresent: true,
  level : 3,
}
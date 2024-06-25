import bgImageLevelOne from "/background.png";
import bgImageLevelTwo from "/bgImage2.jpeg";
import bgImageLevelThree from "/bgImage3.jpeg";
import bgImageLevelFour from "/bgImage4.jpeg";
import bgImageLevelFive from "/bgImage5.jpeg"

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
    radius  : 30}],
  imageSrc: bgImageLevelOne,
  wallsPosX : [],
  isWallPresent : 0,
  level : 1,
}
export const LEVEL_TWO={
  Bubbles: [ { 
    centerX  : WALL_WIDTH+60,
    centerY  : 250,
    radius  : 60}],
  imageSrc: bgImageLevelTwo,
  wallsPosX : [],
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
  
  wallsPosX : [600],
  imageSrc: bgImageLevelThree,
  isWallPresent: 0,
  level : 3,
}

export const LEVEL_FOUR={
  Bubbles: [ { 
      centerX  : WALL_WIDTH+60,
      centerY  : 250,
      radius  : 60},
    {
      centerX : 800,
      centerY : 250,
      radius : 50
    }
    ],
  
  wallsPosX : [700],
  imageSrc: bgImageLevelFour,
  isWallPresent: 0,
  level : 4,
}

export const LEVEL_FIVE={
  Bubbles: [ { 
      centerX  : WALL_WIDTH+30,
      centerY  : 250,
      radius  : 30},
    {
      centerX : 400,
      centerY : 250,
      radius : 50
    },
    {
      centerX : 820,
      centerY : 250,
      radius : 60,
    }
    ],
  
  wallsPosX : [300, 700],
  imageSrc: bgImageLevelFive,
  isWallPresent: 0,
  level : 5,
}


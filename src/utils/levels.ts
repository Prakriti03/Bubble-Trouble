import bgImageLevelOne from "/background.png";
import bgImageLevelTwo from "/bgImage2.jpeg";
import bgImageLevelThree from "/bgImage3.jpeg";
import bgImageLevelFour from "/bgImage4.jpeg";
import bgImageLevelFive from "/bgImage5.jpeg";
import { WALL_WIDTH } from "../constants";

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
  
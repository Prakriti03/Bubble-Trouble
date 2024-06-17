// import { Bubble } from "../components/Bubble";
// import { Arrow } from "../components/Arrow";



// export function collisionDetection(ctx:CanvasRenderingContext2D): boolean{
//     const arrow = new Arrow(ctx);
//     const bubble = new Bubble(ctx, 1, 40);
//   //check collision between bubble and arrow
//     if (
//         arrow!.posX >= bubble!.centerX - bubble!.radius &&
//         arrow!.posX <= bubble!.centerX + bubble!.radius
//     ) {
//         console.log("inside first collision loop!!!!!")
//         // Check if the arrow's Y position is within the bubble's vertical bounds
//         if (arrow!.posY <= bubble!.centerY + bubble!.radius) {
//         console.log("Split the ballsss!!!!")
//         return true;
//         }
//     }
//     return false;
// }

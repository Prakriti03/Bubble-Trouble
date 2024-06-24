export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export function checkCollision(
  firstX: number,
  firstY: number,
  firstWidth: number,
  firstHeight: number,
  secondX: number,
  secondY: number,
  secondWidth: number,
  secondHeight: number
) {
  return (
    firstX < secondX + secondWidth &&
    firstX + firstWidth > secondX &&
    firstY < secondY + secondHeight &&
    firstY + firstHeight > secondY
  );
}

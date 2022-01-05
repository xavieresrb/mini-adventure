const WORLD = {
  ROAD: 0,
  WALL: 1,
  PLAYER_START: 2,
  GOAL: 3,
  TREE: 4,
  FLAG: 5,
};

const WORLD_W = 40;
const WORLD_H = 40;
const WORLD_COLS = 20;
const WORLD_ROWS = 15;
const WORLD_GAP = 2;

// prettier-ignore
const LEVEL_ONE = [
        4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
        4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 1, 1, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 2, 5, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
        1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        4, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4
      ];

let worldGrid;

function colRowToIndex(col, row) {
  return WORLD_COLS * row + col;
}

function posXToCol(posX) {
  return Math.floor(posX / WORLD_W);
}

function posYToRow(posY) {
  return Math.floor(posY / WORLD_H);
}

function getTileTypeAtColRow(col, row) {
  if (col >= 0 && col < WORLD_COLS && row >= 0 && row < WORLD_ROWS) {
    var worldIndexUnderCoord = colRowToIndex(col, row);
    return worldGrid[worldIndexUnderCoord];
  } else {
    return WORLD_WALL;
  }
}

function getTileTypeAtPositionXY(x, y) {
  const warriorCol = posXToCol(x);
  const warriorRow = posYToRow(y);

  if (
    warriorCol >= 0 &&
    warriorCol < WORLD_COLS &&
    warriorRow >= 0 &&
    warriorRow < WORLD_ROWS
  ) {
    const tileHere = getTileTypeAtColRow(warriorCol, warriorRow);

    return tileHere;
  } // end of valid col and row

  return WORLD_WALL;
}

function drawWorld() {
  let index = 0;
  let drawTileX = 0;
  let drawTileY = 0;

  for (let row = 0; row < WORLD_ROWS; row++) {
    for (let col = 0; col < WORLD_COLS; col++) {
      const tileType = worldGrid[index];
      const imgCandidate = worldPics[tileType];

      canvasContext.drawImage(imgCandidate, drawTileX, drawTileY);
      drawTileX = drawTileX + WORLD_W;
      index = index + 1;
    }
    drawTileX = 0;
    drawTileY = drawTileY + WORLD_H;
  }
}

const WORLD = {
  GROUND: 0,
  WALL: 1,
  PLAYER_START: 2,
  GOAL: 3,
  KEY: 4,
  DOOR: 5,
};

const TILES_WITH_TRANSPARENCY = [WORLD.GOAL, WORLD.KEY, WORLD.DOOR];

const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;
const WORLD_GAP = 2;

// prettier-ignore
const LEVEL_ONE = [
  4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 1,
  1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
  1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 1,
  1, 0, 0, 1, 3, 3, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
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
    return WORLD.WALL;
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

  return WORLD.WALL;
}

function tileTypeHasTransparency(tileType) {
  return TILES_WITH_TRANSPARENCY.includes(tileType);
}

function drawWorld() {
  let index = 0;
  let drawTileX = 0;
  let drawTileY = 0;

  for (let row = 0; row < WORLD_ROWS; row++) {
    for (let col = 0; col < WORLD_COLS; col++) {
      const tileType = worldGrid[index];
      const imgCandidate = worldPics[tileType];

      if (tileTypeHasTransparency(tileType)) {
        canvasContext.drawImage(worldPics[WORLD.GROUND], drawTileX, drawTileY);
      }

      if (imgCandidate) {
        canvasContext.drawImage(imgCandidate, drawTileX, drawTileY);
      } else {
        console.log('Warning: Invalid tile type in index', index, 'row', row, 'col', col);
      }

      drawTileX = drawTileX + WORLD_W;
      index = index + 1;
    }
    drawTileX = 0;
    drawTileY = drawTileY + WORLD_H;
  }
}

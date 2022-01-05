const TRACK = {
  ROAD: 0,
  WALL: 1,
  PLAYER_START: 2,
  GOAL: 3,
  TREE: 4,
  FLAG: 5,
};

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACK_GAP = 2;

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

let trackGrid;

function colRowToIndex(col, row) {
  return TRACK_COLS * row + col;
}

function posXToCol(posX) {
  return Math.floor(posX / TRACK_W);
}

function posYToRow(posY) {
  return Math.floor(posY / TRACK_H);
}

function getTileTypeAtColRow(col, row) {
  if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
    const trackIndex = colRowToIndex(col, row);

    return trackGrid[trackIndex];
  }
  return TRACK.WALL;
}

function warriorTrackHandler(warrior) {
  const warriorTrackCol = posXToCol(warrior.x);
  const warriorTrackRow = posYToRow(warrior.y);

  if (
    warriorTrackCol >= 0 &&
    warriorTrackCol < TRACK_COLS &&
    warriorTrackRow >= 0 &&
    warriorTrackRow < TRACK_ROWS
  ) {
    const tileHere = getTileTypeAtColRow(warriorTrackCol, warriorTrackRow);
    if (tileHere === TRACK.GOAL) {
      console.log(`${warrior.name} has WOOOOOOON!!!`);
      loadLevel(LEVEL_ONE);
    } else if (tileHere !== TRACK.ROAD) {
      warrior.x = warrior.x - Math.cos(warrior.angle) * warrior.speed;
      warrior.y = warrior.y - Math.sin(warrior.angle) * warrior.speed;
      warrior.speed *= -0.5;
    }
  }
}

function drawTracks() {
  let index = 0;
  let drawTileX = 0;
  let drawTileY = 0;

  for (let row = 0; row < TRACK_ROWS; row++) {
    for (let col = 0; col < TRACK_COLS; col++) {
      const tileType = trackGrid[index];
      const imgCandidate = trackPics[tileType];

      canvasContext.drawImage(imgCandidate, drawTileX, drawTileY);
      drawTileX = drawTileX + TRACK_W;
      index = index + 1;
    }
    drawTileX = 0;
    drawTileY = drawTileY + TRACK_H;
  }
}

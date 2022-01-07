const PLAYER_MOVE_SPEED = 15.0;

function warriorClass() {
  this.x = 175;
  this.y = 175;

  this.image;
  this.name = 'Untitled warrior';
  this.warriorKeysHeld = 0;

  this.keyHeld = {
    north: false,
    east: false,
    south: false,
    west: false,
  };

  this.setupInput = function ({ north, east, south, west }) {
    this.keyControl = {
      north,
      east,
      south,
      west,
    };
  };

  this.reset = function (image, warriorName) {
    this.image = image;
    this.name = warriorName;
    this.warriorKeysHeld = 0;

    for (let row = 0; row < WORLD_ROWS; row++) {
      for (let col = 0; col < WORLD_COLS; col++) {
        const index = colRowToIndex(col, row);

        if (worldGrid[index] === WORLD.PLAYER_START) {
          worldGrid[index] = WORLD.GROUND;

          this.x = col * WORLD_W + WORLD_W / 2;
          this.y = row * WORLD_H + WORLD_H / 2;
          return;
        }
      }
    }
    console.log('Warning: no player start found!');
  };

  this.updateKeyReadout = function () {
    document.getElementById('debugText').innerHTML = 'Keys: ' + this.warriorKeysHeld;
  };

  this.move = function () {
    let nextX = this.x;
    let nextY = this.y;

    if (this.keyHeld.north) {
      nextY = nextY - PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld.east) {
      nextX = nextX + PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld.south) {
      nextY = nextY + PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld.west) {
      nextX = nextX - PLAYER_MOVE_SPEED;
    }

    const walkIntoTileTypeIndex = getTileTypeAtPositionXY(nextX, nextY);
    const walkIntoTileIndex = posXYtoIndex(nextX, nextY);

    if (walkIntoTileTypeIndex === WORLD.GOAL) {
      console.log(this.name + ' has completed the level!');
      loadLevel(LEVEL_ONE);
    } else if (walkIntoTileTypeIndex === WORLD.GROUND) {
      this.x = nextX;
      this.y = nextY;
    } else if (walkIntoTileTypeIndex === WORLD.DOOR) {
      if (this.warriorKeysHeld > 0) {
        this.warriorKeysHeld = this.warriorKeysHeld - 1;
        this.updateKeyReadout();
        worldGrid[walkIntoTileIndex] = WORLD.GROUND;
      }
    } else if (walkIntoTileTypeIndex === WORLD.KEY) {
      this.warriorKeysHeld = this.warriorKeysHeld + 1;
      this.updateKeyReadout();
      worldGrid[walkIntoTileIndex] = WORLD.GROUND;
    }
  };

  this.draw = function () {
    drawBitMapCenteredWithRotation(this.image, this.x, this.y, 0);
  };
}

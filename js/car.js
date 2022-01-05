const CAR_SIZE = 14;
const CAR_RADIUS = CAR_SIZE / 2;
const GROUND_SPEED_DECAY_MULT = 0.95;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function carClass() {
  this.x = 175;
  this.y = 175;
  this.angle = 0;
  this.speed = 0;
  this.image;
  this.name = 'Untitled car';

  this.keyHeld = {
    gas: false,
    reverse: false,
    turnLeft: false,
    turnRight: false,
  };

  this.setupInput = function ({ up, right, down, left }) {
    this.keyControl = {
      up,
      right,
      down,
      left,
    };
  };

  this.reset = function (image, carName) {
    this.image = image;
    this.name = carName;
    this.speed = 0;
    this.angle = -Math.PI / 2;
    for (let row = 0; row < TRACK_ROWS; row++) {
      for (let col = 0; col < TRACK_COLS; col++) {
        const index = colRowToIndex(col, row);

        if (trackGrid[index] === TRACK.PLAYER_START) {
          trackGrid[index] = TRACK.ROAD;
          this.angle = -Math.PI / 2;
          this.x = col * TRACK_W + TRACK_W / 2;
          this.y = row * TRACK_H + TRACK_H / 2;
          return;
        }
      }
    }
    console.log('Warning: no player start found!');
  };

  this.move = function () {
    this.speed *= GROUND_SPEED_DECAY_MULT;

    if (this.keyHeld.gas) {
      this.speed += DRIVE_POWER;
    }
    if (this.keyHeld.reverse) {
      this.speed -= REVERSE_POWER;
    }
    if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
      if (this.keyHeld.turnLeft) {
        this.angle -= TURN_RATE;
      }
      if (this.keyHeld.turnRight) {
        this.angle += TURN_RATE;
      }
    }

    this.x = this.x + Math.cos(this.angle) * this.speed;
    this.y = this.y + Math.sin(this.angle) * this.speed;

    carTrackHandler(this);
  };

  this.draw = function () {
    drawBitMapCenteredWithRotation(this.image, this.x, this.y, this.angle);
  };
}

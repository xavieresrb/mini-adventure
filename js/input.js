const KEYS = {
  ARROWS: {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  },
  WASD: {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  },
};

let mouseX = 0;
let mouseY = 0;

function keySet(event, car, setTo) {
  if (event.keyCode === car.keyControl.left) {
    car.keyHeld.turnLeft = setTo;
  }
  if (event.keyCode === car.keyControl.right) {
    car.keyHeld.turnRight = setTo;
  }
  if (event.keyCode === car.keyControl.up) {
    car.keyHeld.gas = setTo;
  }
  if (event.keyCode === car.keyControl.down) {
    car.keyHeld.reverse = setTo;
  }
}

function keyPressed(event) {
  keySet(event, blueCar, true);
}

function keyReleased(event) {
  keySet(event, blueCar, false);
}

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  blueCar.setupInput({
    up: KEYS.ARROWS.UP,
    right: KEYS.ARROWS.RIGHT,
    down: KEYS.ARROWS.DOWN,
    left: KEYS.ARROWS.LEFT,
  });
}

function updateMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}

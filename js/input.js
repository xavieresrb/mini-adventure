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

function keySet(event, warrior, setTo) {
  if (event.keyCode === warrior.keyControl.left) {
    warrior.keyHeld.turnLeft = setTo;
  }
  if (event.keyCode === warrior.keyControl.right) {
    warrior.keyHeld.turnRight = setTo;
  }
  if (event.keyCode === warrior.keyControl.up) {
    warrior.keyHeld.gas = setTo;
  }
  if (event.keyCode === warrior.keyControl.down) {
    warrior.keyHeld.reverse = setTo;
  }
}

function keyPressed(event) {
  keySet(event, warrior, true);
}

function keyReleased(event) {
  keySet(event, warrior, false);
}

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  warrior.setupInput({
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

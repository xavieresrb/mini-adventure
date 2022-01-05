const KEYS = {
  ARROWS: {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  },
};

let mouseX = 0;
let mouseY = 0;

function keySet(event, setTo) {
  console.log('event works', event.keyCode);
  if (event.keyCode === blueWarrior.keyControl.north) {
    blueWarrior.keyHeld.north = setTo;
  }
  if (event.keyCode === blueWarrior.keyControl.east) {
    blueWarrior.keyHeld.east = setTo;
  }
  if (event.keyCode === blueWarrior.keyControl.south) {
    blueWarrior.keyHeld.south = setTo;
  }
  if (event.keyCode === blueWarrior.keyControl.west) {
    blueWarrior.keyHeld.west = setTo;
  }
}

function keyPressed(event) {
  keySet(event, true);
}

function keyReleased(event) {
  keySet(event, false);
}

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  blueWarrior.setupInput({
    north: KEYS.ARROWS.UP,
    east: KEYS.ARROWS.RIGHT,
    south: KEYS.ARROWS.DOWN,
    west: KEYS.ARROWS.LEFT,
  });
}

function updateMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}

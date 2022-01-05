const FRAMES_PER_SECOND = 30;

let canvas, canvasContext;

let warrior = new warriorClass();

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  loadImages();
};

function launchGame() {
  setInterval(updateAll, 1000 / FRAMES_PER_SECOND);

  setupInput();

  loadLevel(LEVEL_ONE);
}

function loadLevel(levelMap) {
  trackGrid = [...levelMap];

  warrior.reset(warriorPic, 'Warrior');
}

function moveAll() {
  warrior.move();
}

function logData() {
  const mouseTrackCol = Math.floor(mouseX / TRACK_W);
  const mouseTrackRow = Math.floor(mouseY / TRACK_H);
  const index = colRowToIndex(mouseTrackCol, mouseTrackRow);
  colorText(
    `i=${index};b=${mouseTrackCol},${mouseTrackRow};c=${mouseX},${mouseY}`,
    mouseX,
    mouseY,
    'yellow'
  );
}

function drawAll() {
  drawTracks();
  warrior.draw();
  logData();
}

function updateAll() {
  moveAll();
  drawAll();
}

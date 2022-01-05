const FRAMES_PER_SECOND = 30;

let canvas, canvasContext;

let blueWarrior = new warriorClass();

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
  worldGrid = [...levelMap];

  blueWarrior.reset(warriorPic, 'Warrior');
}

function moveAll() {
  blueWarrior.move();
}

function logData() {
  const mouseWorldCol = Math.floor(mouseX / WORLD_W);
  const mouseWorldRow = Math.floor(mouseY / WORLD_H);
  const index = colRowToIndex(mouseWorldCol, mouseWorldRow);
  colorText(
    `i=${index};b=${mouseWorldCol},${mouseWorldRow};c=${mouseX},${mouseY}`,
    mouseX,
    mouseY,
    'yellow'
  );
}

function drawAll() {
  drawWorld();
  blueWarrior.draw();
  logData();
}

function updateAll() {
  moveAll();
  drawAll();
}

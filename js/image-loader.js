const warriorPic = document.createElement('img');

const worldPics = [];

const IMAGES_FOLDER = 'images';
const IMAGES_LIST = [
  {
    varName: warriorPic,
    fileName: 'warrior.png',
  },
  {
    worldType: WORLD.ROAD,
    fileName: 'world_road.png',
  },
  {
    worldType: WORLD.WALL,
    fileName: 'world_wall.png',
  },
  {
    worldType: WORLD.GOAL,
    fileName: 'world_goal.png',
  },
  {
    worldType: WORLD.TREE,
    fileName: 'world_tree.png',
  },
  {
    worldType: WORLD.FLAG,
    fileName: 'world_flag.png',
  },
];

function loadImages() {
  let picsToLoad = IMAGES_LIST.length;

  function loadImageHandler() {
    picsToLoad--;

    if (picsToLoad === 0) {
      launchGame();
    }
  }

  function setImage(image, fileName) {
    image.onload = loadImageHandler;
    image.src = `${IMAGES_FOLDER}/${fileName}`;
  }

  function setWorldImage(worldType, fileName) {
    worldPics[worldType] = document.createElement('img');
    setImage(worldPics[worldType], fileName);
  }

  IMAGES_LIST.forEach((img) => {
    if (img.varName) {
      setImage(img.varName, img.fileName);
    } else {
      setWorldImage(img.worldType, img.fileName);
    }
  });
}

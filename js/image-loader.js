const carPic = document.createElement('img');

const trackPics = [];

const IMAGES_FOLDER = 'images';
const IMAGES_LIST = [
  {
    varName: carPic,
    fileName: 'player1car.png',
  },
  {
    trackType: TRACK.ROAD,
    fileName: 'track_road.png',
  },
  {
    trackType: TRACK.WALL,
    fileName: 'track_wall.png',
  },
  {
    trackType: TRACK.GOAL,
    fileName: 'track_goal.png',
  },
  {
    trackType: TRACK.TREE,
    fileName: 'track_tree.png',
  },
  {
    trackType: TRACK.FLAG,
    fileName: 'track_flag.png',
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

  function setTrackImage(trackType, fileName) {
    trackPics[trackType] = document.createElement('img');
    setImage(trackPics[trackType], fileName);
  }

  IMAGES_LIST.forEach((img) => {
    if (img.varName) {
      setImage(img.varName, img.fileName);
    } else {
      setTrackImage(img.trackType, img.fileName);
    }
  });
}

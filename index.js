// board
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns; // 32 * 16
let boardHeight = tileSize * rows; // 32 * 16
let context;

//ship
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = (tileSize * columns) / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
  x: shipX,
  y: shipY,
  width: shipWidth,
  height: shipHeight,
};

let shipImg;
let shipVelocityX = tileSize; // ship movement speed

// aliens
let alienArray = [];
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0; //number of aliens to defeat
let alienVelocityX = 1; // movement speed for aliens

window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d"); // used for drawing on the board

  //draw initial ship
  //   context.fillStyle="purple";
  //context.fillRect(ship.x, ship.y, ship.width, ship.height);

  // load img's
  shipImg = new Image();
  shipImg.src = "assets/ship.png";
  shipImg.onload = function () {
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
  };

  requestAnimationFrame(update);
  document.addEventListener("keydown", moveShip);

  alienImg = new Image();
  alienImg.src = "assets/alien.png";
  createAliens();
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  //ship
  context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

  // aliens
  for (let i = 0; i < alienArray.length; i++) {
    let alien = alienArray[i];
    if (alien.alive) {
      alien.x += alienVelocityX;
      // if alien touches the borders
      if (alien.x + alien.width >= board.width | alien.x <= 0) {
        alienVelocityX *= -1;
        alien.x += alienVelocityX*2;
        
        // move all aliens up by one row
        for (let j = 0; j < alienArray.length; j++) {
          alienArray[j].y += alienHeight;
        }
      }
      context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
    }
  }
}

function moveShip(e) {
  if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0) {
    ship.x -= shipVelocityX; // moves the ship to the left
  } else if (
    e.code == "ArrowRight" &&
    ship.x + shipVelocityX + ship.width <= board.width
  ) {
    ship.x += shipVelocityX; // moves the ship to the right
  }
}

function createAliens() {
  for (let c = 0; c < alienColumns; c++) {
    for (let r = 0; r < alienRows; r++) {
      let alien = {
        img : alienImg,
        x : alienX + c*alienWidth,
        y : alienY + r*alienHeight,
        width: alienWidth,
        height : alienHeight,
        alive : true  
      }
      alienArray.push(alien);

    }
  }
  alienCount = alienArray.length;
}
//there are 2 rows of aliens and in each row there are 3 aliens
// each alien has a height and width of 1 tile size and a width of 2 tile sizes

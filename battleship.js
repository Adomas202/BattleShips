// set grid rows and columns and the size of each square
var squareSize = 50;
var rows = 10;
var cols = 10;
var ships;
var gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

document.getElementById("buttonShips").addEventListener("click", generateShips);

function generateShips() {
  ships = document.getElementById("ships").value;

  var randomas = [ships];
  for (i = 0; i < ships; i++) {
    randomas[i] = Math.floor((Math.random()*10));
    console.log(randomas[i]);
  }
  var shipCounter = ships;

  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      if (randomas[j] > 5) { // 50% probability of the ship beeing there
        if (shipCounter != 0) {
          if ((i + j )%2 == 0) { // Increase randomnes
              gameBoard[i][j] = 1;
          } else {
            gameBoard[j][i] = 1;
          }
          shipCounter--;
        }
      } else {
        gameBoard[i][j] = 0;
      }
    }
  }
}

var gameBoardContainer = document.getElementById("gameboard");

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      var square = document.createElement("div");
      gameBoardContainer.appendChild(square);
      square.id = 'd' + j + i;
      var topPosition = j * squareSize;
      var leftPosition = i * squareSize;

      square.style.top = topPosition + 'px';
      square.style.left = leftPosition + 'px';
    }
  }
  var hitCount = 0;

gameBoardContainer.addEventListener("click", fireTorpedo, false);

function fireTorpedo(event) {

    // Use substring to get first row then col id
    var row = event.target.id.substring(1,2);
    var col = event.target.id.substring(2,3);

    // if player clicks a square with no ship, change the color and change square's value
    if (gameBoard[row][col] == 0) {
      event.target.style.background = 'grey';
      gameBoard[row][col] = 3; // Shot and missed

    } else if (gameBoard[row][col] == 1) {
      event.target.style.background = 'red';
      gameBoard[row][col] = 2; // Shot and was lucky

      // increment hitCount each time a ship is hit
      hitCount++;
      if (hitCount == ships) {
        alert("You defeated all ships!");
      }

    } else if (gameBoard[row][col] > 1) {
      alert("You just shot there");
    }
  event.stopPropagation();
}

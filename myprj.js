var userChar = null;
var compChar = null;

var corner = [0, 2, 6, 8];
var khachik = [1, 3, 5, 7];

var boardGame = new Array(9);
var tmpBoardGame = new Array(9);
var emptySquares = [];


for (var i = 0; i < 9; i++) {
  emptySquares.push(i);
}


function createBoard() {
  var boardElement = document.getElementById('board');
  var boardHtml = '';

  for(var i = 0; i < 9; i++){
    boardHtml += '<div class="square" id="sq' + i + '" onclick="move(' + i + ')"></div>'
  }

  boardElement.innerHTML = boardHtml;
}

function choosePlayer(X) {
  userChar = X;

  document.getElementById('buttons').style.visibility = 'hidden';
  createBoard();

  if(userChar == 'X')
    compChar = 'O';
  else {
    compChar = 'X';
    placeChar(4, compChar);
  }


}

function move(squareIndex) {

  if(boardGame[squareIndex]) return;

  placeChar(squareIndex, userChar);

  var compIndex = null;

  for (var i = 0; i < boardGame.length; i++) {
    tmpBoardGame = JSON.parse(JSON.stringify(boardGame));
    tmpBoardGame[i] = compChar;

    if(checkWinner(tmpBoardGame, compChar) && !boardGame[i]) {
      placeChar(i, compChar);
      compIndex = i;
      return;
    }
  }

  for (var i = 0; i < boardGame.length; i++) {
    tmpBoardGame = JSON.parse(JSON.stringify(boardGame));
    tmpBoardGame[i] = userChar;

    if(checkWinner(tmpBoardGame, userChar) && !boardGame[i]) {
      placeChar(i, compChar);
      compIndex = i;
      return;
    }
  }

  if(!boardGame[4]) {
    placeChar(4, compChar);
    return;
  }

  if(corner.length > 0) {
    var randIndex = Math.floor(Math.random() * corner.length);

    placeChar(corner[randIndex], compChar);
    corner.splice(randIndex, 1);
    return;
  }

  if(khachik.length > 0) {
    var randIndex = Math.floor(Math.random() * khachik.length);

    placeChar(khachik[randIndex], compChar);
    khachik.splice(randIndex, 1);
    return;
  }

}
function placeChar(index, char) {

  if(corner.indexOf(index) != -1) {
    corner.splice(corner.indexOf(index), 1);
  }

  if(khachik.indexOf(index) != -1) {
    khachik.splice(khachik.indexOf(index), 1);
  }

  var square = document.getElementById('sq' + index);
  boardGame[index] = char;
  emptySquares.splice(emptySquares.indexOf(index), 1);
  square.classList.add(char);

  if(checkWinner(boardGame, userChar)){
    alert("You win!");
    reset();
  }
  else if (checkWinner(boardGame, compChar)) {
    alert("You lose!");
    reset();
  }
  else if(emptySquares.length === 0){
    alert("It's a draw!")
    reset();
  }

}

function randomChoice(squareIndex){
  var rand = emptySquares[squareIndex];
  if(emptySquares.length == 0){
    return -1;
  }
  return Math.floor(Math.random() * 9);

}

function checkWinner(newBoard, char) {
  if(newBoard[0] == char && newBoard[1] == char && newBoard[2] == char)       return true;
  if(newBoard[0] == char && newBoard[3] == char && newBoard[6] == char)       return true;
  if(newBoard[0] == char && newBoard[4] == char && newBoard[8] == char)       return true;
  if(newBoard[1] == char && newBoard[4] == char && newBoard[7] == char)       return true;
  if(newBoard[2] == char && newBoard[5] == char && newBoard[8] == char)       return true;
  if(newBoard[2] == char && newBoard[4] == char && newBoard[6] == char)       return true;
  if(newBoard[3] == char && newBoard[4] == char && newBoard[5] == char)       return true;
  if(newBoard[6] == char && newBoard[7] == char && newBoard[8] == char)       return true;

  return false;
}

function reset() {
  location.reload();
}

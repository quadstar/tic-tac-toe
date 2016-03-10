var boardCheck = function(board, placedPiece){
  var player = board[placedPiece[0]][placedPiece[1]];
  var win = false;
  win = checkHorizontal(board[placedPiece[0]], player);
  return win;
}

var checkHorizontal = function(row, player){
  for(var i = 0; i < row.length; i++){
    if(row[i] !== player){
      return false;
    }
  }
  return true;
}

var checkColumn = function(col){

}

var checkMajorDiag = function(diag, length){

}

var checkMinorDiag = function(diag, length){

}

var checkBoardFilled = function(board){

}

// no win
var board1 = [ [ ' ', ' ', 'X' ], [ ' ', ' ', ' ' ], [ ' ', ' ', ' ' ] ]

// x win
var board2 = [ [ 'X', 'X', 'X' ], [ ' ', ' ', ' ' ], [ ' ', ' ', ' ' ] ]

// x win
var board3 = [ [ 'X', ' ', ' ' ], [ ' ', 'X', ' ' ], [ ' ', ' ', 'X' ] ]

// no win
var board4 = [ [ 'X', ' ', ' ' ], [ ' ', 'O', ' ' ], [ ' ', ' ', 'X' ] ]

//tie
var board5 = [ [ 'X', 'X', 'O' ], [ 'O', 'O', 'X' ], [ 'X', 'O', 'X' ] ]

module.exports = boardCheck
// debug(boardCheck(board1, '02'));
// debug(boardCheck(board2, '02'));
// debug(boardCheck(board3));
// debug(boardCheck(board4));
// debug(boardCheck(board5));


var boardCheck = function(board, placedPiece){
  var player = board[placedPiece[0]][placedPiece[1]];
  var win = false;

  var rowWin = checkHorizontal(board[placedPiece[0]], player);
  var colWin = checkVertical(placedPiece[1], board, player);

  return rowWin || colWin || false;
}

var checkHorizontal = function(row, player){
  for(var i = 0; i < row.length; i++){
    if(row[i] !== player){
      return false;
    }
  }
  return true;
}

var checkVertical = function(col, board, player){
  for(var i = 0; i < board.length; i++){
    if(board[i][col] !== player){
      return false;
    }
  }

  return true;
}

var checkMajorDiag = function(diag, length, player){

}

var checkMinorDiag = function(diag, length, player){

}

var checkBoardFilled = function(board){

}

// no win
var board1 = [ [ ' ', ' ', 'X' ], [ ' ', ' ', ' ' ], [ ' ', ' ', ' ' ] ]

// x win horizontal
var board2 = [ [ 'X', 'X', 'X' ], [ ' ', ' ', ' ' ], [ ' ', ' ', ' ' ] ]

// x win diag major
var board3 = [ [ 'X', ' ', ' ' ], [ ' ', 'X', ' ' ], [ ' ', ' ', 'X' ] ]

// x win diag minor
var board7 = [ [ ' ', ' ', 'X' ], [ ' ', 'X', ' ' ], [ 'X', ' ', ' ' ] ]

// no win
var board4 = [ [ 'X', ' ', ' ' ], [ ' ', 'O', ' ' ], [ ' ', ' ', 'X' ] ]

//tie
var board5 = [ [ 'X', 'X', 'O' ], [ 'O', 'O', 'X' ], [ 'X', 'O', 'X' ] ]

// x win verical
var board6 = [ [ ' ', ' ', 'X' ], [ ' ', ' ', 'X' ], [ ' ', ' ', 'X' ] ]


module.exports = boardCheck
// debug(boardCheck(board1, '02'));
// debug(boardCheck(board2, '02'));
// debug(boardCheck(board3));
// debug(boardCheck(board4));
// debug(boardCheck(board5));
// debug(boardCheck(board6, '02'));


var boardCheck = function(board, placedPiece){
  var player = board[placedPiece[0]][placedPiece[1]];
  var rowWin, colWin, majDiagWin, minDiagWin;
  // check for win conditions
  rowWin = checkHorizontal(board[placedPiece[0]], player);
  colWin = checkVertical(placedPiece[1], board, player);

  // diagonal win must be from corner to corner
  // x and y coordinates along major diagonal are directly proportional
  if(placedPiece[0] === placedPiece[1]){ 
    majDiagWin = checkMajorDiag(board, player);
  }
  // x and y coordinates along minor diagonal are inversely proportional 
  if(parseInt(placedPiece[0]) + parseInt(placedPiece[1]) === board.length-1){ 
    minDiagWin = checkMinorDiag(board, player); 
  }

  // if there is not a win condition met check to see if it is a tie.
  if(!(rowWin || colWin || majDiagWin || minDiagWin || false)){
    return checkBoardFilled(board);
  }
  // if there is a win condition met return true.
  return true
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

var checkMajorDiag = function(board, player){
  for(var i = 0; i < board.length; i++){
    if(board[i][i] !== player){
      return false;
    }
  }
  return true;
}

var checkMinorDiag = function(board, player){
  for(var i = 0, k = board.length-1; i < board.length; i++,k--){
    if(board[i][k] !== player){
      return false;
    }
  }
  return true;
}

var checkBoardFilled = function(board){
  for(var i = 0; i < board.length; i++){
    for(var k = 0; k < board[i].length; k++){
      if(board[i][k] === ' '){
        return false;
      }
    }
  }
  return 'tie';
}

module.exports = boardCheck


/*
*BEGIN TEST*

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
var board5 = [ [ 'X', 'X', ' 0' ], [ 'O', 'O', 'X' ], [ 'X', 'O', 'X' ] ]

// x win verical
var board6 = [ [ ' ', ' ', 'X' ], [ ' ', ' ', 'X' ], [ ' ', ' ', 'X' ] ]

debug(boardCheck(board1, '02')); //=> should equal false
debug(boardCheck(board2, '02')); //=> should equal true
debug(boardCheck(board3, '00')); //=> should equal true
debug(boardCheck(board4, '00')); //=> should equal false
debug(boardCheck(board5, '00')); //=> should equal tie
debug(boardCheck(board6, '02')); //=> should equal true
debug(boardCheck(board7, '02')); //=> should equal true

*END TEST* 
*/


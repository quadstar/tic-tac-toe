var boardCheck = function(board, placedPiece){
  var player = board[placedPiece[0]][placedPiece[1]];
  var rowWin, colWin, majDiagWin, minDiagWin;
  // check for win conditions
  rowWin = checkHorizontal(board[placedPiece[0]], placedPiece[0], player);
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
  // condition equals the first win condition, tie, or false
  var condition = rowWin || colWin || majDiagWin || minDiagWin || checkBoardFilled(board);
  // if there is no winner or a tie return
  if(!condition || condition === 'tie'){
    return condition;
  }
  // otherwise we replace the winning markers with 'W' and send back the board
  var result, winCase = condition.slice(0,3);
  switch(winCase){
    case 'maj':
      for(var i = 0; i < board.length; i++){
        board[i][i] = 'W'
      }
      break;
    case 'min':
      for(var i = 0, k = board.length-1; i < board.length; i++,k--){
        board[i][k] = 'W'
      }
      break;
    case 'col':
      for(var i = 0; i < board.length; i++){
        board[i][condition[3]] = 'W'
      }
      break;
    case 'row':
      for(var i = 0; i < board.length; i++){
        board[condition[3]][i] = 'W'
      }
      break;
    default: 
      break;
  }
  return JSON.stringify(board);

}

var checkHorizontal = function(row, rownum, player){
  for(var i = 0; i < row.length; i++){
    if(row[i] !== player){
      return false;
    }
  }
  return 'row'+rownum;
}

var checkVertical = function(col, board, player){
  for(var i = 0; i < board.length; i++){
    if(board[i][col] !== player){
      return false;
    }
  }
  return 'col'+col;
}

var checkMajorDiag = function(board, player){
  for(var i = 0; i < board.length; i++){
    if(board[i][i] !== player){
      return false;
    }
  }
  return 'maj';
}

var checkMinorDiag = function(board, player){
  for(var i = 0, k = board.length-1; i < board.length; i++,k--){
    if(board[i][k] !== player){
      return false;
    }
  }
  return 'min';
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


var Square  = require('./Square.js');
var NewGame = require('./NewGame.js');

var App = React.createClass({
  getInitialState: function(){
    return {
      turn: 'X',
      rows: [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']],
      status: 'PLAYING'
    };
  },
  // updates marker at square clicked, checks for win condition, changes player turn.
  clickSquare: function(event){
    console.log('Clicked square #', event.target.id); 
    var row = parseInt(event.target.id[0]);
    var col = parseInt(event.target.id[1]);
    var newRows = this.state.rows.slice();
    newRows[row][col] = this.state.turn;
    //sends board to server for validation
    $.ajax({
      url: '/api/board-check',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({played: event.target.id, rows:newRows}),
      success: function(data){
        // if no win condition met continue the game
        if(!data){
          this.setState({turn: this.state.turn === 'X' ? 'O' : 'X'});
        }
        else if(data === 'tie'){
          this.setState({status: 'TIE'});
        }
        // if there is a winner end the game and reveal the win condition.
        else{
          this.setState({status: 'WIN', rows: JSON.parse(data)});
        }
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
    this.setState({
      rows: newRows
    });
  },
  createNewGame: function(boardSize){
    // creates an n x n matrix based on selected board size.
    var rows = [];
    for(var i = 0; i < boardSize; i++){
      var row = [];
      for(var k = 0; k < boardSize; k++){
        row.push(' ');
      }
      rows.push(row);
    }
    // resets board state
    this.setState({
      turn: 'X',
      rows: rows,
      status: 'PLAYING'
    });
  },
  render: function(){
    var that = this;
    var headingMessage;
    var player = this.state.turn === 'X' ? 'Dog' : 'Cat';
    if(this.state.status === 'PLAYING'){
      headingMessage = player + '\'s turn';
    }
    else if(this.state.status === 'WIN'){
      headingMessage = player + ' Wins!';
    }
    else{
      headingMessage = 'It\'s a tie!';
    }
    return (
      <div>
      <div className='heading'>{headingMessage}</div>
        {this.state.rows.map(function(row,rowi, c){
          return (
            <div className='row' key={rowi} id='row'>
            {row.map(function(e,i){ 
              var win = false;
              var marker = e;
              if(e === 'W'){
                win = true;
                marker = that.state.turn;
              }
              return (<Square marker={marker} win={win} status={that.state.status} clickSquare={that.clickSquare} key={rowi*c.length+i} id={''+rowi+i} />);
            })}
            </div> 
          );
        })}
        <NewGame createNewGame={this.createNewGame} />
      </div>
    );
  }
});

module.exports = App

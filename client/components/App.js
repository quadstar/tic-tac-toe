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
    // TODO: check for win condition
    $.ajax({
      url: '/api/board-check',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({played: event.target.id, rows:newRows}),
      success: function(data){
        console.log(data);
        if(!data){
          this.setState({turn: this.state.turn === 'X' ? 'O' : 'X'});
        }
        else if(data === 'tie'){
          this.setState({status: 'TIE'});
        }
        else{
          this.setState({status: 'WIN'});
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
    this.setState({
      turn: 'X',
      rows: rows
    });
  },
  render: function(){
    var that = this;
    var headingMessage;
    if(this.state.status === 'PLAYING'){
      headingMessage = this.state.turn + '\'s turn';
    }
    else if(this.state.status === 'WIN'){
      headingMessage = this.state.turn + ' Wins!';
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
              return (<Square marker={e} status={that.state.status} clickSquare={that.clickSquare} key={rowi*c.length+i} id={''+rowi+i} />);
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

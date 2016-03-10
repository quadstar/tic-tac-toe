React = require('react');
ReactDOM = require('react-dom');
classNames = require('classnames');
$ = require('jquery');
var domContainerNode = document.getElementById('content');

var NewGame = React.createClass({
  getInitialState: function(){
    return {boardSize: '3'};
  },
  setBoardSize: function(event){
    this.setState({
      boardSize: event.target.value
    });
    this.props.createNewGame(event.target.value);
  },
  createNewGame: function(){
    this.props.createNewGame(this.state.boardSize);
  },
  render: function(){
    return (
      <div>
        Board Size: <select value={this.state.boardSize} onChange={this.setBoardSize}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <span className="new-button" onClick={this.createNewGame}> New Game </span>
      </div>
    )
  }
});

var Square = React.createClass({
  getInitialState: function(){
    return {};
  },
  clickInvalid: function(){
    alert('You can\'t play there!');
  },
  render: function(){
    var clickfn = this.props.marker === ' ' ? this.props.clickSquare : this.clickInvalid;
    var styleClass = classNames('square', this.props.marker === ' ' ? 'empty': 'filled');   
    return (
      <div className={styleClass} onClick={clickfn} id={this.props.id}>
        {this.props.marker}
      </div>
    )
  }
});

var Main = React.createClass({
  getInitialState: function(){
    return {
      turn: 'X',
      rows: [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']]
    };
  },
  // updates marker at square clicked, checks for win condition, changes player turn.
  clickSquare: function(event){
    console.log('Clicked square #', event.target.id); 
    var row = parseInt(event.target.id[0]);
    var col = parseInt(event.target.id[1]);
    var newRows = this.state.rows.slice();
    newRows[row][col] = this.state.turn;
    var username = 'dog'
    // TODO: check for win condition
    $.ajax({
      url: '/api/board-check',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newRows),
      success: function(data){
        console.log(data);
      }.bind(this)
    });
    this.setState({
      turn: this.state.turn === 'X' ? 'O' : 'X',
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
    var clickfn = this.clickSquare;
    return (
      <div>
        {this.state.rows.map(function(row,rowi, c){
          return (
            <div className='row' key={rowi} id='row'>
            {row.map(function(e,i){
              return (<Square marker={e} clickSquare={clickfn} key={rowi*c.length+i} id={''+rowi+i} />);
            })}
            </div> 
          );
        })}
        <NewGame createNewGame={this.createNewGame} />
      </div>
    );
  }
});

ReactDOM.render(<Main />, domContainerNode);

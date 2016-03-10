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

module.exports = NewGame

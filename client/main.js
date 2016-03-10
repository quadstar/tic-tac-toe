React = require('react');
ReactDOM = require('react-dom');
classNames = require('classnames');
$ = require('jquery');
var domContainerNode = document.getElementById('content');

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
  clickSquare: function(event){
    console.log('Clicked square #', event.target.id); 
    var row = parseInt(event.target.id[0]);
    var col = parseInt(event.target.id[1]);
    var newRows = this.state.rows.slice();
    newRows[row][col] = this.state.turn;
    this.setState({
      turn: this.state.turn === 'X' ? 'O' : 'X',
      rows: newRows
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
      </div>
    );
  }
});

ReactDOM.render(<Main />, domContainerNode);

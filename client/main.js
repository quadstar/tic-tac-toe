React = require('react');
ReactDOM = require('react-dom');
classNames = require('classnames');
$ = require('jquery');
var domContainerNode = document.getElementById('content');

var Square = React.createClass({
  getInitialState: function(){
    return {};
  },
  render: function(){
    return (
      <div className='square' onClick={this.props.clickSquare} id={this.props.id}>
        {this.props.marker}
      </div>
    )
  }
});

var Main = React.createClass({
  getInitialState: function(){
    return {
      turn: 'X',
      rows: [[0,0,0],[0,0,0],[0,0,0]]
    };
  },
  clickSquare: function(event){
    console.log('Clicked square #', event.target.id);
  },
  render: function(){
    var clickfn = this.clickSquare;
    return (
      <div>
        {this.state.rows.map(function(row,rowi, c){
          return (
            <div key={rowi} id='row'>
            {row.map(function(e,i){
              return (<Square clickSquare={clickfn} key={rowi*c.length+i} id={rowi*c.length+i} />);
            })}
            </div> 
          );
        })}
      </div>
    );
  }
});

ReactDOM.render(<Main />, domContainerNode);

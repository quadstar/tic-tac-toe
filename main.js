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
    return {turn: 'X'};
  },
  clickSquare: function(event){
    console.log('Clicked square #', event.target.id);
  },
  render: function(){
    return (
      <div>
        <div id='row'>
          <Square clickSquare={this.clickSquare} id='1'/>
          <Square clickSquare={this.clickSquare} id='2'/>
          <Square clickSquare={this.clickSquare} id='3'/>
        </div>
        <div id='row'>
          <Square clickSquare={this.clickSquare} id='4'/>
          <Square clickSquare={this.clickSquare} id='5'/>
          <Square clickSquare={this.clickSquare} id='6'/>
        </div>
        <div id='row'>
          <Square clickSquare={this.clickSquare} id='7'/>
          <Square clickSquare={this.clickSquare} id='8'/>
          <Square clickSquare={this.clickSquare} id='9'/>
        </div>
      </div>
    )
  }
});

ReactDOM.render(<Main />, domContainerNode);

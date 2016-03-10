var Square = React.createClass({
  getInitialState: function(){
    return {};
  },
  clickInvalid: function(){
    alert('You can\'t play there!');
  },
  render: function(){
    var clickfn, styleClass;
    if(this.props.status === 'PLAYING'){
      clickfn = this.props.marker === ' ' ? this.props.clickSquare : this.clickInvalid;
      styleClass = classNames('square', this.props.marker === ' ' ? 'empty': 'filled', this.props.marker);   
    }
    // if game is over reveal the win condition
    else{
      styleClass = classNames('square', this.props.win ? 'winner': 'loser', this.props.marker);
    }
    return (
      <div className={styleClass} onClick={clickfn} id={this.props.id}>
      </div>
    )
  }
});

module.exports = Square

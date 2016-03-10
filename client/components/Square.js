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
      styleClass = classNames('square', this.props.marker === ' ' ? 'empty': 'filled');   
    }
    else{
      styleClass = classNames('square', this.props.marker === 'W' ? 'winner': 'loser');
    }
    return (
      <div className={styleClass} onClick={clickfn} id={this.props.id}>
        {this.props.marker}
      </div>
    )
  }
});

module.exports = Square

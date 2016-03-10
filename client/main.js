React = require('react');
ReactDOM = require('react-dom');
classNames = require('classnames');
$ = require('jquery');
var domContainerNode = document.getElementById('content');
var App = require('./components/App.js');

ReactDOM.render(<App />, domContainerNode);

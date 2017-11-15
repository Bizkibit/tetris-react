import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props)  {
  return (<div className="empty">{props.index}</div>);
}

class Board extends Component {
  constructor(props)  {
    super(props);
    this.renderSquare = this.renderSquare.bind(this);
  }

  renderSquare(i)  {
    return  (
     <Square key={i} index={i}></Square>
    );
  }


  render()  {
    let squares = new Array(150).fill(null);
    squares = squares.map((k,i) => k = this.renderSquare(i))
    return (
    <div id="Board">
      {squares}
    </div>
    )
  }
}

ReactDOM.render(<Board/>, document.getElementById('root'));

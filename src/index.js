import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const shapes = {
  tee(i=5) {
    return [i, i+9, i+10, i+11]
  },
  es(i=4) {
    return [i, i+1, i+9, i+10]
  },
  jay(i=5)  {
    return [i, i+10, i+20, i+19]
  },
  el(i=4)  {
    return [i, i+10, i+20, i+21]
  },
  zed(i=5)  {
    return [i, i-1, i+10, i+11]
  },
  ou(i=4)  {
    return [i, i+1, i+10, i+11]
  },
  eye(i=5)  {
    return [i, i+10, i+20, i+30]
  }
}

function Square(props)  {
  return (<div className={"square "+(props.cls || "")}></div>);
}

class Board extends Component {
  constructor(props)  {
    super(props);
    this.renderSquare = this.renderSquare.bind(this);
    this.state = {
      squares: new Array(150).fill(null)
    }
  }

  renderSquare(i, cls="")  {
    return  (
     <Square key={i} index={i} cls={cls}></Square>
    );
  }

  renderShapes(func, num)  {
    let {squares} = this.state;
    return squares.map((k,i) => k = (func(num).includes(i))?this.renderSquare(i, "full"):this.renderSquare(i))
  }



  render()  {
    return (
    <div id="Board">
      {this.renderShapes(shapes.el,125)}
    </div>
    )
  }
}

ReactDOM.render(<Board/>, document.getElementById('root'));

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const shapes = {
  tee(i=5) {
    return [null, i, null, i+9, i+10, i+11, null, null, null]
  },
  es(i=4) {
    return [null, null, null, null, i, i+1, i+9, i+10, null]
  },
  jay(i=5)  {
    return [null, i, null, null, i+10, null, i+20, i+19, null]
  },
  el(i=4)  {
    return [null, i, null, null, i+10, null, null, i+20, i+21]
  },
  zed(i=5)  {
    return [i, i-1, null, null, i+10, i+11, null, null, null]
  },
  ou(i=4)  {
    return [i, i+1, i+10, i+11]
  },
  eye(i=5)  {
    return [i, i+10, i+20, i+30]
  }
}

function Square(props)  {
  return (<div className={"square "+(props.cls || "")}>{props.index}</div>);
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
    return squares.map((k,i) => k = (rotate90(rotate90(func(num))).includes(i))?this.renderSquare(i, "full"):this.renderSquare(i))
  }

  render()  {
    return (
    <div id="Board">
      {this.renderShapes(shapes.zed, 45)}
    </div>
    )
  }
}

class Game extends Component  {
  render()  {
    return (
      <Board/>
    )
  }
}

ReactDOM.render(<Game/>, document.getElementById('root'));

function rotate90(arr) {
  let result = Array(9).fill(null);
  let first = arr[4]-11;
  [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8]] = [arr[6], arr[3], arr[0], arr[7], arr[4], arr[1], arr[8], arr[5], arr[2]];
  return result.map((k, i) => k = k?(parseInt(i/3)*10+((i%3)+first)):null )
}

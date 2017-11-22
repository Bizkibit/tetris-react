import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import shapes from './shapes.js';
import Board from './Board';
import { rotate90, bottomNodes, leftNodes, rightNodes, notGrey, biggerthan} from './helper.js'

class Game extends Component  {
  constructor(props)  {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.state = {
      history: [{
        squares: new Array(150).fill(null)
      }],
      currentShape: Object.values(shapes)[Math.floor(Math.random()*7)],
      currentPosition: 4,
      speed: 250
    }
  }

  getShape()  {
    return (!this.state.currentShape)?Object.values(shapes)[Math.floor(Math.random()*6)]:this.state.currentShape;
  }

  renderShapes(func, num)  {
    let {history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let nodes = func(num).reduce((a, b) => a.concat(b), []);
    return squares.map((k,i) => (nodes.includes(i)) ? "green" : (squares[i]!=="grey") ? null : "grey");
  }

  moveShapeDown() {
    if (this.movePiece(10)) {
    } else {
      this.landShape();
    }
  }

  movePiece(i) {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let nodes = (i===1)?rightNodes(currentShape(currentPosition)) : (i===10)? bottomNodes(currentShape(currentPosition)) : leftNodes(currentShape(currentPosition));
    let nodesOfInterest = [];
    for (let node of nodes) {
      nodesOfInterest.push(squares[node+i])
    }
    if ((nodesOfInterest.filter(notGrey).length === nodesOfInterest.length) && nodes.every(biggerthan)) {
      let newPosition = this.state.currentPosition + i;
      squares = this.renderShapes(this.state.currentShape, newPosition);
      this.setState({
        history : history.concat([{squares:squares}]),
        currentPosition: newPosition
      })
      return true
    } else {
      return false
    }
  }

  landShape() {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    currentShape(currentPosition).reduce((a, b) => a.concat(b), []).map((k) => squares[k]="grey");
    this.setState({
      history : history.concat([{squares:squares}]),
      currentPosition: 5,
      currentShape: Object.values(shapes)[Math.floor(Math.random()*7)]
    })
  }


  handleKey(e) {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let newPosition;

    switch (e.keyCode) {

      //right arraw
      case 39:
          this.movePiece(1);
        break;

      //left arrow
      case 37:
          this.movePiece(-1);
        break;

      //shift key
      case 16:
          history.pop()
          this.setState({
            history : history,
            currentPosition: currentPosition-10
          })
        break;

      //up arrow
      case 38:
          newPosition = rotate90(currentShape)(currentPosition)[1][1];
          squares = this.renderShapes(rotate90(currentShape), newPosition);
          this.setState({
            history : history.concat([{squares:squares}]),
            currentPosition: newPosition,
            currentShape: rotate90(currentShape)
          })
        break;

      default:
        return
    }
  }

  componentDidMount() {
    this.getShape();
    setInterval(() => this.moveShapeDown(), this.state.speed)
  }

  componentWillMount()  {
    let {history} = this.state;
    let squares = this.renderShapes(this.state.currentShape, this.state.currentPosition);
    this.setState({
      history : history.concat([{squares:squares}])
    });
  }

  render()  {
    let {squares} = this.state.history[this.state.history.length-1];
    return (
      <Board squares={squares} onKeyDown={this.handleKey}/>
    )
  }
}

ReactDOM.render(<Game/>, document.getElementById('root'));

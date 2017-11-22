import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import shapes from './shapes.js';
import Board from './Board';
import { rotate90, bottomNodes, leftNodes, rightNodes, notGrey} from './helper.js'

class Game extends Component  {
  constructor(props)  {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.moveHorizontaly = this.moveHorizontaly.bind(this);
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
    // return squares.map((k,i) => (currentShape(num).includes(i)) ? "green" : (squares[i]!=="grey") ? null : "grey");
  }

  moveShapeDown() {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();

    let nodes = bottomNodes(currentShape(currentPosition));
    let nodesOfInterest = [];
    for (let node of nodes) {
      nodesOfInterest.push(squares[node+10])
    }
    if ((nodesOfInterest.filter(notGrey).length === nodesOfInterest.length) && nodes[0] < 139) {
        let newPosition = currentPosition+10;
        squares = this.renderShapes(this.state.currentShape, newPosition);
        this.setState({
          history : history.concat([{squares:squares}]),
          currentPosition: newPosition
        })
    } else {
        // currentShape(currentPosition).reduce((a, b) => a.concat(b), []).map((k) => squares[k]="grey");
        // this.setState({
        //   history : history.concat([{squares:squares}]),
        //   currentPosition: 5,
        //   currentShape: Object.values(shapes)[Math.floor(Math.random()*7)]
        // })
        this.landShape();
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

  moveHorizontaly(i) {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let newPosition = this.state.currentPosition + i;
    let nodes = (i===1)?rightNodes(currentShape(currentPosition)):leftNodes(currentShape(currentPosition));
    let nodesOfInterest = [];
    for (let node of nodes) {
      nodesOfInterest.push(squares[node+i])
    }
    if (nodesOfInterest.filter(notGrey).length === nodesOfInterest.length) {
      squares = this.renderShapes(this.state.currentShape, newPosition);
      this.setState({
        history : history.concat([{squares:squares}]),
        currentPosition: newPosition
      })
    }
  }


  handleKey(e) {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let newPosition;

    switch (e.keyCode) {

      //right arraw
      case 39:
          this.moveHorizontaly(1);
        break;

      //left arrow
      case 37:
          this.moveHorizontaly(-1);
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

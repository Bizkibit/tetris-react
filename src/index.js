import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import shapes from './shapes.js';
import Board from './Board';
import {rotate90, bottomNodes, leftNodes, rightNodes, notGrey} from './helper.js'

class Game extends Component  {
  constructor(props)  {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.state = {
      history: [{
        squares: new Array(150).fill(null)
      }],
      currentShape: Object.values(shapes)[Math.floor(Math.random()*7)],
      currentPosition: 4,
      speed: 300
    }
  }

  getShape()  {
    return (!this.state.currentShape)?Object.values(shapes)[Math.floor(Math.random()*6)]:this.state.currentShape;
  }

  renderShapes(num)  {
    let {history, currentShape} = this.state;
    let squares = history[history.length-1].squares.slice();
    let nodes = currentShape(num).reduce((a, b) => a.concat(b), []);
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
        squares = this.renderShapes(newPosition);
        this.setState({
          history : history.concat([{squares:squares}]),
          currentPosition: newPosition
        })
    } else {
        currentShape(currentPosition).reduce((a, b) => a.concat(b), []).map((k) => squares[k]="grey");
        this.setState({
          history : history.concat([{squares:squares}]),
          currentPosition: 5,
          currentShape: Object.values(shapes)[Math.floor(Math.random()*7)]
        })
    }
  }

  handleKey(e) {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let newPosition;
    switch (e.keyCode) {
      case 39:
      squares.map((k, i) => {
        if(k==="green") {
          newPosition = this.state.currentPosition+1;
          let nodes = rightNodes(currentShape(currentPosition+1));
          let nodesOfInterest = [];
          for (let node of nodes) {
            nodesOfInterest.push(squares[node+10])
          }
          if (nodesOfInterest.filter(notGrey).length === nodesOfInterest.length) {
            squares = this.renderShapes(newPosition);
            this.setState({
              history : history.concat([{squares:squares}]),
              currentPosition: newPosition
            })
          }
        }
      })
        break;

      case 37:
        squares.map((k, i) => {
          if(k==="green") {
            newPosition = this.state.currentPosition-1;
            let nodes = leftNodes(currentShape(currentPosition-1));
            let nodesOfInterest = [];
            for (let node of nodes) {
              nodesOfInterest.push(squares[node+10])
            }
            if (nodesOfInterest.filter(notGrey).length === nodesOfInterest.length) {
              squares = this.renderShapes(newPosition);
              this.setState({
                history : history.concat([{squares:squares}]),
                currentPosition: newPosition
              })
            }
          }
        })
        break;

      case 16:
          history.pop()
          this.setState({
            history : history,
            currentPosition: currentShape-10
          })
        break;

      case 38:
          squares = this.renderShapes(currentPosition)
          this.setState({
            history : history.concat([{squares:squares}]),
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
    let squares = this.renderShapes(this.state.currentPosition);
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

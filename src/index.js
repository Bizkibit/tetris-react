import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import shapes from './shapes.js';
import Board from './Board';

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
      speed: 100
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

    // if (((squares[a] === null && squares[b] ===null && squares[c]===null && squares[d]===null) || (squares[a] === "grey" && squares[b] === "grey" && squares[c] === "grey" && squares[d]==="grey")) && currentPosition<135) {
    //   let newPosition = currentPosition+10;
    //   squares = this.renderShapes(newPosition);
    //   this.setState({
    //     history : history.concat([{squares:squares}]),
    //     currentPosition: newPosition
    //   })
    // } else {
    //   currentShape(currentPosition).map((k) => squares[k]="grey");
    //   this.setState({
    //     history : history.concat([{squares:squares}]),
    //     currentPosition: 5,
    //     currentShape: Object.values(shapes)[Math.floor(Math.random()*6)]
    //   })
    // }
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


//helper functions
//
// function rotate(arr) {
//   let result = Array(9).fill(null);
//   let first = arr[4]-11;
//   [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8]] = [arr[6], arr[3], arr[0], arr[7], arr[4], arr[1], arr[8], arr[5], arr[2]];
//   return result.map((k, i) => k = k?(parseInt(i/3)*10+((i%3)+first)):null )
// }

function rotate(arr) {
  let result = Array(9).fill(null);
  let first = arr[4]-11;
  [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8]] = [arr[6], arr[3], arr[0], arr[7], arr[4], arr[1], arr[8], arr[5], arr[2]];
  return result.map((k, i) => k = k?(parseInt(i/3)*10+((i%3)+first)):null )
}

function bottomNodes(nodes) {
  let col1 = [nodes[3][0], nodes[2][0], nodes[1][0], nodes[0][0]];
  let col2 = [nodes[3][1], nodes[2][1], nodes[1][1], nodes[0][1]];
  let col3 = [nodes[3][2], nodes[2][2], nodes[1][2], nodes[0][2]];
  let col4 = [nodes[3][3], nodes[2][3], nodes[1][3], nodes[0][3]];
  return [col1, col2, col3, col4].map(e => e.find(notNull)).filter(notUndefined)
}

function leftNodes(nodes) {
  return nodes.map(e => e.find(notNull)).filter(notUndefined)
}

function rightNodes(nodes)  {
  let row1 = nodes[0].reverse();
  let row2 = nodes[1].reverse();
  let row3 = nodes[2].reverse();
  let row4 = nodes[3].reverse();
  return [row1, row2, row3, row4].map(e => e.find(notNull)).filter(notUndefined)
}

function notNull(element) {
  return element !== null
}

function notUndefined(element)  {
  return element !== undefined
}

function notGrey(element) {
  return element !== "grey"
}

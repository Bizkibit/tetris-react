import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import shapes from './shapes.js'

function Square(props)  {
  return (<div className="square" style={{backgroundColor:props.bgColor}}>{props.index}</div>);
}

class Board extends Component {

  renderSquare(i, bgColor="")  {
    return  (
     <Square key={i} index={i} bgColor={bgColor}></Square>
    );
  }

  renderNodes()  {
    let {squares} = this.props;
    return squares.map((k,i) => k?this.renderSquare(i, k):this.renderSquare(i))
  }

  render()  {
    return (
    <div id="Board">
      {this.renderNodes()}
    </div>
    )
  }
}

class Game extends Component  {
  constructor(props)  {
    super(props);
    this.state = {
      history: [{
        squares: new Array(150).fill(null)
      }],
      currentShape: Object.values(shapes)[Math.floor(Math.random()*6)],
      currentPosition: 5,
      speed: 50
    }
  }

  getShape()  {
    return (!this.state.currentShape)?Object.values(shapes)[Math.floor(Math.random()*6)]:this.state.currentShape;
    // if (!this.state.currentShape) {
    //   let currentShape = Object.values(shapes)[Math.floor(Math.random()*6)];
    //   this.setState({ currentShape: currentShape });
    //   return currentShape;
    // } else {
    //   return this.state.currentShape;
    // }
  }

  renderShapes(num)  {
    let {history, currentShape} = this.state;
    let squares = history[history.length-1].squares.slice();
    return squares.map((k,i) => (currentShape(num).includes(i)) ? "green" : (squares[i]!=="grey") ? null : "grey");
  }

  moveShape() {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let [a, b, c] = bottomNodes(currentShape, currentPosition);
    if (((squares[a] === null && squares[b] ===null && squares[c]===null) || (squares[a] === "grey" && squares[b] === "grey" && squares[c] === "grey")) && currentPosition<139) {
      let newPosition = currentPosition+10;
      squares = this.renderShapes(newPosition);
      this.setState({
        history : history.concat([{squares:squares}]),
        currentPosition: newPosition
      })
    } else {
      currentShape(currentPosition).map((k) => squares[k]="grey");
      this.setState({
        history : history.concat([{squares:squares}]),
        currentPosition: 5,
        currentShape: Object.values(shapes)[Math.floor(Math.random()*6)]
      })
    }
  }

  componentDidMount() {
    this.getShape();
    setInterval(() => this.moveShape(), this.state.speed)
  }

  // componentWillReceiveProps()  {
  // componentWillMount()  {
  // shouldComponentUpdate() {
  //   let {history} = this.state;
  //   // let squares = this.renderShapes(this.props.midPoint);
  //   let squares = this.renderShapes(this.state.currentPosition);
  //   this.setState({
  //     history : history.concat([{squares:squares}])
  //   });
  // }

  componentWillMount()  {
    let {history} = this.state;
    // let squares = this.renderShapes(this.props.midPoint);
    let squares = this.renderShapes(this.state.currentPosition);
    this.setState({
      history : history.concat([{squares:squares}])
    });
  }

  render()  {
    let {squares} = this.state.history[this.state.history.length-1];
    return (
      <Board squares={squares}/>
    )
  }
}

ReactDOM.render(<Game/>, document.getElementById('root'));


//helper functions

function rotate90(arr) {
  let result = Array(9).fill(null);
  let first = arr[4]-11;
  [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8]] = [arr[6], arr[3], arr[0], arr[7], arr[4], arr[1], arr[8], arr[5], arr[2]];
  return result.map((k, i) => k = k?(parseInt(i/3)*10+((i%3)+first)):null )
}

function bottomNodes(func, i) {
  // let nodes = func(i);
  // let arr = [nodes[6], nodes[3], nodes[0]];
  // let arr2 = [nodes[7], nodes[4], nodes[1]]
  // let arr2 = [nodes[8], nodes[5], nodes[2]];
  // let node1 = arr.findIndex(bottom)===-1?null:arr.findIndex(bottom)===2?;
  // let node2 = arr2.findIndex(bottom);
  // let node3 = arr3.findIndex(bottom);

  return [i+19, i+20, i+21]
}

function bottom(element) {
  return element !== null
}


// (function movePieceTest()  {
//   let kir;
//   let i = 0;
//     kir = setInterval(()=>{ReactDOM.render(<Game midPoint={i*10+5}/>, document.getElementById('root'));i++; i===16?clearTimeout(kir):i },1000)
// })()

// window.onload = () => {
//   let kir, i=0;
//   kir = setInterval(()=>{ReactDOM.render(<Game midPoint={i*10+5}/>, document.getElementById('root'));i++; i===16?clearTimeout(kir):i },1000)
// }

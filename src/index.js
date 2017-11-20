import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import shapes from './shapes.js'

function Square(props)  {
  return (<div className="square" style={{backgroundColor:props.bgColor}}></div>);
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
      speed: 200
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
          currentShape: Object.values(shapes)[Math.floor(Math.random()*6)]
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

  componentDidMount() {
    this.getShape();
    setInterval(() => this.moveShapeDown(), this.state.speed)
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

function bottomNodes(nodes) {
  let col1 = [nodes[3][0], nodes[2][0], nodes[1][0], nodes[0][0]];
  let col2 = [nodes[3][1], nodes[2][1], nodes[1][1], nodes[0][1]];
  let col3 = [nodes[3][2], nodes[2][2], nodes[1][2], nodes[0][2]];
  let col4 = [nodes[3][3], nodes[2][3], nodes[1][3], nodes[0][3]];
  return [col1.find(notNull), col2.find(notNull), col3.find(notNull), col4.find(notNull)].filter((el)=> el!==undefined)
  // return result.map((el)=>el+10)
  // for (let i = 0; i < 4, i++) {
  //   result[i] = []
  //   for (let k = 3; k >= 0, k--) {
  //     result[i].push(nodes[k][i])
  //   }
  // }
}

function notNull(element) {
  return element !== null
}

function notGrey(element) {
  return element !== "grey"
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

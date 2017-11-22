import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import shapes from './shapes.js';
import Board from './Board';
import { rotate90, bottomNodes, leftNodes, rightNodes, notGrey, biggerthan, notNull} from './helper.js'

class Game extends Component  {
  constructor(props)  {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.canPieceMove = this.canPieceMove.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.startGame = this.startGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.clearRow = this.clearRow.bind(this);
    this.state = {
      history: [{
        squares: new Array(150).fill(null)
      }],
      currentShape: Object.values(shapes)[Math.floor(Math.random()*7)],
      currentPosition: 4,
      speed: 250,
      currentRunID: null
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
    if (this.canPieceMove(10)) {
      this.movePiece(10)
    } else {
      this.landPiece();
      this.clearRow();
    }
  }

  // i = 1 for right movement, i = -1 for left movement, i = 10 for downwards.
  canPieceMove(i)  {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let nodes = (i===1)?rightNodes(currentShape(currentPosition)) : (i===10)? bottomNodes(currentShape(currentPosition)) : leftNodes(currentShape(currentPosition));
    let nodesOfInterest = [];
    for (let node of nodes) {
      nodesOfInterest.push(squares[node+i])
    }
    return (nodesOfInterest.filter(notGrey).length === nodesOfInterest.length) && nodes.every(biggerthan)
  }

  movePiece(i) {
    let {history} = this.state;
    let squares = history[history.length-1].squares.slice();
    if (this.canPieceMove(i)) {
      let newPosition = this.state.currentPosition + i;
      squares = this.renderShapes(this.state.currentShape, newPosition);
      this.setState({
        history : history.concat([{squares:squares}]),
        currentPosition: newPosition
      })
    }
  }

  landPiece() {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    currentShape(currentPosition).reduce((a, b) => a.concat(b), []).map((k) => squares[k]="grey");
    this.setState({
      history : history.concat([{squares:squares}]),
      currentPosition: 5,
      currentShape: Object.values(shapes)[Math.floor(Math.random()*7)]
    })
  }

  clearRow()  {
    let {history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let rows=[], length;
    for (let i = 0; i < 15; i++)  {
      if (!squares.slice(i*10, (i+1)*10).every(notNull)) {
        rows.push(squares.slice(i*10, (i+1)*10))
      }
    }
    length= rows.length;
    if (length===15) {
      return
    } else {
      for(let i = 0; i < (15-length); i++)  {
        rows.unshift(Array(10).fill(null));
      }
      this.setState({
        history : history.concat([{squares:rows.reduce((a, b) => a.concat(b), [])}])
      })
    }
  }


  handleKey(e) {
    let {currentShape, currentPosition, history} = this.state;
    let squares = history[history.length-1].squares.slice();
    let newPosition;

    switch (true) {

      //right arraw
      case e.keyCode===39||e.currentTarget.id==="R":
          this.movePiece(1);
        break;

      //left arrow
      case e.keyCode===37||e.currentTarget.id==="L":
          this.movePiece(-1);
        break;

      //shift key rewind key
      case e.keyCode===16||e.currentTarget.id==="RW":
            history.pop()
            this.setState({
              history : history,
              currentPosition: currentPosition-10
            })
        break;

      //up arrow
      case e.keyCode===38||e.currentTarget.id==="U":
          newPosition = rotate90(currentShape)(currentPosition)[1][1];
          squares = this.renderShapes(rotate90(currentShape), newPosition);
          this.setState({
            history : history.concat([{squares:squares}]),
            currentPosition: newPosition,
            currentShape: rotate90(currentShape)
          })
        break;

      //space bar pause button
      case e.keyCode===32:
          let {currentRunID} = this.state;
          if (currentRunID) {
            clearInterval(currentRunID);
            this.setState({
              currentRunID: null
            })
          } else {
            this.startGame();
          }
        break;

      default:
        return
    }
  }

  startGame() {
    this.getShape();
    if(this.gameOver()){
      return;
    }
    let iD = setInterval(() => {(this.gameOver())? ()=>{} : this.moveShapeDown()}, this.state.speed);
    this.setState({
      currentRunID: iD
    });
  }

  gameOver()  {
    if ( !this.canPieceMove(10) && this.state.currentPosition===5) {
      alert("Game Over!");
      let answer = window.confirm("try Again?");
      clearInterval(this.state.currentRunID);
      if (answer) {
        this.setState({
          history: [{
            squares: new Array(150).fill(null)
          }],
          currentShape: Object.values(shapes)[Math.floor(Math.random()*7)],
          currentPosition: 4,
          speed: 250,
          currentRunID: null
        });
          this.startGame()
      } else {
        this.setState({
          currentRunID: null
        });
      }
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    this.startGame();
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
      <div>
        <Board squares={squares} onKeyDown={this.handleKey}/>
        <div className="controller">
          <button type="button" onClick={this.handleKey} id="U">
            <i class="fa fa-arrow-circle-up fa-3x" aria-hidden="true"></i>
          </button>
          <div className="left-right">
            <button type="button"  onClick={this.handleKey} id="L">
              <i class="fa fa-arrow-circle-left fa-3x" aria-hidden="true"></i>
            </button>
            <button type="button" onClick={this.handleKey} id="R">
              <i class="fa fa-arrow-circle-right fa-3x" aria-hidden="true"></i>
            </button>
          </div>
          <button type="button" id="RW" onClick={this.handleKey}>
            <i class="fa fa-step-backward fa-3x" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game/>, document.getElementById('root'));

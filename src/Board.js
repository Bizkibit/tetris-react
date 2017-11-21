import React, {Component} from 'react';
import Square from './Square';

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
  componentDidMount() {
    this.el.focus();
  }

  render()  {
    return (
    <div id="Board" onKeyDown={this.props.onKeyDown} contentEditable ref={el=>this.el=el}>
      {this.renderNodes()}
    </div>
    )
  }
}

export default Board

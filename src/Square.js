import React from 'react';

function Square(props)  {
  return (<div className="square" style={{backgroundColor:props.bgColor}}>{props.index}</div>);
}

export default Square

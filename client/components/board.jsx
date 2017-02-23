import React from 'react';
import Square from './square.jsx';

export default function Board(props) {
  const board = props.board;
  const style = {
    width: '600px',
    height: '600px',
    margin: 'auto',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  }

  console.log(board);

  const renderSquares = () => {
    return board.map((value, i) => {
      return <Square key={i} index={i} value={value} onClick={() => {props.onClick(i)}} />
    });
  };

  return (
    <div style={style}>
      {renderSquares()}
    </div>
  );
}

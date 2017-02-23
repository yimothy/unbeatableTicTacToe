import React from 'react';
import Square from './square.jsx';

export default function Board(props) {
  const board = props.board;

  console.log(board);

  const renderSquares = () => {
    return board.map((value, i) => {
      return <Square key={i} value={value || i} />
    });
  };
  return (
    <div>
      <h1>BOARD</h1>
      {renderSquares()}
    </div>
  );
}

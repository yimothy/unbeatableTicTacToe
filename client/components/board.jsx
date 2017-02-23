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
    let key = 0;
    return board.map((row, i) => {
      return row.map((value, j) => {
        key++;
        return <Square key={key} index={i} value={value} onClick={() => props.onClick(i, j)} />
      })
    });
  };

  return (
    <div style={style}>
      {renderSquares()}
    </div>
  );
}

import React from 'react';
import Square from './square.jsx';

export default function Board(props) {
  const board = props.board;
  const winningSquares = props.winningSquares;
  console.log('winningSquares ', winningSquares)
  const style = {
    width: '35vw',
    height: '35vw',
    margin: 'auto',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  };

  const renderSquares = () => {
    let key = 0;
    let winningSquare;
    return board.map((row, i) => {
      return row.map((value, j) => {
        // Check to see if it's a winning square
        winningSquare = false;
        winningSquares.forEach((square) => {
          if (square[0] === i && square[1] === j) {
            winningSquare = true;
          }
        });
        key++;
        return (
          <Square
            key={key}
            index={i}
            value={value}
            winningSquare={winningSquare}
            onClick={() => props.onClick(i, j)}
          />
        )
      })
    });
  };

  return (
    <div style={style}>
      {renderSquares()}
    </div>
  );
}

Board.propTypes = {
  board: React.PropTypes.array,
};

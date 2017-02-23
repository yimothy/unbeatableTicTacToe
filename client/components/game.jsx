import React, { Component } from 'react';
import Board from './board.jsx';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      versus: 'human', // human or AI
      board: Array(9).fill(false), // Default starting board with no values
      xTurn: true,
      gameOver: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    //Check if square is already filled

    if (!this.checkWinner(this.state.board) && !this.state.board[i]) {
      const newBoard = this.state.board.slice();
      newBoard[i] = this.state.xTurn ? 'X' : 'O';
        this.setState({
          board: newBoard,
          xTurn: !this.state.xTurn,
        });
    }
  }

  checkWinner(board) {
    let gameOver = false;
    const checkRows = (rowArr) => {
      rowArr.forEach((i) => {
        if (board[i] && board[i] === board[i + 1] && board[i] === board[i + 2]) {
          gameOver = true;
        }
      });
    };
    const checkCols = (colArr) => {
      colArr.forEach((i) => {
        if (board[i] && board[i] === board[i + 3] && board[i] === board[i + 6]) gameOver = true;
      });
    };
    const checkDiags = () => {
      if (board[0] && board[0] === board[4] && board[0] === board[8] &&
          board[2] && board[2] === board[4] && board[2] === board[6]) gameOver = true;
    };
    checkRows([0, 3, 6]);
    checkCols([0, 1, 2]);
    checkDiags();

    return gameOver;
  }

  render() {
    return (
      <div>
        <h1>TIC TAC TOE</h1>
        <Board board={this.state.board} onClick={this.handleClick} />
      </div>
    );
  }
}

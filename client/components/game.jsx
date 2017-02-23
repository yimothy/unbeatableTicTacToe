import React, { Component } from 'react';
import Board from './board.jsx';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      versus: 'Human', // human or AI
      board: Array(9).fill(false), // Default starting board with no values
      xTurn: true,
      AITurn: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.versus = this.versus.bind(this);
  }

  versus(event) {
    // Set state to vs human or AI depending on button click
    this.setState({ versus: event.target.value })
  }

  handleClick(i) {
    // Check if game over or square is already filled
    if (!this.gameOver(this.state.board) && !this.state.board[i]) {
      const newBoard = this.state.board.slice();
      newBoard[i] = this.state.xTurn ? 'X' : 'O';
      this.setState({
        board: newBoard,
        xTurn: !this.state.xTurn,
      });
    }
  }
// Check if anyone has won
  gameOver(board) {
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
        if (board[i] && board[i] === board[i + 3] && board[i] === board[i + 6]) {
          gameOver = true;
        }
      });
    };
    const checkDiags = () => {
      if ((board[0] && board[0] === board[4] && board[0] === board[8])
      || (board[2] && board[2] === board[4] && board[2] === board[6])) {
        gameOver = true;
      }
    };
    checkRows([0, 3, 6]);
    checkCols([0, 1, 2]);
    checkDiags();

    return gameOver;
  }

  render() {
    let winner;
    const versus = this.state.versus;
    console.log("STATE: ", this.state);
    if (this.gameOver(this.state.board)) {
      winner = this.state.xTurn ? 'O' : 'X';
    }

    return (
      <div>
        <h1>TIC TAC TOE</h1>
        <div>WINNER: {winner}</div>
        <div>PLAYING AGAINST: {versus}</div>
        <button onClick={this.versus} value='Human'>VS HUMAN</button>
        <button onClick={this.versus} value='AI'>VS AI</button>
        <Board board={this.state.board} onClick={this.handleClick} />
      </div>
    );
  }
}

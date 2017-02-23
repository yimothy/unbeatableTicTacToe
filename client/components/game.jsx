import React, { Component } from 'react';
import Board from './board.jsx';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      versus: 'Human', // human or AI
      board: null, // Default starting board with no values
      xTurn: true,
      AITurn: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.versus = this.versus.bind(this);
  }

  componentWillMount() {
    // create board before render
    const board = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(false);
      }
      board.push(row);
    }
    this.setState({ board })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("PLAYER MOVED")
    // When DOM is updated, if versus AI and AI's turn, AI moves
    if(this.state.versus === 'AI' && this.state.AITurn) {
      const newBoard = this.state.board.slice();
      // AI calculates best move here

      newBoard[1][1] = this.state.xTurn ? 'X' : 'O';
      this.setState({
        board: newBoard,
        xTurn: !this.state.xTurn,
        AITurn: !this.state.AITurn,
      })
    }
  }

  versus(event) {
    // Set state to vs human or AI depending on button click
    this.setState({ versus: event.target.value })
  }

  handleClick(i, j) {
    console.log('CLICKED')
    // Check if game over / square is already filled / it's AI's turn
    if (!this.gameOver(this.state.board) && !this.state.board[i][j]) {
      //Create newBoard
      const newBoard = [];
      this.state.board.forEach((row) => {
        newBoard.push(row.slice());
      })

      newBoard[i][j] = this.state.xTurn ? 'X' : 'O';
      this.setState({
        board: newBoard,
        xTurn: !this.state.xTurn,
        AITurn: !this.state.AITurn,
      });
    }
  }
// Function to check if anyone has won
  gameOver(board) {
    let gameOver = false;
    const checkRows = () => {
      board.forEach((row) => {
          if (row[0] && row[0] === row[1] && row[0] === row[2]) {
            gameOver = true;
          }
      });
    };
    const checkCols = () => {
        for(let j = 0; j< board.length; j++) {
          if (board[0][j] && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
            gameOver = true;
          }
        }
    };
    const checkDiags = () => {
      if ((board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2])
      || (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0])) {
        gameOver = true;
      }
    };
    checkRows(board);
    checkCols(board);
    checkDiags(board);

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
        <button onClick={this.versus} value="Human">VS HUMAN</button>
        <button onClick={this.versus} value="AI">VS AI</button>
        <Board board={this.state.board} onClick={this.handleClick} />
      </div>
    );
  }
}

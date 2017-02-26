import React, { Component } from 'react';
import Board from './board.jsx';
import AI from '../ai/AI.js';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      versus: 'Human', // human or AI
      board: null, // Default starting board with no values
      xTurn: true,
      AITurn: false,
      humanLetter: null,
      winningSquares: [],
    };
    this.winningSquares = [];
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
    // Set board on state
    this.setState({ board })
  }

  componentDidUpdate() {
    // When DOM is updated, if versus AI and AI's turn, AI moves
    if (this.state.versus === 'AI' && this.state.AITurn) {
      const newBoard = this.state.board.map(row => row.slice());
      // AI calculates best move here
      const aiMove = this.ai.AIMove(this.state.board);
      if (aiMove.length > 0 && !this.gameOver(this.state.board)) {
        newBoard[aiMove[0]][aiMove[1]] = this.state.xTurn ? 'X' : 'O';
        this.setState({
          board: newBoard,
          xTurn: !this.state.xTurn,
          AITurn: !this.state.AITurn,
        })
      }
    }
  }

  versus(event) {
    const mode = event.target.value;
    // Create new board to reset
    const board = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(false);
      }
      board.push(row);
    }
    // If human choses AI moves first. Create AI. Reset board.
    if (mode === 'AI1') {
      this.ai = new AI('X');
      this.setState({
        versus: 'AI',
        board,
        xTurn: true,
        AITurn: true,
        humanLetter: 'O',
        winningSquares: [],
      });
    // If human choses AI moves second. Create AI. Reset board.
    } else if (mode === 'AI2') {
      this.ai = new AI('O');
      this.ai.readBoard(board);
      this.setState({
        versus: 'AI',
        board,
        xTurn: true,
        AITurn: false,
        humanLetter: 'X',
        winningSquares: [],
      });
    // if human vs human. Reset board.
    } else {
      this.setState({
        versus: 'Human',
        board,
        xTurn: true,
        winningSquares: [],
      });
    }
  }

  handleClick(i, j) {
    // Check if game over / square is already filled / it's AI's turn
    if (!this.gameOver(this.state.board) && !this.state.board[i][j] && !this.state.AITurn) {
      let AITurn = this.state.AITurn;
      // AI reads human's moves
      if (this.state.versus === 'AI') {
        this.ai.readMove(this.state.humanLetter, i, j);
        AITurn = !AITurn;
      }
      // Create newBoard
      const newBoard = [];
      this.state.board.forEach((row) => {
        newBoard.push(row.slice());
      });
      // Set move in new board
      newBoard[i][j] = this.state.xTurn ? 'X' : 'O';
      this.setState({
        board: newBoard,
        xTurn: !this.state.xTurn,
        AITurn,
      });
    };
  }
  // Function to check if anyone has won
  gameOver(board) {
    let gameOver = false;
    let winningSquares = [];
    // Function to check rows if a player has won
    const checkRows = () => {
      board.forEach((row, i) => {
          if (row[0] && row[0] === row[1] && row[0] === row[2]) {
            winningSquares = [[i, 0], [i, 1], [i, 2]];
            gameOver = true;
          }
      });
    };
    // Function to check columns if a player has won
    const checkCols = () => {
        for(let j = 0; j< board.length; j++) {
          if (board[0][j] && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
            winningSquares = [[0, j], [1, j], [2, j]];
            gameOver = true;
          }
        }
    };
    // Function to check diagonals if a player has won
    const checkDiags = () => {
      if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        winningSquares = [[0, 0], [1, 1], [2, 2]];
        gameOver = true;
      }
      if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        winningSquares = [[0, 2], [1, 1], [2, 0]];
        gameOver = true;
      }
    };
    checkRows(board);
    checkCols(board);
    checkDiags(board);
    this.winningSquares = winningSquares;
    return gameOver;
  }

  render() {
    let winner;
    const versus = this.state.versus;
    if (this.gameOver(this.state.board)) {
      winner = this.state.xTurn ? 'O' : 'X';
    }

    // console.log('WINNING SQUARES: ', this.winningSquares)
    return (
      <div>
        <h1>TIC TAC TOE</h1>
        <div>WINNER: {winner}</div>
        <div>PLAYING AGAINST: {versus}</div>
        <button onClick={this.versus} value="Human">VS HUMAN</button>
        <button onClick={this.versus} value="AI2">VS AI (Human first)</button>
        <button onClick={this.versus} value="AI1">VS AI (AI first)</button>
        <Board board={this.state.board} winningSquares={this.winningSquares} onClick={this.handleClick} />
      </div>
    );
  }
}

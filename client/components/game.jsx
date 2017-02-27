import React, { Component } from 'react';
import Board from './board.jsx';
import AI from '../ai/AI.js';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      versus: 'AI', // human or AI. Default AI.
      board: null, // Default starting board with no values
      xTurn: true,
      AITurn: false,
      humanLetter: null,
      turn: 0,
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

  componentDidMount() {
    // Initialize AI
    this.versus('AI1');
  }

  // When human moves, if versus AI and AI's turn, AI moves
  componentDidUpdate() {
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
          turn: this.state.turn++,
        });
      }
    }
  }
  // Sets mode based on who human chooses to play
  versus(event) {
    const mode = event === 'AI1' ? 'AI1' : event.target.value;
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
        turn: 0,
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
        turn: 0,
      });
    // if human vs human. Reset board.
    } else {
      this.setState({
        versus: 'Human',
        board,
        xTurn: true,
        AITurn: false,
        turn: 0,
      });
    }
  }
  // Handle when a square is clicked by a human
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
        turn: this.state.turn++,
      });
    }
  }
  // Check if there is a draw
  draw(board) {
    let numMoves = 0;
    board.forEach((row) => {
      row.forEach((item) => {
        if (item) {
          numMoves++;
        }
      })
    })
    return numMoves === 9;
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
        for(let j = 0; j < board.length; j++) {
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
    const styles = {
      app: {
        fontFamily: 'Nunito, sans-serif',
        width: '100vw',
      },
      header: {
        width: '35vw',
        minWidth: '310px',
        margin: 'auto',
        left: '0',
        right: '0',
      },
    };
    // let winner;
    const versus = this.state.versus;
    const turn = this.state.xTurn ? 'X' : 'O';
    let message = '';
    this.gameOver(this.state.board)
    // Decide what message to say to human
    if (this.state.versus === 'AI') {
      if (this.gameOver(this.state.board)) {
        message = ' | GAME OVER!';
      } else if (this.draw(this.state.board)) {
        message = ' | DRAW! Try to win!'
      } else {
        message = ' | Make a move!';
      }
    }
    if (this.state.versus === 'Human') {
      if (this.draw(this.state.board)) {
        message = ' | DRAW! Play again?';
      } else {
        message = ' | ' + turn + ' Turn';
      }
    }

    return (
      <div style={styles.app}>
        <div style={styles.header}>
          <h1>IMPOSSIBLE TIC TAC TOE</h1>
          <div>PLAYING AGAINST: {versus} <span>{message}</span></div>
          <div>CHOOSE YOUR ENEMY: <span> </span>
            <button onClick={this.versus} value="Human">HUMAN</button>
            <button onClick={this.versus} value="AI1">AI Goes First</button>
            <button onClick={this.versus} value="AI2">AI Goes Second</button>
          </div>
        </div>
        <Board
          board={this.state.board}
          winningSquares={this.winningSquares}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

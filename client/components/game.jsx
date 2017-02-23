import React, { Component } from 'react';
import Board from './board.jsx';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      versus: 'human', // human or AI
      board: Array(9).fill(false), // Default starting board with no values
      xTurn: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const newBoard = this.state.board.slice();
    newBoard[i] = 'X';
    this.setState({board: newBoard});
    console.log('CLICKED');
  }

  render() {
    return (
      <div>
        <h1>GAME</h1>
        <Board board={this.state.board} onClick={this.handleClick}/>
      </div>
    );
  }
}

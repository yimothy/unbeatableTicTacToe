import React, { Component } from 'react';
import Board from './board.jsx';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      versus: 'human', // human or AI
      board: Array(9).fill(false), // Default starting board with no values
    };
  }

  render() {
    return (
      <div>
        <h1>GAME</h1>
        <Board />
      </div>
    );
  }
}

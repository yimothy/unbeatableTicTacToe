class AI {
  constructor(letter) {
    // The letter of the AI
    this.letter = letter;
    this.rows = {
    // Each number represents a row
      0: {'X': 0,
          'O': 0},
      1: {'X': 0,
          'O': 0},
      2: {'X': 0,
          'O': 0},
    };
    this.cols = {
    // Each number represents a column
      0: {'X': 0,
          'O': 0},
      1: {'X': 0,
          'O': 0},
      2: {'X': 0,
          'O': 0},
    };
    // Diagonsals = 1: [0,0], [1,1], [2,2]
    // 2: [0,2], [1,1], [2,0]
    this.diags = {
      1: {'X': 0,
          'O': 0},
      2: {'X': 0,
          'O': 0},
    }
  }
  // Read the move and add to this.rows / this.cols / this.diags
  readMove(letter, i, j) {
    // letter variable represents letter played, 'X' or 'O'
    // Add move to the select row, column, and diagonal
    this.rows[i][letter]++;
    this.cols[j][letter]++;
    //if first diagonal
    if(i === j) {
      //if center
      if(i === 1) {
        this.diags[1][letter]++;
        this.diags[2][letter]++;
      }
      else{
        this.diags[1][letter]++;
      }
    }
    // if second diagonal
    else if((i === 2 && j === 0) || (i === 0 && j === 2)) {
      this.diags[2][letter]++;
    }
  }
  // Read the move and add to this.rows / this.cols / this.diags
  undoMove(letter, i, j) {
    // letter variable represents letter played, 'X' or 'O'
    // Add move to the select row, column, and diagonal
    this.rows[i][letter]--;
    this.cols[j][letter]--;
    //if first diagonal
    if(i === j) {
      //if center
      if(i === 1) {
        this.diags[1][letter]--;
        this.diags[2][letter]--;
      }
      else{
        this.diags[1][letter]--;
      }
    }
    // if second diagonal
    else if((i === 2 && j === 0) || (i === 0 && j === 2)) {
      this.diags[2][letter]--;
    }
  }
  // Find all possible moves on the board.
  possibleMoves(board) {
    const moves = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (!board[i][j]) {
          moves.push([i, j]);
        }
      }
    }
    return moves;
  }
  // Find if there could be a win with the next move.
  winNextMove(board, letter) {
    const other = letter === 'X' ? 'O' : 'X';
    const moves = [];
    //Check rows for next move wins, i.e. when the row/column/diagonal would equal 3 next
    for (const row in this.rows) {
      // console.log('ROW: ', row)
      if (this.rows[row][letter] === 2 && this.rows[row][other] === 0) {
        // Find the move that will end the game
        const j = board[row].indexOf(false);
        if(j > -1) {
          const i = parseInt(row);
          moves.push([i, j]);
        }
      }
    }
    // Check columns for next move wins
    for (const col in this.cols) {
      if (this.cols[col][letter] === 2 && this.cols[col][other] === 0) {
        // Find the move that will end the game
        for (let i = 0; i < board.length; i++) {
          if (!board[i][col]) {
            const j = parseInt(col);
            moves.push([i, j])
          }
        }
      }
    }
    // Check diagonals for next move wins
    // Check first diagonal
    if (this.diags[1][letter] === 2 && this.diags[1][other] === 0) {
      let i = 0;
      let j = 0;
      while (i < board.length) {
        if (!board[i][j]) {
          moves.push([i, j])
        }
        i++;
        j++;
      }
    }
    // Check second diagonal
    if (this.diags[2][letter] === 2 && this.diags[2][other] === 0) {
      let i = 0;
      let j = 2;
      while (i < board.length) {
        if (!board[i][j]) {
          moves.push([i, j])
        }
        i++;
        j--;
      }
    }
    return moves;
  }
  //Looks for moves that would guarantee win in 2 moves
  findTraps(board, letter) {
    const moves = this.possibleMoves(board);
    const winIn2 = [];
    // Iterate through each move, save moves that would result in a win in 2 moves
    moves.forEach((move) => {
      // Create a phantom board for AI to test move
      const phantomBoard = board.map(row => row.slice());
      const i = move[0];
      const j = move[1];
      // Toggle AI to read next move
      phantomBoard[i][j] = letter;
      this.readMove(letter, i, j);
      // Test to see if that move would make a trap. If yes, save move.
      if (this.winNextMove(phantomBoard, letter).length > 1) {
        winIn2.push(move);
      }
      // UnToggle AI's phantom move
      this.undoMove(letter, i, j);
    });
    return winIn2;
  }
  /* This function prioritizes:
  1) AI win in next move,
  2) Block a human win in next move,
  3) Find a 2 way trap in the next move (where the AI would have 2 possible moves to win)
  4) Find and block a human's 2 way trap in the next move
  */
  AIPrioritize(board) {
    // Check if AI has wins in next move or traps in next move
    const aiWins = this.winNextMove(board, this.letter);
    const aiTraps = this.findTraps(board, this.letter);
    // Check if human can win in next move or trap in next move
    const human = this.letter === 'X' ? 'O' : 'X';
    const humanWins = this.winNextMove(board, human);
    const humanTraps = this.findTraps(board, human);
    // If AI can win in next move, return the move.
    if (aiWins.length > 0) {
      this.readMove(this.letter, aiWins[0][0], aiWins[0][1]);
      return aiWins[0];
    }
    // If human can win in next move, block that move.
    else if (humanWins.length > 0) {
      this.readMove(this.letter, humanWins[0][0], humanWins[0][1]);
      return humanWins[0];
    }
    // If AI can trap in 1 move, return that move.
    else if (aiTraps.length > 0) {
      this.readMove(this.letter, aiTraps[0][0], aiTraps[0][1]);
      return aiTraps[0];
    }
    // If human can trap in 1 move, block that move.
    else if (humanTraps.length > 0) {
      this.readMove(this.letter, humanTraps[0][0], humanTraps[0][1]);
      return humanTraps[0];
    }
    return [];
  }
  AIMove(board) {
    // Find all possible moves.
    const moves = this.possibleMoves(board);
    const prioritize = this.AIPrioritize(board);
    if (prioritize.length > 0) {
      return prioritize;
    }
    if (moves.length > 0) {
      // If AI moves first, place X in a corner.
      if (moves.length === 9) {
        return [0,2];
      }
      // If AI moves second,
      const rand = Math.floor(Math.random() * moves.length);
      this.readMove(this.letter, moves[rand][0], moves[rand][1]);
      return moves[rand];
    }
    return [];
  }
}
export default AI;

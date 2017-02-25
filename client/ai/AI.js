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
  look3MovesAhead(board) {
    const moves = this.possibleMoves(board);
    const human = this.letter === 'X' ? 'O' : 'X';
    // Iterate through each move, save moves that have best chance of winning
    moves.forEach((move) => {
      // Create a phantom board for AI to test it's 2nd move
      const phantomBoard = board.map(row => row.slice());
      const i2 = move[0];
      const j2 = move[1];
      // Toggle AI to read next move
      phantomBoard[i2][j2] = letter;
      this.readMove(letter, i2, j2);
      /* Predict human's next move
       Prioritizes moves based on:
       1) Any moves that the prioritizeMoves function returns
       2) Center
       If the 2 above do not exist, do not toggle a human move.
      */
      const prioritizeHuman = this.prioritizeMoves(phantomBoard, human);
      if (prioritizeHuman.length > 0) {
        const humanI = prioritizeHuman[0];
        const humanJ = prioritizeHuman[1];
        phantomBoard[humanI][humanJ] = human;
      } else if (!board[1][1]) {
        phantomBoard[1][1] = human;
      }
      /* AI now checks if it has any prioritized moves for it's 3rd move.
      If so, place it on the phantomBoard and check to see if that move guaranteed a win
      (if there are 2 winning next moves)
      */
      const prioritizeAI = this.prioritizeMoves(phantomBoard, this.letter);
      if (prioritizeAI.length > 0) {
        let i3 = prioritizeAI[0];
        let j3 = prioritizeAI[1];
        phantomBoard[i][j]
      }
    })
  }
  // genericMove(board) {
  //   const moves = this.possibleMoves(board);
  //   // See if AI moves first (# moves are odd) or second (# moves are even).
  //   // Depending on which, will prioritize moves differently
  //   if (moves % 2 === 1) {
  //
  //   }
  //   /* If the AI moves second, it will prioritize:
  //   1) Center,
  //   2) Corner,
  //   3) Edge
  //   */
  //   else {
  //     // If the center is empty, move there
  //     if (!board[1][1]) {
  //       return board[1][1];
  //     }
  //     else if()
  //   }
  // }
  /* This function prioritizes:
  1) AI win in next move,
  2) Block a human win in next move,
  3) Find a 2 way trap in the next move (where the AI would have 2 possible moves to win)
  4) Find and block a human's 2 way trap in the next move
  */
  prioritizeMoves(board, letter) {
    // Check if AI has wins in next move or traps in next move
    const allyWins = this.winNextMove(board, letter);
    const allyTraps = this.findTraps(board, letter);
    // Check if human can win in next move or trap in next move
    const enemy = letter === 'X' ? 'O' : 'X';
    const enemyWins = this.winNextMove(board, enemy);
    const enemyTraps = this.findTraps(board, enemy);
    // If AI can win in next move, return the move.
    if (allyWins.length > 0) {
      this.readMove(this.letter, allyWins[0][0], allyWins[0][1]);
      return allyWins[0];
    }
    // If enemy can win in next move, block that move.
    else if (enemyWins.length > 0) {
      this.readMove(this.letter, enemyWins[0][0], enemyWins[0][1]);
      return enemyWins[0];
    }
    // If AI can trap in 1 move, return that move.
    else if (allyTraps.length > 0) {
      this.readMove(this.letter, allyTraps[0][0], allyTraps[0][1]);
      return allyTraps[0];
    }
    // If enemy can trap in 1 move, block that move.
    else if (enemyTraps.length > 0) {
      this.readMove(this.letter, enemyTraps[0][0], enemyTraps[0][1]);
      return enemyTraps[0];
    }
    return [];
  }
  AIMove(board) {
    // Find all possible moves.
    const moves = this.possibleMoves(board);
    const prioritize = this.prioritizeMoves(board, this.letter);
    if (prioritize.length > 0) {
      return prioritize;
    }
    if (moves.length > 0) {
      // If AI moves first, place X in a corner.
      if (moves.length === 9) {
        return [0,0];
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

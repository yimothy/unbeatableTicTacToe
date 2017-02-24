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
  //Read the move and add to this.rows / this.cols / this.diags
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
    //if second diagonal
    else if((i === 2 && j === 0) || (i === 0 && j === 2)) {
      this.diags[2][letter]++;
    }
  }
  //Find all possible moves on the board.
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
    let other = letter === 'X' ? 'O' : 'X';
    let moves = [];
    //Check rows for next move wins, i.e. when the row/column/diagonal would equal 3 next
    for(let row in this.rows) {
      // console.log('ROW: ', row)
      if(this.rows[row][letter] === 2 && this.rows[row][other] === 0) {
        //Find the move that will end the game
        console.log('ROW: IN ABOUT TO WIN: ', this.rows)
        let j = board[row].indexOf(false);
        let i = parseInt(row);
        moves.push([i, j]);
      }
    }
    //Check columns for next move wins
    for(let col in this.cols) {
      if(this.cols[col][letter] === 2 && this.cols[col][other] === 0) {
        //Find the move that will end the game
        console.log('COL: IN ABOUT TO WIN')
        for(let i = 0; i < board.length ; i++) {
          if(!board[i][col]) {
            let j = parseInt(col);
            moves.push([i, j])
          }
        }
      }
    }
    //Check diagonals for next move wins
    //Check first diagonal
    if(this.diags[1][letter] === 2 && this.diags[1][other] === 0) {
      let i = 0;
      let j = 0;
      console.log('DIAG1: IN ABOUT TO WIN')
      while(i < board.length) {
        if(!board[i][j]) {
          moves.push([i, j])
        }
        i++;
        j++;
      }
    }
    //Check second diagonal
    if(this.diags[2][letter] === 2 && this.diags[2][other] === 0) {
      let i = 0;
      let j = 2;
      console.log('DIAG2: IN ABOUT TO WIN')
      while(i < board.length) {
        if(!board[i][j]) {
          moves.push([i, j])
        }
        i++;
        j--;
      }
    }
    return moves;
  }
  findTrap(board, letter) {
    const moves = this.possibleMoves(board);
    const moveToTrap = [];
    //Iterate through each move, save moves that would result in a 2 way trap
    moves.forEach((move) => {
      // Create a phantom board for AI to test move
      let phantomBoard = board.map(row => row.slice());
      let i = move[0];
      let j = move[1];
      //Toggle position to be the letter
      phantomBoard[i][j] = letter;
      // console.log('board: ', board, 'Phantom Board: ', phantomBoard, 'letter: ', letter, 'move: ', i, j);
      //Test to see if that move would make a trap. If yes, save move.
      if (this.winNextMove(phantomBoard).length > 1) {
        moveToTrap.push(move);
      }
    });
    console.log('moveToTrap: ', moveToTrap);
    return moveToTrap;
  }
  /* This function prioritizes:
  1) AI win in next move,
  2) Block a human win in next move,
  3) Find a 2 way trap in the next move (where the AI would have 2 possible moves to win)
  4) Find and block a human's 2 way trap in the next move
  5) Decision tree for first two moves
  */
  AIMove(board) {
    // Check if AI has wins in next move or traps in next move
    const aiWins = this.winNextMove(board, this.letter);
    const aiTraps = this.findTrap(board, this.letter);
    // Check if human can win in next move or trap in next move
    const human = this.letter === 'X' ? 'O' : 'X';
    const humanWins = this.winNextMove(board, human);
    const humanTraps = this.findTrap(board, human);
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
    else {
      const moves = this.possibleMoves(board);
      if(moves.length > 0) {
        const rand = Math.floor(Math.random()*moves.length);
        this.readMove(this.letter, moves[rand][0], moves[rand][1]);
        return moves[rand];
      }
    }
  }
}
export default AI;

class AI {
  constructor(letter) {
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
  readMove(letter, i, j) {
    // letter variable represents letter played, 'X' or 'O'
    // Add move to the select row, column, and diagonal
    console.log('READ MOVE LETTER: ', letter);
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

  AIMove(board) {
    console.log("rows: ", this.rows)
    // Check if AI can win in next move
    const aiWins = this.winNextMove(board, this.letter);
    // Check if human can win in next move
    const human = this.letter === 'X' ? 'O' : 'X';
    console.log('HUMAN LETTER: ', human, 'AI LETTER: ', this.letter);
    const humanWins = this.winNextMove(board, human);
    console.log('Human Wins: ', humanWins);
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
    // Add if AI can trap in 2 moves && if human can trap in 2 moves
    else {
      const moves = this.possibleMoves(board);
      this.readMove(this.letter, moves[0][0], moves[0][1]);
      return moves[0];
    }
  }
}
export default AI;

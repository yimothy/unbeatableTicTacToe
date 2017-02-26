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
  readBoard(board) {
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
    for (let i = 0; i < board.length; i++) {
      let row = board[i];
      for (let j = 0; j < row.length; j++) {
        if(board[i][j]) {
          this.readMove(board[i][j], i, j);
        }
      }
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
  //Finds all possible paths for 2 in a row (a threat)
  createThreat(board) {
    const threats = [];
    const moves = this.possibleMoves(board);
    moves.forEach((move) => {
      const phantomBoard = board.map(row => row.slice());
      const i = move[0];
      const j = move[1];
      phantomBoard[i][j] = this.letter;
      const winNextMove = this.winNextMove(phantomBoard, this.letter);
      console.log('WIN NEXT MOVE:', winNextMove)
      if(winNextMove) {
        threats.push([i,j]);
      }
    });
    return threats;
  }
  // Find if there could be a win with the next move.
  winNextMove(board, letter) {
    const other = letter === 'X' ? 'O' : 'X';
    const winMoves = [];
    //Check rows for next move wins, i.e. when the row/column/diagonal would equal 3 next
    for (const row in this.rows) {
      // console.log('ROW: ', row)
      if (this.rows[row][letter] === 2 && this.rows[row][other] === 0) {
        // Find the move that will end the game
        const j = board[row].indexOf(false);
        if(j > -1) {
          const i = parseInt(row);
          winMoves.push([i, j]);
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
            winMoves.push([i, j])
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
          winMoves.push([i, j])
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
          winMoves.push([i, j])
        }
        i++;
        j--;
      }
    }
    return winMoves;
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
    if(winIn2.length > 0) console.log(letter, 'TRAPS: ', winIn2 )
    return winIn2;
  }
  lookAhead(board) {
    const bestMove = [];
    const moves = this.possibleMoves(board);
    const human = this.letter === 'X' ? 'O' : 'X';
    // Iterate through each move, save moves that have best chance of winning
    moves.forEach((move) => {
      let arows = this.rows;
      let cols = this.cols;
      let diags = this.diags;
      // Create a phantom board for AI to test it's 2nd move
      const phantomBoard = board.map(row => row.slice());
      const i2 = move[0];
      const j2 = move[1];
      // Closure variables to save the phantom moves (have to undo them before
      // the next for each iteration)
      let humanI = null;
      let humanJ = null;
      let i3 = null;
      let j3 = null;
      // Toggle AI to read next move
      // this.readBoard(phantomBoard);
      // console.log('PREBOARD READ: ', this.rows, 'preboard: ', phantomBoard, 'board: ', board);
      phantomBoard[i2][j2] = this.letter;
      this.readMove(this.letter, i2, j2);
      // this.readBoard(phantomBoard);
      console.log('phboard: ', phantomBoard, 'ROWS: ', this.rows);
      /* Predict human's next move
       Prioritizes moves based on:
       1) Any moves that the prioritizeMoves function returns
       2) Center
       If the 2 above do not exist, do not toggle a human move.
      */
      const prioritizeHuman = this.prioritizeMoves(phantomBoard, human);
      if (prioritizeHuman.length > 0) {
        humanI = prioritizeHuman[0];
        humanJ = prioritizeHuman[1];
        phantomBoard[humanI][humanJ] = human;
        this.readMove(human, humanI, humanJ);
      } else if (!phantomBoard[1][1]) {
        humanI = 1;
        humanJ = 1;
        phantomBoard[humanI][humanJ] = human;
        this.readMove(human, humanI, humanJ);
      }
      /* AI now checks if it has any prioritized moves for it's 3rd move.
      If so, place it on the phantomBoard and check to see if that move
      guaranteed a win (if there are 2 winning next moves). Else, check to see
      if there are any moves that will trap the opponent (a move that will
      cause 2 winning next moves).
      */
      const prioritizeAI = this.prioritizeMoves(phantomBoard, this.letter);
      if (prioritizeAI.length > 0) {
        console.log('phantomBoard in if: ', phantomBoard);
        i3 = prioritizeAI[0];
        j3 = prioritizeAI[1];
        phantomBoard[i3][j3] = this.letter;
        this.readMove(this.letter, i3, j3);
        let winMoves = this.winNextMove(phantomBoard, this.letter);
        console.log('WIN MOVES: ', winMoves)
        //Undo all readMoves and return the AI's second move
        if (winMoves.length > 1) {
          console.log('IN WIN MOVES:', winMoves)
          this.undoMove(this.letter, i2, j2);
          this.undoMove(this.letter, i3, j3);
          if(humanI !== null) {
            this.undoMove(human, humanI, humanJ);
          }
          console.log('WIN MOVES 2ND MOVE: ', i2, j2);
          bestMove.push([i2,j2]);
        }
      } else {
        let trapMoves = this.findTraps(phantomBoard, this.letter);
        console.log('phantomBoard in else: ', phantomBoard, 'rows: ', this.rows, 'trapmoves: ', trapMoves);
        if (trapMoves.length > 0) {
          this.undoMove(this.letter, i2, j2);
          if(humanI !== null) {
            this.undoMove(human, humanI, humanJ);
          }
          bestMove.push([i2,j2]);
        }
      }
      this.undoMove(this.letter, i2, j2);
      if (i3 !== null) {
        this.undoMove(this.letter, i3, j3);
      }
      if (humanI !== null) {
        this.undoMove(human, humanI, humanJ);
      }
    })
    console.log('FOR EACH OVER');
    if(bestMove.length > 0) {
      return bestMove[0];
    }
    return [];
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
    let rows = this.rows;
    // Check if AI has wins in next move or traps in next move
    const allyWins = this.winNextMove(board, letter);
    const allyTraps = this.findTraps(board, letter);
    // Check if human can win in next move or trap in next move
    const enemy = letter === 'X' ? 'O' : 'X';
    const enemyWins = this.winNextMove(board, enemy);
    console.log('BOARD:', board, 'ENEMY WINS: ', enemyWins, 'diag2: ', this.diags);
    const enemyTraps = this.findTraps(board, enemy);
    // If AI can win in next move, return the move.
    if (allyWins.length > 0) {
      return allyWins[0];
    }
    // If enemy can win in next move, block that move.
    else if (enemyWins.length > 0) {
      return enemyWins[0];
    }
    // If AI can trap in 1 move, return that move.
    else if (allyTraps.length > 0) {
      return allyTraps[0];
    }
    // If enemy can trap in 1 move, block that move.
    else if (enemyTraps.length > 0) {
      return enemyTraps[0];
    }
    return [];
  }

  AIMove(board) {
    this.readBoard(board);
    // Find all possible moves.
    const moves = this.possibleMoves(board);
    const prioritize = this.prioritizeMoves(board, this.letter);
    if (prioritize.length > 0) {
      return prioritize;
    }
    if (moves.length > 0) {
      // If AI moves first, place X in a corner.
      if (moves.length === 9) {
        //Chose random corner to start
        const idx = [0,2];
        const randI = Math.floor(Math.random()*idx.length);
        const randJ = Math.floor(Math.random()*idx.length);
        return [idx[randI], idx[randJ]];
      }
      else if (moves.length === 7) {
        let nextMove = this.lookAhead(board);
        return nextMove;
      }
      // else if (moves.length === 8) {
      //   return [1,1];
      // }
      // If AI moves second,
      const rand = Math.floor(Math.random() * moves.length);
      return moves[rand];
    }
    return [];
  }
}
export default AI;

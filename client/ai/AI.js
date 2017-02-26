class AI {
  constructor(letter) {
    // The letter of the AI
    this.letter = letter;
  }
  // Function to read board and translate into rows / cols / diags
  readBoard(board) {
    // Reset count
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
  // Function to read single move and add to this.rows / this.cols / this.diags
  readMove(letter, i, j) {
    // Letter variable represents letter played, 'X' or 'O'
    // Add move to the select row, column, and diagonal
    this.rows[i][letter]++;
    this.cols[j][letter]++;
    // if first diagonal
    if (i === j) {
      // if center
      if (i === 1) {
        this.diags[1][letter]++;
        this.diags[2][letter]++;
      } else {
        this.diags[1][letter]++;
      }
    } else if ((i === 2 && j === 0) || (i === 0 && j === 2)) {
      // if second diagonal
      this.diags[2][letter]++;
    }
  }
  // Undo the move from this.rows / this.cols / this.diags
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
  // Finds all possible paths for 2 in a row (a threat)
  createThreat(board) {
    const threats = [];
    const moves = this.possibleMoves(board);
    moves.forEach((move) => {
      const phantomBoard = board.map(row => row.slice());
      const i = move[0];
      const j = move[1];
      phantomBoard[i][j] = this.letter;
      const winNextMove = this.winNextMove(phantomBoard, this.letter);
      if (winNextMove) {
        threats.push([i, j]);
      }
    });
    return threats;
  }
  // Find if there could be a win with the next move.
  winNextMove(board, letter) {
    const other = letter === 'X' ? 'O' : 'X';
    const winMoves = [];
    // Check rows for next move wins, i.e. when the row/column/diagonal would equal 3 next
    for (const row in this.rows) {
      // console.log('ROW: ', row)
      if (this.rows[row][letter] === 2 && this.rows[row][other] === 0) {
        // Find the move that will end the game
        const j = board[row].indexOf(false);
        if (j > -1) {
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
  // Looks for moves that would guarantee win in 2 moves
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
  // This function calculates the best move for the AI by creating a
  // phantom board and predicting the human's next moves. Predict's the human's
  // next moves by using the same prioritizeMoves function that the AI uses.
  lookAhead(board) {
    const bestMove = [];
    const moves = this.possibleMoves(board);
    const human = this.letter === 'X' ? 'O' : 'X';
    // Iterate through each move, save moves that have best chance of winning
    moves.forEach((move) => {
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
      phantomBoard[i2][j2] = this.letter;
      this.readMove(this.letter, i2, j2);
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
      /* AI now checks if it has any prioritized moves for it's 3rd phantom move.
      If so, place it on the phantomBoard and check to see if that phantom move
      guaranteed a win (if there are 2 winning moves next turn). Else, check to see
      if there are any moves that will trap the opponent (a move that will
      cause 2 winning moves in the subsequent round).
      */
      const prioritizeAI = this.prioritizeMoves(phantomBoard, this.letter);
      if (prioritizeAI.length > 0) {
        i3 = prioritizeAI[0];
        j3 = prioritizeAI[1];
        // AI's tests a phantom move (prioritized) as it's 3rd move.
        phantomBoard[i3][j3] = this.letter;
        this.readMove(this.letter, i3, j3);
        let winMoves = this.winNextMove(phantomBoard, this.letter);
        if (winMoves.length > 1) {
          //Undo all readMoves and return the AI's second move
          this.undoMove(this.letter, i2, j2);
          this.undoMove(this.letter, i3, j3);
          if(humanI !== null) {
            this.undoMove(human, humanI, humanJ);
          }
          // Save the move. This move will lead to a guaranteed win.
          bestMove.push([i2,j2]);
        }
      } else {
        let trapMoves = this.findTraps(phantomBoard, this.letter);
        if (trapMoves.length > 0) {
          this.undoMove(this.letter, i2, j2);
          if(humanI !== null) {
            this.undoMove(human, humanI, humanJ);
          }
          // Save move. This move attempts to setup a trap in the next (3rd) move.
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
    if(bestMove.length > 0) {
      // Select a random best move if there is more than one
      const randIdx = Math.floor(Math.random() * bestMove.length);
      return bestMove[randIdx];
    }
    return [];
  }

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
      let randIdx = Math.floor(Math.random() * allyWins.length);
      return allyWins[randIdx];
    } else if (enemyWins.length > 0) {
      // If enemy can win in next move, block that move.
      let randIdx = Math.floor(Math.random() * enemyWins.length);
      return enemyWins[randIdx];
    } else if (allyTraps.length > 0) {
      // If AI can trap in 1 move, return that move.
      let randIdx = Math.floor(Math.random() * allyTraps.length);
      return allyTraps[randIdx];
    } else if (enemyTraps.length === 1) {
      // If enemy can trap in 1 move, block that move.
      return enemyTraps[0];
    }
    return [];
  }

  AIMove(board) {
    this.readBoard(board);
    // Find all possible moves.
    const enemy = this.letter === 'X' ? 'O' : 'X';
    const enemyTraps = this.findTraps(board, enemy);
    const threats = this.createThreat(board);
    const moves = this.possibleMoves(board);
    const prioritize = this.prioritizeMoves(board, this.letter);

    if (prioritize.length > 0) {
      return prioritize;
    }
    // Edge case: when there are 2 potential traps in the next move.
    // This cannot be in the prioritizeMoves function.
    if (enemyTraps.length > 1 && threats.length > 0) {
      // Choose a random threat (2-in-a-row)
      const idx = Math.floor(Math.random() * threats.length);
      return threats[idx];
    }
    // If there are still available moves
    if (moves.length > 0) {
      // If AI moves first, place X in a corner.
      if (moves.length === 9) {
        // Choose random corner to start
        const idx = [0, 2];
        const randI = Math.floor(Math.random() * idx.length);
        const randJ = Math.floor(Math.random() * idx.length);
        return [idx[randI], idx[randJ]];
      } else if (moves.length === 8) {
        // If AI moves second, AI will choose:
        // 1) If human chose edge, a corner next to it
        // 2) The center if available
        // 3) A random corner
        if (board[0][1] || board[1][0] || board[1][2] || board[2][1]) {
          // Find the human's move
          let humanMove;
          // Randomize which corner (next to the human) the AI will take
          const random = [-1, 1];
          const aiIdx = Math.floor(Math.random()*random.length);
          const edges = [[0, 1], [1, 0], [1, 2], [2, 1]];
          edges.forEach((edge) => {
            if (board[edge[0]][edge[1]]) {
              humanMove = edge;
            }
          });
          // If human placed in top or bottom row, place move next to it
          if (humanMove[0] === 0 || humanMove[0] === 2) {
            return [humanMove[0], humanMove[1] + random[aiIdx]];
          }
          // Else if human placed in middle row, place move above or below.
          return [humanMove[0] + random[aiIdx], humanMove[1]];
        } else if (!board[1][1]) {
          // Else if center is not taken, move there
          return [1, 1];
        }
        // Else move to a random corner
        const idx = [0, 2];
        const randI = Math.floor(Math.random() * idx.length);
        const randJ = Math.floor(Math.random() * idx.length);
        return [idx[randI], idx[randJ]];
      } else if (moves.length <= 7) {
        // On AI's second move, use lookAhead function to calculate the best
        // move by predicting the human's next 2 moves.
        const nextMove = this.lookAhead(board);
        if (nextMove.length > 0) {
          return nextMove;
        } else if (threats.length > 0) {
          // If no best moves, return random threat.
          const idx = Math.floor(Math.random() * threats.length);
          return threats[idx];
        }
        // If no best moves or threats, return random move.
        const rand = Math.floor(Math.random() * moves.length);
        return moves[rand];
      }
    }
    // If there are no moves, then the match is a draw.
    return [];
  }
}
export default AI;

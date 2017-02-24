class AI = {
  constructor() {
    this.rows = {
    //Each number represents a row
      0: {'X': 0,
          'O': 0},
      1: {'X': 0,
          'O': 0},
      2: {'X': 0,
          'O': 0},
    };
    this.cols = {
    //Each number represents a column
      0: {'X': 0,
          'O': 0},
      1: {'X': 0,
          'O': 0},
      2: {'X': 0,
          'O': 0},
    };
    //Diagonsals = 1: [0,0], [1,1], [2,2]
    //2: [0,2], [1,1], [2,0]
    this.diags = {
      1: {'X': 0,
          'O': 0},
      2: {'X': 0,
          'O': 0},
    }
  }
  readHumanMove(enemy, i, j) {
    // enemy variable represents human's letter, 'X' or 'O'
    // Add move to the select row, column, and diagonal
    this.rows[i][enemy]++;
    this.cols[j][enemy]++;
    //if first diagonal
    if(i === j) {
      //if center
      if(i === 1) {
        this.diags[1][enemy]++;
        this.diags[2][enemy]++;
      }
      else{
        this.diags[1][enemy]++;
      }
    }
    //if second diagonal
    else if((i === 2 && j === 0) || (i === 0 && j === 2)) {
      this.diags[2][enemy]++;
    }
  },
  winNextMove(board, letter, enemy) {
    let moves = [];
    //Check rows for next move wins, i.e. when the row/column/diagonal would equal 3 next
    for(let key in this.rows) {
      if(key[letter] === 2 && key[enemy] === 0) {
        //Find the move that will end the game
        let j = board[key].indexOf(false);
        let i = parseInt(key);
        moves.push([i, j]);
      }
    }
    //Check columns for next move wins
    for(let key in this.columns) {
      if(key[letter] === 2 && key[enemy] === 0) {
        //Find the move that will end the game
        for(let i = 0; i < board.length ; i++) {
          if(!board[i][key]) {
            let j = parseInt(key);
            moves.push([i, j])
          }
        }
      }
    }
    //Check diagonals for next move wins
    //Check first diagonal
    if(this.diags[1][letter] === 2 && this.diags[1][enemy] === 0) {
      let i = 0;
      let j = 0;
      while(i < board.length) {
        if(!board[i][j]) {
          moves.push([i, j])
        }
        i++;
        j++;
      }
    }
    //Check second diagonal
    if(this.diags[2][letter] === 2 && this.diags[2][enemy] === 0) {
      let i = 0;
      let j = 2;
      while(i < board.length) {
        if(!board[i][j]) {
          moves.push([i, j])
        }
        i++;
        j--;
      }
    }
  }
},
AIMove(board) {

}

export default AI;

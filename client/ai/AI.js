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
    //Check rows for next move wins
    for(let key in this.rows) {
      if(key[letter] === 2 && key[enemy] === 0) {

      }
    }
    //Check columns for next move wins
    for(let key in this.columns) {
      if(key[letter] === 2 && key[enemy] === 0) {

      }
    }
    //Check diagonals for next move wins
    for(let key in this.diagonal) {
      if(key[letter] === 2 && key[enemy] === 0) {

      }
    }
  }
},
AIMove(board) {

}

export default AI;

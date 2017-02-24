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
    //2: [0,2], [1,1], [0,2]
    this.diags = {
      1: {'X': 0,
          'O': 0},
      2: {'X': 0,
          'O': 0},
    }
  }
  // countRow(row) {
  //   let count = {
  //     'X': 0,
  //     'O': 0,
  //   };
  //   row.forEach((value) => {
  //     if(value) {
  //       count[value]++;
  //     }
  //   });
  //   return count;
  // },
  winNextMove(board, letter) {
    let moves = [];
    //Check for next move wins

  }
}

export default AI;

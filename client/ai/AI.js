const AI = {
  countRow(row) {
    let count = {
      'X': 0,
      'O': 0,
    };
    row.forEach((value) => {
      if(value) {
        count[value]++;
      }
    });
    return count;
  },
  nextMove(board, letter, enemyLetter) {
    let move = {};
    //Check rows for next move win
    board.forEach((row, j) => {
      let count = countRow(row);
      if(count[letter] === 2 && row.includes(false)) {
        let i = row.indexOf(false);
        move['i'] = i;
        move['j'] = j;
      }
    })
  }
}

export default AI;

Array.prototype.transpose = function () {
  let transposedArray = [];
  for (let i = 0; i < this.length; i++) {
    let innerArray = this[i];
    let tempArray = [];
    for (let j = 0; j < innerArray.length; j++) {
      tempArray.push(this[j][i]);
    }
    transposedArray.push(tempArray);
  }

  return transposedArray;
};

Array.prototype.uniq = function() {
  let uniqArr = [];
  for (let i = 0; i < this.length; i++) {

    if (!uniqArr.includes(this[i])) {
      uniqArr.push(this[i]);
    }
  }
  return uniqArr;
};

class Board {
  constructor(player1, player2) {
    this.grid = [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']];
    this.player1 = player1;
    this.player2 = player2;
  }

  won () {
    for (let i = 0; i < this.grid.length; i++) {
      let row = this.grid[i];
      if (row.uniq().length === 1 && row[0] !== '-') {
        return [true, row[0]];
      }
    }

    for (let i = 0; i < this.grid.length; i++) {
      let col = this.grid.transpose()[i];
      if (col.uniq().length === 1 && col[0] !== '-') {
        return [true, col[0]];
      }
    }
    let diag1 = [];
    let diag2 = [];

    for (let i = 0; i < this.grid.length; i++) {
      diag1.push(this.grid[i][i]);
      diag2.push(this.grid[this.grid.length - 1 - i][i]);
    }

    if (diag1.uniq().length === 1 && diag1[0] !== '-') {
      return [true, diag1[0]];
    }
    if (diag2.uniq().length === 1 && diag2[0] !== '-') {
      return [true, diag2[0]];
    }

    return [false, '-'];
  }

  empty(pos){
    return this.grid[pos[0]][pos[1]] === '-';
  }

  winner(){
    if (this.won()[1] === "o") {
      return this.player1;
    } else if (this.won()[1] === "x") {
      return this.player2;
    } else {
      return "draw";
    }
  }

  placeMark(pos, mark) {
    this.grid[pos[0]][pos[1]] = mark;
  }

  print() {
    for (let i = 0; i < this.grid.length; i++) {
      console.log(this.grid[i]);
    }
  }
}

module.exports = Board;

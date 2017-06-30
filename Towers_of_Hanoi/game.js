// const readline = require('readline');
//
// const reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

class Game {
  constructor (reader) {
    this.reader = reader;

    this.stacks = [[1, 2, 3],[],[]];
    // this.run(completionCallback);
  }

  promptMove (cb) {
    this.print();

    this.reader.question("Input move: ", function(move){
      let input = move.split(',').map( num => parseInt(num));
      let start = input[0];
      let end = input[1];
      cb(start, end);
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    if (this.stacks[startTowerIdx].length === 0) {
      return false;
    } else if (this.stacks[endTowerIdx].length === 0) {
      return true;
    } else if (this.stacks[startTowerIdx][0] > this.stacks[endTowerIdx][0]) {
      return false;
    }

    return true;
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.stacks[endTowerIdx].unshift(this.stacks[startTowerIdx].shift());
      return true;
    }

    return false;
  }

  print() {
    console.log(this.stacks);
  }

  isWon() {
    return this.stacks[2].length === 3;
  }

  run(completionCallback) {
    this.promptMove((start, end) => {
      if (!this.move(start, end)) {
        console.log('Nope!');
      }

      if (this.isWon()) {
        console.log('You won good job LOL.');
        completionCallback();
      } else {
        this.run(completionCallback);
      }
    });
  }
}

module.exports = Game;

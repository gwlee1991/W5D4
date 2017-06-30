const readline = require('readline');

const Board = require('./board.js');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

Array.prototype.rotate = (function() {
  // save references to array functions to make lookup faster
  var push = Array.prototype.push,
  splice = Array.prototype.splice;

  return function(count) {
    var len = this.length >>> 0, // convert to uint
    count = count >> 0; // convert to int

    // convert count to value in range [0, len)
    count = ((count % len) + len) % len;

    // use splice.call() instead of this.splice() to make function generic
    push.apply(this, splice.call(this, 0, count));
    return this;
  };
})();


class Game {
  constructor() {
    this.players = [{
      name: 'player1',
      mark: 'o'
    }, {
      name: 'player2',
      mark: 'x'
    }];

    this.board = new Board(this.players[0], this.players[1]);
  }

  currentPlayer() {
    return this.players[0];
  }

  nextPlayer() {
    this.players.rotate;
  }

  prompt(cb) {
    this.board.print();

    reader.question('Make your move: ', (res) => {
      let pos = res.split(',').map((x) => parseInt(x));
      cb(pos);
      // if (this.board.empty(pos)) {
      //   this.board.placeMark(pos, this.currentPlayer().mark);
      //   console.log(this.board.grid);
      //   return true;
      // } else {
      //   console.log('You idiot!');
      //   return false;
      // }
    });
  }

  play(completionCallback) {
    // while (!this.board.won()[0]) {
    //   if (this.prompt()) {
    //     this.nextPlayer();
    //   }
    // }
    this.prompt(pos => {
      if (this.board.empty(pos)) {
        this.board.placeMark(pos, this.currentPlayer().mark);
        this.nextPlayer();
      } else {
        console.log('You idiot!');
      }

      if (this.board.won()[0]) {
        console.log(`${this.board.winner()} won!`);
        completionCallback();
      } else {
        this.play(completionCallback);
      }
    });
  }
}

const game = new Game();
// game.play(() => reader.close());

console.log([1,2].rotate());

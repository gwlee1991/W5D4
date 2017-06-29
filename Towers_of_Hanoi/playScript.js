const Game = require('./game.js');
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function play() {
  reader.question('Play again?: ', (res) => {
    if (res === 'yes') {
      new Game(reader).run(play);
    } else {
      reader.close();
    }
  });
}

play();

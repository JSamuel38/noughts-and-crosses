const gameboard = (() => {
  const size = new Array(9);
  const score = [0, 0];
  const getScore = score;
  const addPlayer1Score = () => score[0]++;
  const addPlayer2Score = () => score[1]++;
  const display = (cell, index) => {
    cell.innerText = size[index];
  };
  const checkForWin = () => {
    //Check rows
    for (let i = 0; i < 9; i+=3) {
      if (!size[i]) continue;
      if (size[i] === size[i + 1] && size[i + 1] === size[i + 2]) return true;
    }
    //Check columns
    for (let i = 0; i < 3; i++) {
      if (!size[i]) continue;
      if (size[i] === size[i + 3] && size[i + 3] === size[i + 6]) return true;
    }
    //Check diagonals
    if (size[0] && size[0] === size[4] && size[4] === size[8]) return true;
    if (size[2] && size[2] === size[4] && size[4] === size[6]) return true;
  };
  return {
    getScore,
    size,
    addPlayer1Score,
    addPlayer2Score,
    display,
    checkForWin
  };
})();

const PlayerFactory = (team) => {
  return {
    team
  };
};

const BotFactory = (team) => {
  const prototype = PlayerFactory(team);

  const easySelect = () => {
    let selection = Math.floor(Math.random() * 9);
    if (gameboard.size[selection]) return easySelect();
    return selection;
  };

  const botSelect = (level) => {
    let selection;
    if (level === 'easy') selection = easySelect();
    return selection;
  };

  return Object.assign({}, prototype, {botSelect}) ;
};

const gameBoard = document.querySelector('.gameboard');
const cellsList = gameBoard.querySelectorAll('.cell');
const playerForm = document.querySelector('form');

let bot;
let player;
playerForm.addEventListener(
  'submit',
  (e) => {
    const data = new FormData(playerForm);
    const playerTeam = data.get('team');
    let aiTeam;
    (playerTeam === 'x') ? aiTeam = 'o' : aiTeam = 'x';
    player = PlayerFactory(playerTeam);
    bot = BotFactory(aiTeam);
    e.preventDefault();
  },
  false
);

cellsList.forEach((cell) => {
  let index = Array.prototype.indexOf.call(cellsList, cell);
  cell.addEventListener(
    'click',
    () => {
      if (player && !gameboard.size[index]) {
        //Player
        gameboard.size[index] = player.team;
        gameboard.display(cell, index);
        if (gameboard.checkForWin()) {
          gameboard.addPlayer1Score();
          gameboard.reset();
        }
        //Bot
        let botChoice = bot.botSelect('easy');
        gameboard.size[botChoice] = bot.team;
        gameboard.display(cellsList[botChoice], botChoice);
        if(gameboard.checkForWin()) {
          gameboard.addPlayer2Score();
          gameboard.reset();
        }
      } else if (!player){
        alert('Please select a team');
      }
    }
  );
}); 

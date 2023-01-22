const gameboard = (() => {
  const size = new Array(9);
  const score = [0, 0];
  const getScore = score;
  const addPlayer1Score = score[0];
  const addPlayer2Score = score[1];
  const display = (cell, index) => {
    cell.innerText = size[index];
  };
  return {
    getScore,
    size,
    addPlayer1Score,
    addPlayer2Score,
    display
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
        gameboard.size[index] = player.team;
        gameboard.display(cell, index);
        let botChoice = bot.botSelect('easy');
        gameboard.size[botChoice] = bot.team;
        gameboard.display(cellsList[botChoice], botChoice);
      } else if (!player){
        alert('Please select a team');
      }
    }
  );
}); 

const gameboard = (() => {
  const size = new Array(9);
  const score = [0, 0];
  const getScore = score;
  const addPlayer1Score = score[0];
  const addPlayer2Score = score[1];
  return {
    getScore,
    size,
    addPlayer1Score,
    addPlayer2Score
  };
})();

const playerFactory = (name, team) => {
  return {
    name,
    team
  };
};

const gameBoard = document.querySelector('.gameboard');
const cellsList = gameBoard.querySelectorAll('.cell');
const playerForm = document.querySelector('form');

let player;
playerForm.addEventListener(
  'submit',
  (e) => {
    const data = new FormData(playerForm);
    const playerName = data.get('player-name');
    const playerTeam = data.get('team');
    player = playerFactory(playerName, playerTeam);
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
      } else if (!player){
        alert('Please select a player');
      }
    }
  );
}); 

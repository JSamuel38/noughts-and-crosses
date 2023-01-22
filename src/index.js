const gameboard = (() => {
  const size = new Array(9);
  const score = [0, 0];
  const getScore = score;
  const getSize = size;
  const addPlayer1Score = score[0];
  const addPlayer2Score = score[1];
  return {
    getScore,
    getSize,
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
const cell = gameBoard.querySelectorAll('.cell');
const playerForm = document.querySelector('form');

playerForm.addEventListener(
  'submit',
  (e) => {
    const data = new FormData(playerForm);
    const playerName = data.get('player-name');
    const playerTeam = data.get('team');
    const player = playerFactory(playerName, playerTeam);
    e.preventDefault();
  },
  false
);

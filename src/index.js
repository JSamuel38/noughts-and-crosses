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

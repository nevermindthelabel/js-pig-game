/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let gamePlaying = true;
let lastRollDice = null;
let lastRollDice1 = null;
let targetScore = null;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let diceDom = document.getElementById('dice1');
    let diceDom1 = document.getElementById('dice2');
    displayDice();
    diceDom.style.display = 'block';
    diceDom1.style.display = 'block';
    diceDom.src = `dice-${dice}.png`;
    diceDom1.src = `dice-${dice1}.png`;
    if (dice === 6 && lastRollDice === 6 || dice1 === 6 && lastRollDice1 === 6) {
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
      nextPlayer();
    } else if (dice && dice1 !== 1) {
      roundScore += dice + dice1;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    }
    lastRollDice = dice;
    lastRollDice1 = dice1;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    targetScore = document.getElementById('targetScore').value;
    let winningScore;
    if (targetScore) {
      winningScore = targetScore;
    } else {
      winningScore = 100
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!!!!!';
      hideDice();
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      document.querySelector('.btn-roll').style.display = 'none';
      document.querySelector('.btn-hold').style.display = 'none';
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector(`#name-0`).textContent = 'Player 1';
  document.querySelector(`#name-1`).textContent = 'Player 2';
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  hideDice();
};

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector(`.player-0-panel`).classList.toggle('active');
  document.querySelector(`.player-1-panel`).classList.toggle('active');
  hideDice();
};

function hideDice() {
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
}

function displayDice() {
  document.getElementById('dice1').style.display = 'block';
  document.getElementById('dice2').style.display = 'block';
}

'use strict';

const playerOneEl = document.querySelector('.player--0');
const playerTwoEl = document.querySelector('.player--1');
const playerOneScoreEl = document.querySelector('#score--0');
const playerTwoScoreEl = document.querySelector('#score--1');
const currentScorePlayerOne = document.querySelector('#current--0');
const currentScorePlayerTwo = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  playerOneScoreEl.textContent = 0;
  playerTwoScoreEl.textContent = 0;
  currentScorePlayerOne.textContent = 0;
  currentScorePlayerTwo.textContent = 0;
  playerOneEl.classList.remove('player--winner');
  playerTwoEl.classList.remove('player--winner');
  playerOneEl.classList.add('player--active');
  playerTwoEl.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

const swithchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOneEl.classList.toggle('player--active');
  playerTwoEl.classList.toggle('player--active');
};

//rolling the dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    console.log(dice);

    // 2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      swithchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swithchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

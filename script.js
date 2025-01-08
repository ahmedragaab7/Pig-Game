'use strict';

// Selecting elements
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

// Starting conditions
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

// Switch player function
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOneEl.classList.toggle('player--active');
  playerTwoEl.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Reset game functionality
btnNew.addEventListener('click', init);

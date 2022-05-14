'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
const scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;

const showDice = () => {
  diceEl.classList.remove('hidden');
};

const hideDice = () => {
  diceEl.classList.add('hidden');
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = () => {
  // removing player-winner class from winner
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  // reseting starting conditions
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;

  // reseting visible elements
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  btnRoll.disabled = false;
  btnHold.disabled = false;
  player0El.classList.add('player--active');
  hideDice();
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  // 1. Generating random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  // 2. Display dice

  showDice();
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', () => {
  // 1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if player's score is >= 100
  if (scores[activePlayer] >= 100) {
    // Finish the game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    hideDice();

    btnRoll.disabled = true;
    btnHold.disabled = true;

    // Switch to the next player
  } else {
    switchPlayer();
  }
});

// Reseting the game states when clicking on New Game button
btnNew.addEventListener('click', init);

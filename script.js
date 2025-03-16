// starting variables
let currentScore = [];
let totalScore = [];
let diceRoll, playing, currentPlayer = '';

//button variables
const btnNew = document.querySelector('.btnNew');
const btnRoll = document.querySelector('.btnRoll');
const btnHold = document.querySelector('.btnHold');

//starting conditions
const startingCond = function() {
    playing = true;
    diceRoll = 0;
    currentPlayer = 0
    currentScore = [0, 0];
    document.querySelector(`.score__0`).textContent = currentScore[0];
    document.querySelector(`.score__1`).textContent = currentScore[1];
    totalScore = [0, 0];
    document.querySelector('.score__hold__1').textContent = totalScore[1];
    document.querySelector('.score__hold__0').textContent = totalScore[0];
    document.querySelector('.dice').classList.add('hidden');
    document.querySelector('.indicator0').classList.add('indicatorActive');
};

const switchPlayer = function() {
    currentScore[currentPlayer] = 0;
    document.querySelector(`.score__${currentPlayer}`).textContent = currentScore[currentPlayer];
    document.querySelector(`.indicator${currentPlayer}`).classList.remove('indicatorActive');
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.querySelector(`.indicator${currentPlayer}`).classList.add('indicatorActive');
};

startingCond()

btnRoll.addEventListener('click', function() {
   if (playing){    
    diceRoll = Math.trunc(Math.random() * 6) + 1;
    document.querySelector('.dice').src = `dice-${diceRoll}.png`;
    document.querySelector('.dice').classList.remove('hidden');
    if (diceRoll !== 1) {
        if (currentPlayer == 0) {
            currentScore[0] += diceRoll;
            document.querySelector('.score__0').textContent = currentScore[0];
        }
        else {
            currentScore[1] += diceRoll;
            document.querySelector('.score__1').textContent = currentScore[1];
        }
    }
    else {
        switchPlayer()
    }
}})

btnHold.addEventListener('click', function() {
    if (playing) {
        totalScore[currentPlayer] += currentScore[currentPlayer];
        document.querySelector(`.score__hold__${currentPlayer}`).textContent = totalScore[currentPlayer];
        if (totalScore[currentPlayer] >= 100) {
            document.querySelector(`.player${currentPlayer}`).classList.remove('activePlayer');
            document.querySelector(`.player${currentPlayer}`).classList.add('winner');
            currentScore[currentPlayer] = 0;
            document.querySelector(`.score__${currentPlayer}`).textContent = currentScore[currentPlayer];
            playing = false;
        } else {
            switchPlayer()
        }}
    })

btnNew.addEventListener('click', function() {
    document.querySelector(`.player${currentPlayer}`).classList.remove('winner');
    document.querySelector(`.indicator${currentPlayer}`).classList.remove('indicatorActive');
    startingCond()
})
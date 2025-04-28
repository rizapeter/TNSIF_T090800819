let currentPlayer = 1;
let rolls = [];
const dice = document.getElementById('dice');
const turnText = document.getElementById('turn');
const winnerText = document.getElementById('winner');
const rollBtn = document.getElementById('rollBtn');

// Dice faces as emojis
const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

rollBtn.addEventListener('click', () => {
    rollBtn.disabled = true;

    let rollCount = 0;
    const rolling = setInterval(() => {
        const randomFace = Math.floor(Math.random() * 6);
        dice.textContent = diceFaces[randomFace];
        rollCount++;

        // After some rolls, stop and pick final number
        if (rollCount >= 15) {  // Spins 15 times
            clearInterval(rolling);
            const finalRoll = Math.floor(Math.random() * 6);
            dice.textContent = diceFaces[finalRoll];

            rolls.push({ player: currentPlayer, roll: finalRoll + 1 });

            if (currentPlayer === 3) {
                determineWinner();
                rollBtn.style.display = 'none'; // hide after game over
            } else {
                currentPlayer++;
                turnText.textContent = `Player ${currentPlayer}'s Turn`;
                rollBtn.disabled = false;
            }
        }
    }, 100);  // speed of rolling (100ms per frame)
});

function determineWinner() {
    let winner = rolls[0];
    for (let i = 1; i < rolls.length; i++) {
        if (rolls[i].roll > winner.roll) {
            winner = rolls[i];
        }
    }
    winnerText.textContent = `🏆 Winner: Player ${winner.player} with ${diceFaces[winner.roll - 1]} (${winner.roll})! 🏆`;
}

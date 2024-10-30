const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Function to handle cell clicks
const handleClick = (index) => {
    if (gameState[index] || !isGameActive) return;
    gameState[index] = currentPlayer;

    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = currentPlayer;
    board.children[index].appendChild(cell);

    // Check for a win or draw here (basic logic for now)
    if (gameState.every(cell => cell !== '')) {
        alert("It's a draw!");
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

// Initialize the board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
}

// Function to reset the game
const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    Array.from(board.children).forEach(cell => {
        cell.textContent = '';
    });
};

// Reset button click event
resetButton.onclick = resetGame;

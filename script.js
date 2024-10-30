const board = document.getElementById('board');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true; // Track if the game is still active

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Function to check for a winner
const checkWinner = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return null;
};

// Function to handle cell clicks
const handleClick = (index) => {
    if (gameState[index] || !isGameActive) return; // Prevent actions if the cell is filled or game is over
    gameState[index] = currentPlayer;

    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = currentPlayer;
    board.children[index].appendChild(cell);

    const winner = checkWinner();
    if (winner) {
        isGameActive = false; // Stop the game
        setTimeout(() => alert(`${winner} wins!`), 100);
    } else if (!gameState.includes('')) {
        // Check for a draw (if there are no empty cells left)
        isGameActive = false; // Stop the game
        setTimeout(() => alert("It's a draw!"), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
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
        cell.textContent = ''; // Clear the cells
    });
};

// Add a reset button
const resetButton = document.createElement('button');
resetButton.textContent = 'Restart Game';
resetButton.onclick = resetGame;
document.body.appendChild(resetButton);

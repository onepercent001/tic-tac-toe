const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
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
            return condition; // Return the winning condition
        }
    }
    return null;
};

// Function to display the winning line
const drawWinningLine = (winningCondition) => {
    const line = document.createElement('div');
    line.classList.add('winning-line');
    const [a, b, c] = winningCondition;

    // Calculate the position based on the winning cells
    const startCell = board.children[a].getBoundingClientRect();
    const endCell = board.children[c].getBoundingClientRect();
    
    const startX = startCell.left + startCell.width / 2;
    const startY = startCell.top + startCell.height / 2;
    const endX = endCell.left + endCell.width / 2;
    const endY = endCell.top + endCell.height / 2;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    line.style.left = `${midX}px`;
    line.style.top = `${midY}px`;
    line.style.transform += `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;
    document.body.appendChild(line); // Add the line to the body
};

// Function to handle cell clicks
const handleClick = (index) => {
    if (gameState[index] || !isGameActive) return; // Prevent actions if the cell is filled or game is over
    gameState[index] = currentPlayer;

    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = currentPlayer;
    board.children[index].appendChild(cell);

    const winningCondition = checkWinner();
    if (winningCondition) {
        isGameActive = false; // Stop the game
        drawWinningLine(winningCondition); // Draw line
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
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
    const winningLine = document.querySelector('.winning-line');
    if (winningLine) winningLine.remove(); // Remove the winning line
};

// Reset button click event
resetButton.onclick = resetGame;

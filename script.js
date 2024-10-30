const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X'; // Start with player X
let gameActive = true; // Game status
let gameState = ["", "", "", "", "", "", "", "", ""]; // Game state

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return; // Cell already clicked or game is not active
    }

    // Update the game state
    gameState[clickedCellIndex] = currentPlayer;

    // Create image element based on current player
    const img = document.createElement('img');
    img.src = currentPlayer === 'X' ? 'x-image.jpg' : 'o-image.jpg'; // Use the image filenames you provided
    clickedCell.appendChild(img); // Append image to clicked cell

    // Check for a winner
    checkForWinner();

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for winner
function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue; // Continue to the next condition if there's an empty cell
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break; // Winner found
        }
    }

    if (roundWon) {
        highlightWinner();
        gameActive = false; // End game
        return; // Exit function
    }

    if (!gameState.includes("")) {
        alert("Draw!"); // Check for a draw
        gameActive = false; // End game
    }
}

// Highlight the winning sequence
function highlightWinner() {
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');
        }
    });
}

// Reset the game
function resetGame() {
    gameActive = true; // Restart the game
    currentPlayer = 'X'; // Reset current player
    gameState = ["", "", "", "", "", "", "", "", ""]; // Reset game state

    cells.forEach(cell => {
        cell.textContent = ""; // Clear cell content
        cell.classList.remove('winning'); // Remove highlighting
        cell.innerHTML = ""; // Clear any images
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

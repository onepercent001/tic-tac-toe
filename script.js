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

// Update the handleClick function to call drawWinningLine
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
        const winningCondition = winningConditions.find(condition => condition.includes(index) && condition.every(i => gameState[i] === winner));
        drawWinningLine(winningCondition); // Draw line
        setTimeout(() => alert(`${winner} wins!`), 100);
    } else if (!gameState.includes('')) {
        // Check for a draw (if there are no empty cells left)
        isGameActive = false; // Stop the game
        setTimeout(() => alert("It's a draw!"), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
    }
};

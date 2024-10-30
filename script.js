const board = document.getElementById('board');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const checkWinner = () => {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return null;
};

const handleClick = (index) => {
    if (gameState[index] || checkWinner()) return;
    gameState[index] = currentPlayer;
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = currentPlayer;
    board.appendChild(cell);
    
    const winner = checkWinner();
    if (winner) {
        setTimeout(() => alert(`${winner} wins!`), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
}

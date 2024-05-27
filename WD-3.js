// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cells = Array.from(document.getElementsByClassName('cell'));
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
    
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;
    
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
    
    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;
        
        if (board[index] || !gameActive) {
            return;
        }
        
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkForWinner()) {
            message.textContent = ${currentPlayer} wins!;
            gameActive = false;
            return;
        }
        
        if (board.every(cell => cell)) {
            message.textContent = "It's a tie!";
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = Player ${currentPlayer}'s turn;
    }
    
    function checkForWinner() {
        return winningConditions.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }
    
    function restartGame() {
        board.fill(null);
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
        message.textContent = Player ${currentPlayer}'s turn;
    }
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    
    message.textContent = Player ${currentPlayer}'s turn;
});
function loadTicTacToe() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Clear existing game container
    const modeContainer = document.createElement('div');
    modeContainer.classList.add('mode-container');
    modeContainer.innerHTML = `
        <button id="pvp-mode" class="mode-button selected">PvP</button>
        <button id="pve-mode" class="mode-button">PvE</button>
    `;
    gameContainer.appendChild(modeContainer);

    const board = document.createElement('div');
    board.classList.add('board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
    }
    gameContainer.appendChild(board);

    document.getElementById('pvp-mode').addEventListener('click', () => startTicTacToe('pvp'));
    document.getElementById('pve-mode').addEventListener('click', () => startTicTacToe('pve'));
}

function startTicTacToe(selectedMode) {
    const modeButtons = document.querySelectorAll('.mode-button');
    modeButtons.forEach(button => button.classList.remove('selected'));
    if (selectedMode === 'pvp') {
        document.getElementById('pvp-mode').classList.add('selected');
    } else {
        document.getElementById('pve-mode').classList.add('selected');
    }

    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let gameActive = true;
    let mode = selectedMode;

    function handleClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;
        if (cell.innerHTML === '' && gameActive && !boardState[index]) {
            boardState[index] = currentPlayer;
            cell.innerHTML = currentPlayer === 'X' ? getSVG('X') : getSVG('O');
            if (checkWin(currentPlayer)) {
                alert(`${currentPlayer} wins!`);
                gameActive = false;
                return;
            }
            if (mode === 'pve' && currentPlayer === 'X') {
                currentPlayer = 'O';
                setTimeout(aiMove, 500);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function aiMove() {
        let availableCells = boardState.map((val, index) => val === null ? index : null).filter(val => val !== null);
        if (availableCells.length > 0) {
            const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
            boardState[randomIndex] = 'O';
            cell.innerHTML = getSVG('O');
            if (checkWin('O')) {
                alert(`O wins!`);
                gameActive = false;
                return;
            }
            currentPlayer = 'X';
        }
    }

    function getSVG(player) {
        if (player === 'X') {
            return `<svg viewBox="0 0 100 100">
                        <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"/>
                        <line x1="90" y1="10" x2="10" y2="90" stroke="black" stroke-width="10"/>
                    </svg>`;
        } else {
            return `<svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="10" fill="none"/>
                    </svg>`;
        }
    }

    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winPatterns.some(pattern => 
            pattern.every(index => boardState[index] === player)
        );
    }

    function resetGame() {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.innerHTML = '';
        });
        gameActive = true;
        currentPlayer = 'X';
    }

    cells.forEach(cell => cell.removeEventListener('click', handleClick));
    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetGame();
}

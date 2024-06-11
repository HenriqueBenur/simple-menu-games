function createCheatButton() {
    // removes existing buttons, if any
    const existingCheatButton = document.getElementById('cheat-button');
    if (existingCheatButton) {
        existingCheatButton.remove();
    }

    // create new button
    const cheatButton = document.createElement('button');
    cheatButton.id = 'cheat-button';
    cheatButton.textContent = 'Cheat';
    cheatButton.addEventListener('click', toggleCheatMode);

    const gameContainer = document.getElementById('game-container');
    gameContainer.appendChild(cheatButton);
}

function toggleCheatMode() {
    const board = document.querySelector('.board');
    if (board) {
        board.classList.toggle('cheat-mode');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona o botão "Cheat" ao carregar o jogo de memória
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            if (event.target.dataset.game === 'memory') {
                setTimeout(createCheatButton, 500); // Adds a little delay to ensure that the game container is loaded
            }
        });
    });

    // Checks if memoryGame is alredy loaded
    if (document.querySelector('.menu-item.selected').dataset.game === 'memory') {
        setTimeout(createCheatButton, 500);
    }
});

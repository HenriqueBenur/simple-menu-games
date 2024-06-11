function loadMemoryGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Clear existing game container

    const board = document.createElement('div');
    board.classList.add('board');

    const fruits = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥭'];
    const cards = [...fruits, ...fruits]; // Duplicating the array to get pairs
    cards.sort(() => 0.5 - Math.random()); // Shuffle the array

    cards.forEach((fruit, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner" data-index="${index}">
                <div class="card-front">${fruit}</div>
                <div class="card-back"></div>
            </div>
        `;
        board.appendChild(card);
    });

    gameContainer.appendChild(board);
    initializeMemoryGame();
}

function initializeMemoryGame() {
    const cards = document.querySelectorAll('.card-inner');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        if (!document.querySelector('.board').classList.contains('cheat-mode')) {
            this.classList.add('is-flipped');
        }

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.querySelector('.card-front').innerHTML === secondCard.querySelector('.card-front').innerHTML;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.parentElement.classList.add('is-matched');
        secondCard.parentElement.classList.add('is-matched');

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();

        matchedPairs++;
        if (matchedPairs === 8) {
            setTimeout(() => {
                alert('Você ganhou!');
                resetGame();
            }, 500);
        }
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            if (!document.querySelector('.board').classList.contains('cheat-mode')) {
                firstCard.classList.remove('is-flipped');
                secondCard.classList.remove('is-flipped');
            }

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function resetGame() {
        matchedPairs = 0;
        cards.forEach(card => {
            card.classList.remove('is-flipped', 'is-matched');
            card.addEventListener('click', flipCard);
        });
        loadMemoryGame();
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
}

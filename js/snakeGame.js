document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');

    function loadSnakeGame() {
        // Clear existing game container
        gameContainer.innerHTML = '';

        // Add Snake CSS dynamically
        const existingLink = document.querySelector('link[data-game="snake"]');
        if (existingLink) {
            existingLink.remove();
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/snakeGame.css';
        link.dataset.game = 'snake';
        document.head.appendChild(link);

        // Create Snake game elements
        const snakeGameContainer = document.createElement('div');
        snakeGameContainer.id = 'snake-game-container';

        const snakeGameBoard = document.createElement('div');
        snakeGameBoard.id = 'snake-game-board';

        const snakeGameScore = document.createElement('div');
        snakeGameScore.id = 'snake-game-score';
        snakeGameScore.textContent = 'Score: 0';

        snakeGameContainer.appendChild(snakeGameBoard);
        snakeGameContainer.appendChild(snakeGameScore);
        gameContainer.appendChild(snakeGameContainer);

        initializeSnakeGame(snakeGameBoard, snakeGameScore);
    }

    function initializeSnakeGame(board, scoreElement) {
        // Create grid cells
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                board.appendChild(cell);
            }
        }

        // Create initial food
        let food = createFood(board);

        // Create initial player (snake) with two segments
        let snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 }
        ];
        let direction = { x: 0, y: 0 };
        let score = 0;
        let gameInterval;

        function createSnake() {
            snake.forEach(segment => {
                const snakeElement = document.createElement('div');
                snakeElement.style.gridColumnStart = segment.x + 1;
                snakeElement.style.gridRowStart = segment.y + 1;
                snakeElement.classList.add('snake');
                snakeElement.setAttribute('x', segment.x);
                snakeElement.setAttribute('y', segment.y);
                board.appendChild(snakeElement);
            });
        }

        createSnake();

        function moveSnake() {
            const newHead = {
                x: snake[0].x + direction.x,
                y: snake[0].y + direction.y
            };

            // Check for collisions with the borders
            if (newHead.x >= 20 || newHead.x < 0 || newHead.y >= 20 || newHead.y < 0) {
                clearInterval(gameInterval);
                alert('Game Over');
                loadSnakeGame();
                return;
            }

            // Check for collisions with food
            if (newHead.x === food.x && newHead.y === food.y) {
                snake.unshift(newHead);
                score++;
                scoreElement.textContent = `Score: ${score}`;
                board.removeChild(document.querySelector('.food'));
                food = createFood(board);
            } else {
                snake.unshift(newHead);
                const tail = snake.pop();

                // Remove the last snake segment from the grid
                const tailElement = document.querySelector(`.snake[x="${tail.x}"][y="${tail.y}"]`);
                if (tailElement) {
                    board.removeChild(tailElement);
                }
            }

            // Add the new head segment to the grid
            const snakeElement = document.createElement('div');
            snakeElement.style.gridColumnStart = newHead.x + 1;
            snakeElement.style.gridRowStart = newHead.y + 1;
            snakeElement.classList.add('snake');
            snakeElement.setAttribute('x', newHead.x);
            snakeElement.setAttribute('y', newHead.y);
            board.appendChild(snakeElement);
        }

        function changeDirection(event) {
            switch (event.key) {
                case 'w':
                    if (direction.y === 0) direction = { x: 0, y: -1 };
                    break;
                case 's':
                    if (direction.y === 0) direction = { x: 0, y: 1 };
                    break;
                case 'a':
                    if (direction.x === 0) direction = { x: -1, y: 0 };
                    break;
                case 'd':
                    if (direction.x === 0) direction = { x: 1, y: 0 };
                    break;
            }
        }

        document.addEventListener('keydown', changeDirection);
        gameInterval = setInterval(moveSnake, 200);
    }

    function createFood(board) {
        let foodX, foodY, isOccupied;
        do {
            isOccupied = false;
            foodX = Math.floor(Math.random() * 20);
            foodY = Math.floor(Math.random() * 20);

            // Ensure the new food position is not occupied by the snake
            document.querySelectorAll('.snake').forEach(segment => {
                const segX = parseInt(segment.getAttribute('x'));
                const segY = parseInt(segment.getAttribute('y'));
                if (segX === foodX && segY === foodY) {
                    isOccupied = true;
                }
            });
        } while (isOccupied);

        const foodElement = document.createElement('div');
        foodElement.style.gridColumnStart = foodX + 1;
        foodElement.style.gridRowStart = foodY + 1;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

        return { x: foodX, y: foodY };
    }

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            if (event.target.dataset.game === 'snake') {
                loadSnakeGame();
            }
        });
    });

    if (document.querySelector('.menu-item.selected').dataset.game === 'snake') {
        loadSnakeGame();
    }
});

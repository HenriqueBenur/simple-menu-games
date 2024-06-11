document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const gameContainer = document.getElementById('game-container');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    let currentIndex = 0;

    // Function to toggle between dark and light mode
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.innerHTML = '<path d="M13.3986 7.64605C13.495 7.37724 13.88 7.37724 13.9764 7.64605L14.2401 8.38111C14.271 8.46715 14.3395 8.53484 14.4266 8.56533L15.1709 8.82579C15.443 8.92103 15.443 9.30119 15.1709 9.39644L14.4266 9.65689C14.3395 9.68738 14.271 9.75507 14.2401 9.84112L13.9764 10.5762C13.88 10.845 13.495 10.845 13.3986 10.5762L13.1349 9.84112C13.104 9.75507 13.0355 9.68738 12.9484 9.65689L12.2041 9.39644C11.932 9.30119 11.932 8.92103 12.2041 8.82579L12.9484 8.56533C13.0355 8.53484 13.104 8.46715 13.1349 8.38111L13.3986 7.64605Z" fill="#FFFFFF"/><path d="M16.3074 10.9122C16.3717 10.733 16.6283 10.733 16.6926 10.9122L16.8684 11.4022C16.889 11.4596 16.9347 11.5047 16.9928 11.525L17.4889 11.6987C17.6704 11.7622 17.6704 12.0156 17.4889 12.0791L16.9928 12.2527C16.9347 12.2731 16.889 12.3182 16.8684 12.3756L16.6926 12.8656C16.6283 13.0448 16.3717 13.0448 16.3074 12.8656L16.1316 12.3756C16.111 12.3182 16.0653 12.2731 16.0072 12.2527L15.5111 12.0791C15.3296 12.0156 15.3296 11.7622 15.5111 11.6987L16.0072 11.525C16.0653 11.5047 16.111 11.4596 16.1316 11.4022L16.3074 10.9122Z" fill="#FFFFFF"/><path d="M17.7693 3.29184C17.9089 2.90272 18.4661 2.90272 18.6057 3.29184L19.0842 4.62551C19.1288 4.75006 19.2281 4.84805 19.3542 4.89219L20.7045 5.36475C21.0985 5.50263 21.0985 6.05293 20.7045 6.19081L19.3542 6.66337C19.2281 6.7075 19.1288 6.80549 19.0842 6.93005L18.6057 8.26372C18.4661 8.65284 17.9089 8.65284 17.7693 8.26372L17.2908 6.93005C17.2462 6.80549 17.1469 6.7075 17.0208 6.66337L15.6705 6.19081C15.2765 6.05293 15.2765 5.50263 15.6705 5.36475L17.0208 4.89219C17.1469 4.84805 17.2462 4.75006 17.2908 4.62551L17.7693 3.29184Z" fill="#FFFFFF"/><path d="M9.272 2.406a1 1 0 0 0-1.23-1.355C6.59 1.535 5.432 2.487 4.37 3.55a11.399 11.399 0 0 0 0 16.182c4.518 4.519 11.51 4.261 15.976-.205 1.062-1.062 2.014-2.22 2.498-3.673A1 1 0 0 0 21.55 14.6c-3.59 1.322-7.675.734-10.434-2.025-2.765-2.766-3.328-6.83-1.844-10.168Z" fill="#FFFFFF"/>';
        } else {
            themeIcon.innerHTML = '<g clip-path="url(#a)" fill="#FFFFFF"><path d="M12 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1ZM0 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM21 11a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM13 21a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2ZM6.343 17.657a1 1 0 0 1 0 1.414L4.93 20.485a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0ZM20.485 3.515a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0ZM3.515 3.515a1 1 0 0 1 1.414 0l1.414 1.414A1 1 0 1 1 4.93 6.343L3.515 4.93a1 1 0 0 1 0-1.414ZM17.657 17.657a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414ZM5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"/></g>';
        }
    }

    themeToggle.addEventListener('click', toggleTheme);

    function updateSelected() {
        menuItems.forEach((item, index) => {
            item.classList.toggle('selected', index === currentIndex);
        });
        loadGame(menuItems[currentIndex].dataset.game);
    }

    function handleKeyDown(event) {
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % menuItems.length;
            updateSelected();
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
            updateSelected();
        }
    }

    function handleClick(event) {
        const selectedItem = event.target;
        menuItems.forEach((item, index) => {
            if (item === selectedItem) {
                currentIndex = index;
                updateSelected();
            }
        });
    }

    function loadGame(game) {
        let cssLink = document.getElementById('game-css');
        if (cssLink) {
            cssLink.remove();
        }

        if (game === 'tic-tac-toe') {
            cssLink = document.createElement('link');
            cssLink.id = 'game-css';
            cssLink.rel = 'stylesheet';
            cssLink.href = 'css/ticTacToe.css';
            document.head.appendChild(cssLink);
            loadTicTacToe();
        } else if (game === 'memory') {
            cssLink = document.createElement('link');
            cssLink.id = 'game-css';
            cssLink.rel = 'stylesheet';
            cssLink.href = 'css/memoryGame.css';
            document.head.appendChild(cssLink);
            loadMemoryGame();
        } else if (game === 'snake') {
            cssLink = document.createElement('link');
            cssLink.id = 'game-css';
            cssLink.rel = 'stylesheet';
            cssLink.href = 'css/snakeGame.css';
            document.head.appendChild(cssLink);
            loadSnakeGame();
        } else {
            gameContainer.innerHTML = `<div style="margin-top: 48px;" >Game ${game} will be available soon!</div>`;
        }
    }

    menuItems.forEach(item => item.addEventListener('click', handleClick));
    document.addEventListener('keydown', handleKeyDown);
    updateSelected();
});

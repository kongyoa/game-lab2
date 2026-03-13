const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let score = 0;
let snake = [];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let changingDirection = false;
let gameInterval;
let isGameRunning = false;

// Initialize game state
function initGame() {
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    score = 0;
    dx = 1; // Start moving right
    dy = 0;
    changingDirection = false;
    scoreElement.textContent = score;
    isGameRunning = true;
    startBtn.textContent = "重新开始";
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

// Main game loop
function gameLoop() {
    if (!isGameRunning) return;

    if (hasGameEnded()) {
        gameOver();
        return;
    }

    changingDirection = false;
    clearCanvas();
    moveSnake();
    drawFood();
    drawSnake();
}

// Clear canvas
function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Move snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        food = generateFood();
    } else {
        snake.pop();
    }
}

// Draw snake
function drawSnake() {
    ctx.fillStyle = '#4CAF50';
    snake.forEach((part, index) => {
        // Draw head with a slightly different color
        if (index === 0) ctx.fillStyle = '#388E3C';
        else ctx.fillStyle = '#4CAF50';
        
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

// Draw food
function drawFood() {
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// Generate random food position
function generateFood() {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        // Check if food spawns on snake body
        const onSnake = snake.some(part => part.x === newFood.x && part.y === newFood.y);
        if (!onSnake) break;
    }
    return newFood;
}

// Check game over conditions
function hasGameEnded() {
    // Initial state (not moving)
    if (dx === 0 && dy === 0 && snake.length === 1) return false;

    const head = snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Game over handler
function gameOver() {
    isGameRunning = false;
    clearInterval(gameInterval);
    alert(`游戏结束! 你的得分是: ${score}`);
    startBtn.textContent = "开始游戏";
}

// Keyboard input
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (!isGameRunning) return;
    if (changingDirection) return;

    changingDirection = true;

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

// Start button listener
startBtn.addEventListener('click', initGame);

// Initial draw (empty board)
clearCanvas();
drawSnake(); // Draw initial dot if needed or just wait for start
// Game Configuration
const GRID_SIZE = 15;
const CANVAS_SIZE = 450;
const PADDING = 15; // Padding around the grid
const CELL_SIZE = (CANVAS_SIZE - 2 * PADDING) / (GRID_SIZE - 1);
const PIECE_RADIUS = CELL_SIZE * 0.4;

// Colors
const COLOR_BOARD = '#E6B87D';
const COLOR_LINE = '#4A3B2A';
const COLOR_BLACK = '#000000';
const COLOR_WHITE = '#FFFFFF';

// Game State
let board = []; // 2D array: 0=empty, 1=black, 2=white
let currentPlayer = 1; // 1=black, 2=white
let isGameOver = false;
let moveHistory = []; // Stack for undo functionality

// DOM Elements
const canvas = document.getElementById('gomoku-board');
const ctx = canvas.getContext('2d');
const playerIndicator = document.getElementById('current-player');
const gameMessage = document.getElementById('game-message');
const undoBtn = document.getElementById('undo-btn');
const restartBtn = document.getElementById('restart-btn');

// Initialize Game
function initGame() {
    // Create empty 15x15 board
    board = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    currentPlayer = 1; // Black starts
    isGameOver = false;
    moveHistory = [];
    
    updateUI();
    drawBoard();
    
    gameMessage.textContent = '';
    gameMessage.style.color = '#e74c3c';
}

// Draw the board grid and pieces
function drawBoard() {
    // Clear canvas
    ctx.fillStyle = COLOR_BOARD;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw grid lines
    ctx.beginPath();
    ctx.strokeStyle = COLOR_LINE;
    ctx.lineWidth = 1;
    
    for (let i = 0; i < GRID_SIZE; i++) {
        // Vertical lines
        const x = PADDING + i * CELL_SIZE;
        ctx.moveTo(x, PADDING);
        ctx.lineTo(x, CANVAS_SIZE - PADDING);
        
        // Horizontal lines
        const y = PADDING + i * CELL_SIZE;
        ctx.moveTo(PADDING, y);
        ctx.lineTo(CANVAS_SIZE - PADDING, y);
    }
    ctx.stroke();
    
    // Draw 5 star points (Hoshi)
    drawStarPoints();
    
    // Draw pieces
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (board[r][c] !== 0) {
                drawPiece(r, c, board[r][c]);
            }
        }
    }
    
    // Highlight last move
    if (moveHistory.length > 0) {
        const lastMove = moveHistory[moveHistory.length - 1];
        drawLastMoveMarker(lastMove.row, lastMove.col);
    }
}

// Draw the 5 standard star points for 15x15 board
function drawStarPoints() {
    const points = [
        {r: 3, c: 3}, {r: 3, c: 11},
        {r: 7, c: 7},
        {r: 11, c: 3}, {r: 11, c: 11}
    ];
    
    ctx.fillStyle = COLOR_LINE;
    points.forEach(p => {
        const cx = PADDING + p.c * CELL_SIZE;
        const cy = PADDING + p.r * CELL_SIZE;
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Draw a single piece
function drawPiece(row, col, player) {
    const cx = PADDING + col * CELL_SIZE;
    const cy = PADDING + row * CELL_SIZE;
    
    ctx.beginPath();
    ctx.arc(cx, cy, PIECE_RADIUS, 0, Math.PI * 2);
    
    // Gradient for 3D effect
    const gradient = ctx.createRadialGradient(cx - 2, cy - 2, PIECE_RADIUS / 3, cx, cy, PIECE_RADIUS);
    
    if (player === 1) {
        gradient.addColorStop(0, '#555');
        gradient.addColorStop(1, 'black');
    } else {
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, '#ddd');
    }
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.stroke(); // Slight outline for white pieces visibility
    ctx.shadowColor = 'transparent'; // Reset shadow
}

// Mark the last move with a small red dot or cross
function drawLastMoveMarker(row, col) {
    const cx = PADDING + col * CELL_SIZE;
    const cy = PADDING + row * CELL_SIZE;
    
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.fillRect(cx - 2, cy - 2, 4, 4);
}

// Handle canvas click
function handleCanvasClick(e) {
    if (isGameOver) return;
    
    // Get mouse position relative to canvas
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    // Convert to grid coordinates
    // We want to find the nearest intersection
    const col = Math.round((x - PADDING) / CELL_SIZE);
    const row = Math.round((y - PADDING) / CELL_SIZE);
    
    // Validate bounds
    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return;
    
    // Validate empty cell
    if (board[row][col] !== 0) return;
    
    // Place move
    placeMove(row, col);
}

// Execute a move
function placeMove(row, col) {
    board[row][col] = currentPlayer;
    moveHistory.push({row, col, player: currentPlayer});
    
    // Check win condition
    if (checkWin(row, col, currentPlayer)) {
        isGameOver = true;
        drawBoard(); // Update to show piece
        const winnerText = currentPlayer === 1 ? '黑棋' : '白棋';
        gameMessage.textContent = `🎉 游戏结束！${winnerText}获胜！`;
        playerIndicator.textContent = `${winnerText}获胜`;
        playerIndicator.className = `player-indicator ${currentPlayer === 1 ? 'black-turn' : 'white-turn'}`;
        return;
    }
    
    // Switch turn
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateUI();
    drawBoard();
}

// Check for 5 in a row
function checkWin(row, col, player) {
    // Directions: Horizontal, Vertical, Diagonal (\), Anti-Diagonal (/)
    const directions = [
        {dr: 0, dc: 1},  // Horizontal
        {dr: 1, dc: 0},  // Vertical
        {dr: 1, dc: 1},  // Diagonal \
        {dr: 1, dc: -1}  // Anti-Diagonal /
    ];
    
    for (const {dr, dc} of directions) {
        let count = 1; // Count current piece
        
        // Check forward
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE && board[r][c] === player) {
            count++;
            r += dr;
            c += dc;
        }
        
        // Check backward
        r = row - dr;
        c = col - dc;
        while (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE && board[r][c] === player) {
            count++;
            r -= dr;
            c -= dc;
        }
        
        if (count >= 5) return true;
    }
    
    return false;
}

// Undo last move
function undoMove() {
    if (moveHistory.length === 0 || isGameOver) return;
    
    const lastMove = moveHistory.pop();
    board[lastMove.row][lastMove.col] = 0;
    
    // Switch turn back
    currentPlayer = lastMove.player;
    
    gameMessage.textContent = '';
    isGameOver = false; // Just in case, though usually undo is disabled on game over? 
    // Requirement says "Undo function", doesn't specify limit. 
    // If game was over, undoing winning move should resume game.
    
    updateUI();
    drawBoard();
}

// Update UI text and styles
function updateUI() {
    if (isGameOver) return;
    
    const playerText = currentPlayer === 1 ? '黑棋' : '白棋';
    playerIndicator.textContent = `当前回合: ${playerText}`;
    
    // Update classes for styling
    playerIndicator.className = 'player-indicator';
    if (currentPlayer === 1) {
        playerIndicator.classList.add('black-turn');
    } else {
        playerIndicator.classList.add('white-turn');
    }
    
    // Enable/disable undo
    undoBtn.disabled = moveHistory.length === 0;
    undoBtn.style.opacity = moveHistory.length === 0 ? '0.5' : '1';
}

// Event Listeners
canvas.addEventListener('click', handleCanvasClick);
restartBtn.addEventListener('click', initGame);
undoBtn.addEventListener('click', () => {
    // If playing against AI (not implemented yet), undo needs to pop 2. 
    // Since it's dual player local, undo pops 1.
    if (isGameOver) {
        // Allow undoing the winning move to continue playing
        isGameOver = false;
        gameMessage.textContent = '';
    }
    undoMove();
});

// Start the game
initGame();
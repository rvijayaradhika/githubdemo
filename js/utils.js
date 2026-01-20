// Utility Functions for Ludo Game

const COLORS = {
    player1: '#FF6B6B',  // Red
    player2: '#4ECDC4',  // Teal
    player3: '#FFE66D',  // Yellow
    player4: '#95E1D3'   // Mint
};

const PLAYER_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

// Distance utility
function getDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Point in circle collision
function isPointInCircle(px, py, cx, cy, radius) {
    return getDistance(px, py, cx, cy) <= radius;
}

// Get player color
function getPlayerColor(playerIndex) {
    const colorKeys = Object.keys(COLORS);
    return COLORS[colorKeys[playerIndex]];
}

// Clamp value between min and max
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Random integer between min and max (inclusive)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Roll a dice (1-6)
function rollDie() {
    return randomInt(1, 6);
}

// Check if a position is safe (can't be captured)
function isSafePosition(position) {
    const safePositions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    return safePositions.includes(position);
}

// Get angle for circular board positioning
function getPositionAngle(position) {
    return (position / 52) * 2 * Math.PI - Math.PI / 2;
}

// Convert board position to canvas coordinates
function getCanvasCoordinates(boardPosition, boardCenterX, boardCenterY, boardRadius) {
    const angle = getPositionAngle(boardPosition);
    const x = boardCenterX + boardRadius * Math.cos(angle);
    const y = boardCenterY + boardRadius * Math.sin(angle);
    return { x, y };
}

// Check if pieces overlap (collision detection)
function getPiecesAtPosition(pieces, position, excludePlayer = -1) {
    return pieces.filter((piece, index) => 
        piece.position === position && piece.player !== excludePlayer && piece.isActive
    );
}

// Draw a circle on canvas
function drawCircle(ctx, x, y, radius, color, stroke = false) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (stroke) {
        ctx.strokeStyle = color;
        ctx.stroke();
    } else {
        ctx.fillStyle = color;
        ctx.fill();
    }
    ctx.closePath();
}

// Draw text
function drawText(ctx, text, x, y, size, color, align = 'center') {
    ctx.font = `bold ${size}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
}

// Draw rectangle
function drawRect(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Format time from milliseconds
function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
}

// Parse URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Local storage utilities
const storage = {
    save: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    },
    
    load: (key, defaultValue = null) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error('Storage load error:', e);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    }
};

// Console logger with context
const logger = {
    log: (message, data = null) => {
        console.log(`[Ludo] ${message}`, data);
    },
    
    warn: (message, data = null) => {
        console.warn(`[Ludo] ${message}`, data);
    },
    
    error: (message, data = null) => {
        console.error(`[Ludo] ${message}`, data);
    }
};

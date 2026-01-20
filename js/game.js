// Ludo Game - Main Game Engine - FIXED VERSION
// 4 Player Ludo Game with complete working mechanics

class Piece {
    constructor(playerIndex, pieceIndex) {
        this.player = playerIndex;
        this.pieceIndex = pieceIndex;
        this.position = -1; // -1 means at home
        this.isActive = false;
        this.isInHome = true;
        this.homeX = 0;
        this.homeY = 0;
    }
}

class LudoGame {
    constructor() {
        this.canvas = document.getElementById('ludoCanvas');
        if (!this.canvas) {
            console.error('Canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // Game state
        this.currentPlayer = 0;
        this.diceValue = 0;
        this.diceRolled = false;
        this.selectedPiece = null;
        this.gameState = 'playing';
        this.winner = null;
        this.canRoll = true;
        this.validMoves = [];

        // Board dimensions
        this.boardCenterX = this.width / 2;
        this.boardCenterY = this.height / 2;
        this.boardRadius = 280;
        this.boardPositions = 52;

        // Initialize pieces container (home positions set below)
        this.pieces = [];

        // Home positions for each player
        this.homePositions = [
            { x: 30, y: 30 },
            { x: this.width - 130, y: 30 },
            { x: 30, y: this.height - 130 },
            { x: this.width - 130, y: this.height - 130 }
        ];

        // Now that home positions exist, initialize pieces
        this.initializePieces();

        // Safe positions
        this.safePositions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

        // Player stats
        this.piecesAtHome = [4, 4, 4, 4];
        this.piecesFinished = [0, 0, 0, 0];

        // Start game loop
        this.startGameLoop();
        this.updateUI();

        console.log('Ludo Game initialized successfully');
    }

    initializePieces() {
        for (let player = 0; player < 4; player++) {
            for (let piece = 0; piece < 4; piece++) {
                const newPiece = new Piece(player, piece);
                const homePos = this.homePositions[player];
                newPiece.homeX = homePos.x + (piece % 2) * 45;
                newPiece.homeY = homePos.y + Math.floor(piece / 2) * 45;
                this.pieces.push(newPiece);
            }
        }
    }

    rollDice() {
        if (!this.canRoll || this.diceRolled) return;

        this.diceValue = Math.floor(Math.random() * 6) + 1;
        this.diceRolled = true;
        this.canRoll = false;

        console.log(`Player ${this.currentPlayer + 1} rolled ${this.diceValue}`);
        // show dice image if available
        try {
            const diceImgEl = document.getElementById('diceImg');
            if (diceImgEl && window.LudoAssets && window.LudoAssets.assets && window.LudoAssets.assets.images) {
                const key = `dice-${this.diceValue}`;
                const img = window.LudoAssets.assets.images[key];
                if (img && img.src) {
                    diceImgEl.src = img.src;
                } else {
                    // fallback to server path
                    diceImgEl.src = `assets/images/dice-${this.diceValue}.svg`;
                }
            }
            if (window.LudoAssets && window.LudoAssets.playBeep) window.LudoAssets.playBeep(600 + this.diceValue * 40, 0.12, 0.06);
        } catch (e) {
            console.warn('Dice image update failed', e);
        }
        this.calculateValidMoves();
        this.updateUI();
    }

    calculateValidMoves() {
        this.validMoves = [];
        const playerPieces = this.pieces.filter(p => p.player === this.currentPlayer);

        for (const piece of playerPieces) {
            let canMove = false;

            if (piece.isInHome) {
                if (this.diceValue === 6) {
                    canMove = true;
                }
            } else if (piece.position + this.diceValue <= 51) {
                canMove = true;
            } else if (piece.position < 51 && piece.position + this.diceValue >= 51) {
                canMove = true;
            }

            if (canMove) {
                this.validMoves.push(piece);
            }
        }

        if (this.validMoves.length === 0) {
            setTimeout(() => this.nextTurn(), 1000);
        }
    }

    movePiece(piece) {
        if (!piece || this.validMoves.indexOf(piece) === -1) return;

        if (piece.isInHome && this.diceValue === 6) {
            piece.isInHome = false;
            piece.isActive = true;
            piece.position = 0;
            this.piecesAtHome[this.currentPlayer]--;
            console.log(`Player ${this.currentPlayer + 1} moved piece ${piece.pieceIndex} out of home`);
        } else if (!piece.isInHome) {
            piece.position += this.diceValue;

            if (piece.position >= 51) {
                piece.position = 51;
                piece.isActive = false;
                this.piecesFinished[this.currentPlayer]++;
                console.log(`Player ${this.currentPlayer + 1} finished with piece ${piece.pieceIndex}`);

                if (this.piecesFinished[this.currentPlayer] === 4) {
                    this.winner = this.currentPlayer;
                    this.gameState = 'finished';
                    console.log(`Player ${this.currentPlayer + 1} WINS!`);
                }
            } else {
                this.checkCaptures(piece);
            }
        }

        this.selectedPiece = null;
        this.validMoves = [];

        if (this.diceValue === 6 && this.gameState === 'playing') {
            this.canRoll = true;
            this.diceRolled = false;
            console.log(`Player ${this.currentPlayer + 1} got a 6! Rolling again...`);
        } else {
            setTimeout(() => this.nextTurn(), 500);
        }

        this.updateUI();
    }

    checkCaptures(movingPiece) {
        if (this.isSafePosition(movingPiece.position)) return;

        const capturedPieces = this.pieces.filter(p =>
            p.player !== movingPiece.player &&
            p.position === movingPiece.position &&
            !p.isInHome &&
            !this.isSafePosition(p.position)
        );

        for (const captured of capturedPieces) {
            captured.position = -1;
            captured.isInHome = true;
            captured.isActive = false;
            this.piecesAtHome[captured.player]++;
            console.log(`Player ${this.currentPlayer + 1} captured player ${captured.player + 1}'s piece`);
        }
    }

    isSafePosition(position) {
        return this.safePositions.includes(position);
    }

    nextTurn() {
        this.currentPlayer = (this.currentPlayer + 1) % 4;
        this.diceValue = 0;
        this.diceRolled = false;
        this.canRoll = true;
        this.selectedPiece = null;
        this.validMoves = [];
        this.updateUI();
    }

    handleCanvasClick(x, y) {
        if (this.gameState !== 'playing') return;

        // Try to move a valid piece
        for (const piece of this.validMoves) {
            const pos = this.getPiecePosition(piece);
            if (this.distance(x, y, pos.x, pos.y) <= 25) {
                this.movePiece(piece);
                return;
            }
        }

        // Select piece for visual feedback
        const currentPlayerPieces = this.pieces.filter(p => p.player === this.currentPlayer);
        for (const piece of currentPlayerPieces) {
            const pos = this.getPiecePosition(piece);
            if (this.distance(x, y, pos.x, pos.y) <= 25) {
                this.selectedPiece = piece;
                return;
            }
        }
    }

    distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    getPiecePosition(piece) {
        if (piece.isInHome) {
            return { x: piece.homeX, y: piece.homeY };
        } else if (piece.position === 51) {
            return this.getFinishPosition(piece.player);
        } else {
            return this.getBoardPosition(piece.position);
        }
    }

    getBoardPosition(boardPosition) {
        const angle = (boardPosition / 52) * 2 * Math.PI - Math.PI / 2;
        const x = this.boardCenterX + this.boardRadius * Math.cos(angle);
        const y = this.boardCenterY + this.boardRadius * Math.sin(angle);
        return { x, y };
    }

    getFinishPosition(playerIndex) {
        const finishPositions = [
            { x: this.boardCenterX - 60, y: this.boardCenterY - 60 },
            { x: this.boardCenterX + 60, y: this.boardCenterY - 60 },
            { x: this.boardCenterX - 60, y: this.boardCenterY + 60 },
            { x: this.boardCenterX + 60, y: this.boardCenterY + 60 }
        ];
        return finishPositions[playerIndex];
    }

    rollDiceButtonClicked() {
        if (this.canRoll && !this.diceRolled && this.gameState === 'playing') {
            this.rollDice();
        }
    }

    reset() {
        this.pieces = [];
        this.initializePieces();
        this.currentPlayer = 0;
        this.diceValue = 0;
        this.diceRolled = false;
        this.selectedPiece = null;
        this.gameState = 'playing';
        this.winner = null;
        this.canRoll = true;
        this.validMoves = [];
        this.piecesAtHome = [4, 4, 4, 4];
        this.piecesFinished = [0, 0, 0, 0];
        this.updateUI();
    }

    updateUI() {
        try {
            // Update current player
            const currentPlayerEl = document.getElementById('currentPlayer');
            if (currentPlayerEl) {
                currentPlayerEl.textContent = PLAYER_NAMES[this.currentPlayer];
                currentPlayerEl.style.color = getPlayerColor(this.currentPlayer);
            }

            // Update dice value
            const diceEl = document.getElementById('diceValue');
            if (diceEl) {
                diceEl.textContent = this.diceValue;
            }

            // Update turn status
            const statusEl = document.getElementById('turnStatus');
            if (statusEl) {
                if (this.gameState === 'finished') {
                    statusEl.textContent = `🎉 ${PLAYER_NAMES[this.winner]} Wins!`;
                    statusEl.style.color = getPlayerColor(this.winner);
                } else if (this.diceRolled && this.validMoves.length === 0) {
                    statusEl.textContent = 'No valid moves. Next turn...';
                } else if (this.diceRolled) {
                    statusEl.textContent = `Click a piece to move`;
                } else if (this.canRoll) {
                    statusEl.textContent = 'Roll dice to play';
                }
            }

            // Update player stats
            for (let i = 0; i < 4; i++) {
                const playerEl = document.getElementById(`player${i + 1}`);
                if (playerEl) {
                    const finished = this.piecesFinished[i];
                    const home = this.piecesAtHome[i];
                    const piecesHome = playerEl.querySelector('.pieces-home');
                    if (piecesHome) {
                        piecesHome.textContent = `Pieces at home: ${home} | Finished: ${finished}`;
                    }

                    if (i === this.currentPlayer && this.gameState === 'playing') {
                        playerEl.style.opacity = '1';
                        playerEl.style.transform = 'scale(1.05)';
                    } else {
                        playerEl.style.opacity = '0.7';
                        playerEl.style.transform = 'scale(1)';
                    }
                }
            }
        } catch (e) {
            console.error('Error updating UI:', e);
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw board
        this.drawBoard();

        // Draw pieces
        this.drawPieces();

        // Draw UI elements
        if (this.gameState === 'finished') {
            this.drawWinnerScreen();
        }
    }

    drawBoard() {
        const ctx = this.ctx;

        // Draw background pattern image if available
        try {
            const assetsImgs = window.LudoAssets && window.LudoAssets.assets && window.LudoAssets.assets.images;
            const indian = assetsImgs && assetsImgs['board-indian'];
            const bg = assetsImgs && assetsImgs['board-pattern'];
            if (indian) {
                ctx.drawImage(indian, 0, 0, this.width, this.height);
            } else if (bg) {
                ctx.drawImage(bg, 0, 0, this.width, this.height);
            } else {
                // fallback to a white board
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, this.width, this.height);
            }
        } catch (e) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, this.width, this.height);
        }

        // Draw board positions
        for (let i = 0; i < this.boardPositions; i++) {
            const pos = this.getBoardPosition(i);
            const isSafe = this.isSafePosition(i);
            const color = isSafe ? '#FFD700' : '#e0e0e0';

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = '#999';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw position number for key positions
            if (i % 10 === 0) {
                ctx.fillStyle = '#666';
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(i.toString(), pos.x, pos.y);
            }
        }

        // Draw center
        ctx.fillStyle = '#f0f0f0';
        ctx.beginPath();
        ctx.arc(this.boardCenterX, this.boardCenterY, 45, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#333';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Ludo', this.boardCenterX, this.boardCenterY);

        // Draw finish positions
        for (let i = 0; i < 4; i++) {
            const finishPos = this.getFinishPosition(i);
            ctx.fillStyle = getPlayerColor(i);
            ctx.beginPath();
            ctx.arc(finishPos.x, finishPos.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('F', finishPos.x, finishPos.y);
        }

        // Draw home areas
        const homeLabels = ['P1', 'P2', 'P3', 'P4'];
        for (let i = 0; i < 4; i++) {
            const homePos = this.homePositions[i];
            ctx.strokeStyle = getPlayerColor(i);
            ctx.lineWidth = 3;
            ctx.strokeRect(homePos.x, homePos.y, 100, 100);

            ctx.fillStyle = getPlayerColor(i);
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(homeLabels[i], homePos.x + 50, homePos.y - 10);
        }
    }

    drawPieces() {
        for (const piece of this.pieces) {
            const pos = this.getPiecePosition(piece);
            const color = getPlayerColor(piece.player);
            const isSelectable = this.validMoves.includes(piece);
            const isSelected = this.selectedPiece === piece;

            // Draw piece outline if selectable
            if (isSelectable) {
                this.ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, 28, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.strokeStyle = '#FFD700';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }

            // Draw piece - prefer image token if available
            const assetKeys = ['token-red','token-teal','token-yellow','token-mint'];
            const img = window.LudoAssets && window.LudoAssets.assets && window.LudoAssets.assets.images
                ? window.LudoAssets.assets.images[assetKeys[piece.player]]
                : null;

            if (img && img.src && img.complete !== false && (img.naturalWidth === undefined || img.naturalWidth > 0)) {
                try {
                    const size = 36;
                    this.ctx.drawImage(img, pos.x - size, pos.y - size, size * 2, size * 2);
                    // outline
                    this.ctx.strokeStyle = '#333';
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.arc(pos.x, pos.y, 18, 0, 2 * Math.PI);
                    this.ctx.stroke();
                } catch (e) {
                    // drawing failed, fall back to circle
                    this.ctx.fillStyle = color;
                    this.ctx.beginPath();
                    this.ctx.arc(pos.x, pos.y, 18, 0, 2 * Math.PI);
                    this.ctx.fill();
                    this.ctx.strokeStyle = '#333';
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
            } else {
                // fallback to drawn circle
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, 18, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.strokeStyle = '#333';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }

            // Draw glow if selected
            if (isSelected) {
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI);
                this.ctx.stroke();
            }

            // Draw piece number
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText((piece.pieceIndex + 1).toString(), pos.x, pos.y);
        }
    }

    drawWinnerScreen() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Winner info
        const winner = PLAYER_NAMES[this.winner];
        const winnerColor = getPlayerColor(this.winner);

        this.ctx.fillStyle = winnerColor;
        this.ctx.font = 'bold 60px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('🎉', this.boardCenterX, this.boardCenterY - 100);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 50px Arial';
        this.ctx.fillText(`${winner} Wins!`, this.boardCenterX, this.boardCenterY);

        this.ctx.fillStyle = '#FFE66D';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText('Click Reset to play again', this.boardCenterX, this.boardCenterY + 100);
    }

    startGameLoop() {
        const loop = () => {
            this.draw();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    window.game = new LudoGame();
});

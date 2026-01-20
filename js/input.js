// Input Handler for Ludo Game

class InputHandler {
    constructor() {
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            clicked: false
        };
        this.touchActive = false;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Mouse events
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));

        // Touch events for mobile
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Canvas click events
        const canvas = document.getElementById('ludoCanvas');
        if (canvas) {
            canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        }

        // Button events
        const rollBtn = document.getElementById('rollBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        if (rollBtn) {
            rollBtn.addEventListener('click', () => {
                if (window.game) {
                    window.game.rollDiceButtonClicked();
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (window.game) {
                    window.game.reset();
                }
            });
        }
    }

    handleKeyDown(e) {
        this.keys[e.key.toLowerCase()] = true;

        // Spacebar to roll dice
        if (e.key === ' ') {
            e.preventDefault();
            if (window.game) {
                window.game.rollDiceButtonClicked();
            }
        }

        // R to reset
        if (e.key.toLowerCase() === 'r') {
            if (window.game) {
                window.game.reset();
            }
        }
    }

    handleKeyUp(e) {
        this.keys[e.key.toLowerCase()] = false;
    }

    handleMouseMove(e) {
        const canvas = document.getElementById('ludoCanvas');
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        }
    }

    handleMouseDown(e) {
        const canvas = document.getElementById('ludoCanvas');
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            this.mouse.clicked = true;
            this.handleCanvasClick(e);
        }
    }

    handleMouseUp(e) {
        this.mouse.clicked = false;
    }

    handleTouchStart(e) {
        this.touchActive = true;
        const canvas = document.getElementById('ludoCanvas');
        if (canvas && e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX - rect.left;
            this.mouse.y = touch.clientY - rect.top;
            this.handleCanvasClick(e);
        }
    }

    handleTouchMove(e) {
        const canvas = document.getElementById('ludoCanvas');
        if (canvas && e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX - rect.left;
            this.mouse.y = touch.clientY - rect.top;
        }
    }

    handleTouchEnd(e) {
        this.touchActive = false;
    }

    handleCanvasClick(e) {
        if (window.game) {
            window.game.handleCanvasClick(this.mouse.x, this.mouse.y);
        }
    }

    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] === true;
    }

    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }

    isMouseClicked() {
        return this.mouse.clicked;
    }

    isTouchActive() {
        return this.touchActive;
    }

    reset() {
        this.keys = {};
        this.mouse = { x: 0, y: 0, clicked: false };
        this.touchActive = false;
    }
}

// Initialize input handler
const input = new InputHandler();

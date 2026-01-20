# Ludo - 4 Player HTML5 Game

A fully functional Ludo board game implementation in HTML5 Canvas with support for 4 players. Play against friends on the same machine!

## 🎮 Features

- **4 Player Gameplay**: Red, Teal, Yellow, and Mint colored pieces
- **Complete Game Mechanics**:
  - Dice rolling with strategic piece selection
  - Capture opponent pieces (except on safe spaces)
  - Automatic piece movement calculation
  - Home and finish positions
  - Turn-based gameplay
  - Safe positions (golden circles) prevent captures

- **Responsive Design**:
  - Works on desktop and mobile devices
  - Touch support for mobile players
  - Adaptable canvas sizing
  - Beautiful gradient UI

- **Interactive UI**:
  - Real-time player status display
  - Dice value indicator
  - Turn status messages
  - Piece counters (home and finished)
  - Visual piece selection feedback

- **Controls**:
  - **Roll Dice**: Click "Roll Dice" button or press Spacebar
  - **Move Piece**: Click on a highlighted piece to move
  - **Reset Game**: Click "Reset Game" button or press R

## 📋 Game Rules

1. **Starting**: Players take turns rolling the dice. Get a 6 to move a piece out of home.
2. **Movement**: Move your pieces around the board according to the dice value.
3. **Capture**: Land on an opponent's piece to send them back home (except on safe spaces).
4. **Safe Spaces**: Golden circles mark safe positions (positions 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50) where captures cannot happen.
5. **Extra Turn**: Rolling a 6 gives you another turn to roll again.
6. **Winning**: First player to get all 4 pieces to the finish position wins!

## 🎯 Gameplay Guide

### Game Board
- **Board Circle**: Main track with 52 positions for piece movement
- **Home Areas**: Colored squares in corners where pieces start
- **Safe Zones**: Golden circles at regular intervals
- **Finish Positions**: Colored circles at the center edges

### Turn Flow
1. Click "Roll Dice" to roll (or press Spacebar)
2. If you have valid moves, pieces become highlighted
3. Click a highlighted piece to move it
4. If you rolled a 6, you get another turn
5. Otherwise, it's the next player's turn

### Strategy Tips
- Move pieces out of home early to increase your options
- Protect pieces on safe spaces
- Try to capture opponent pieces when possible
- Balance moving backward and forward pieces

## 📁 Project Structure

```
ludo-game/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Styling and layout
├── js/
│   ├── game.js            # Main game engine and logic
│   ├── input.js           # Input handling (keyboard, mouse, touch)
│   ├── utils.js           # Utility functions
│   └── (auto-loaded)
├── README.md              # This file
└── assets/                # (Optional) For future sound/image assets
```

## 🚀 How to Run

### In Browser
1. Open `index.html` in any modern web browser
2. The game will start automatically
3. Players can play in sequence on the same machine

### Local Development
1. Use a local web server (recommended):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or Node.js http-server
   npx http-server
   ```
2. Navigate to `http://localhost:8000`

### Deploy
- Host on GitHub Pages, Netlify, Vercel, or any static hosting service
- Just upload the files and open in browser

## 🎨 Game Colors

- **Player 1**: Red (#FF6B6B)
- **Player 2**: Teal (#4ECDC4)
- **Player 3**: Yellow (#FFE66D)
- **Player 4**: Mint (#95E1D3)

## 💻 Browser Compatibility

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Technology Stack

- **HTML5**: Structure and Canvas API
- **CSS3**: Styling with gradients and animations
- **JavaScript (ES6+)**: Game logic and rendering
- **Canvas 2D API**: Graphics rendering
- **Touch Events API**: Mobile support

## 🔧 Game Architecture

### Core Classes
- **Piece**: Represents individual game pieces with position and state
- **LudoGame**: Main game engine handling board, pieces, turns, and game state

### Key Functions
- `rollDice()`: Generate random dice value 1-6
- `movePiece()`: Move selected piece based on dice value
- `checkCaptures()`: Detect and handle piece captures
- `calculateValidMoves()`: Determine which pieces can legally move
- `getCanvasCoordinates()`: Convert board positions to screen coordinates

### Game States
- `playing`: Active gameplay
- `finished`: Game over, winner declared

## 📱 Mobile Features

- Touch support for piece selection
- Responsive layout
- Touch-friendly buttons
- Mobile-optimized UI

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Spacebar | Roll Dice |
| R | Reset Game |
| Click/Tap | Select piece or interact with UI |

## 📊 Game Statistics

The sidebar displays:
- Current player turn
- Dice value
- Each player's status:
  - Pieces at home
  - Pieces finished
  - Visual indicators

## 🐛 Known Limitations

- No AI opponents (local multiplayer only)
- No sound effects (can be added)
- No save/load game state (can be implemented)
- No online multiplayer (would require backend)

## 🚀 Future Enhancements

- Add sound effects and background music
- Implement AI opponents for single-player mode
- Add animation for piece movement
- Create difficulty levels
- Add game history and statistics
- Online multiplayer support
- Undo/Redo moves
- Custom player names
- Theme selection

## 📄 License

This game is provided as-is for educational and entertainment purposes.

## 🎮 Have Fun!

Enjoy playing Ludo! Gather your friends and have a great time playing this classic board game in your browser.

---

**Made with ❤️ using HTML5 Canvas**

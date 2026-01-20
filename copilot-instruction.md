# HTML5 Game Development Instructions

## Project Overview
This project is an interactive HTML5 game built with vanilla JavaScript, Canvas API, and modern web standards. The game should be fully playable in modern browsers without external dependencies.

## Game Architecture

### Core Components
- **Game Engine**: Main game loop handling updates and rendering
- **Entity System**: Player, enemies, obstacles, collectibles
- **Input Handler**: Keyboard and mouse controls
- **Collision Detection**: Physics and overlap detection
- **Rendering Engine**: Canvas-based 2D graphics
- **Asset Manager**: Image and sound resource loading
- **State Manager**: Game states (menu, playing, paused, game over)

### File Structure
```
project/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styling and layout
├── js/
│   ├── game.js         # Main game engine
│   ├── player.js       # Player entity and logic
│   ├── enemy.js        # Enemy entities and AI
│   ├── utils.js        # Utility functions
│   ├── input.js        # Input handling
│   ├── collision.js    # Collision detection
│   └── assets.js       # Asset management
├── assets/
│   ├── images/         # Game sprites and graphics
│   ├── sounds/         # Audio files
│   └── fonts/          # Custom fonts (optional)
└── README.md           # Project documentation
```

## Development Guidelines

### HTML5 Canvas Setup
- Use Canvas 2D API for rendering
- Implement requestAnimationFrame for smooth 60 FPS gameplay
- Set canvas dimensions to match game design (e.g., 800x600)
- Apply proper CSS to prevent stretching

### Game Loop Structure
```javascript
- Update phase: Process input, update entities, physics
- Collision phase: Detect and resolve collisions
- Render phase: Clear canvas, draw all entities, UI
- Target 60 FPS using requestAnimationFrame
```

### Entity System Design
- Create base Entity class with position, velocity, size
- Implement update() and draw() methods for each entity
- Use arrays to manage multiple entities of same type
- Implement lifecycle management (spawn, update, destroy)

### Input Handling
- Support keyboard input (arrow keys, WASD, spacebar)
- Optional: Mouse/touch input for mobile compatibility
- Implement key state tracking (pressed/released)
- Debounce rapid input to prevent issues

### Collision Detection
- Use AABB (Axis-Aligned Bounding Box) collision for performance
- Implement SAT (Separating Axis Theorem) for rotated objects if needed
- Create collision callback system for entity interactions
- Handle collision resolution appropriately

### Game States
- **MENU**: Title screen, start button
- **PLAYING**: Active gameplay
- **PAUSED**: Game paused, resume option
- **GAME_OVER**: End screen, restart option
- **LEVEL_COMPLETE**: Level completion screen

### Performance Optimization
- Use object pooling for frequently created entities
- Implement spatial partitioning for collision checks
- Minimize DOM manipulation, use Canvas only for rendering
- Optimize draw calls by batching and culling off-screen objects
- Use requestAnimationFrame instead of setInterval

### Audio & Assets
- Load assets during initialization phase
- Implement audio with Web Audio API or HTML5 Audio
- Cache loaded resources to prevent reloading
- Handle asset loading errors gracefully

### Mobile Considerations
- Implement touch controls (tap, swipe, drag)
- Use devicePixelRatio for retina displays
- Implement responsive canvas sizing
- Add full-screen support

## Code Style Requirements

### JavaScript Standards
- Use ES6+ features (arrow functions, const/let, classes)
- Comment complex logic and algorithms
- Use meaningful variable and function names
- Implement error handling and logging
- Modularize code into logical components

### Naming Conventions
- Classes: PascalCase (Player, Enemy, Projectile)
- Functions: camelCase (updatePlayer, drawEnemy)
- Constants: UPPER_SNAKE_CASE (CANVAS_WIDTH, GRAVITY)
- Private properties: _prefix for convention

### Documentation
- Add JSDoc comments for public methods
- Include inline comments for complex logic
- Document entity properties and methods
- Maintain README with gameplay instructions

## Game Mechanics Template

### Basic Mechanics
- Player movement and animation
- Jump/action mechanics
- Scoring/points system
- Lives or health system
- Level progression

### Enemy AI
- Simple patrol behavior
- Chase detection
- Attack patterns
- Respawn mechanics

### Collectibles
- Coins/gems pickup
- Power-ups
- Health restoration
- Bonus multipliers

## Testing & Debugging

### Browser Compatibility
- Test in Chrome, Firefox, Safari, Edge
- Verify mobile browser compatibility
- Test with different screen sizes
- Validate touch input on mobile devices

### Performance Testing
- Monitor FPS using browser DevTools
- Profile memory usage
- Identify and optimize bottlenecks
- Test on lower-end devices

### Gameplay Testing
- Verify collision detection accuracy
- Test all game states and transitions
- Validate scoring and UI updates
- Check audio timing

## Deployment Checklist

- [ ] Minify and bundle JavaScript
- [ ] Optimize images (compression, format)
- [ ] Test cross-browser compatibility
- [ ] Verify mobile responsiveness
- [ ] Remove console.log statements
- [ ] Add analytics (optional)
- [ ] Deploy to hosting platform
- [ ] Set up GitHub Pages (if applicable)

## Resources & References

- MDN Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- RequestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
- Game Development Patterns: https://www.patterns.dev/
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

## Tips for Copilot Collaboration

1. **Be Specific with Prompts**: Describe exactly what entity or mechanic you need
2. **Reference Existing Code**: Ask Copilot to follow existing patterns and style
3. **Iterate on Generated Code**: Review and test suggestions before accepting
4. **Document Assumptions**: Clearly state game rules and mechanics
5. **Use Examples**: Provide code examples for Copilot to learn from
6. **Ask for Optimization**: Request performance improvements after functionality works
7. **Test Thoroughly**: Verify all AI-generated code works as intended

## Common Implementation Patterns

### Player Controller
- Handle input and translate to movement
- Manage animation state
- Enforce bounds within canvas
- Interact with collectibles

### Enemy Controller
- Implement AI logic (patrol, chase, attack)
- Handle collision with player
- Manage enemy death/respawn
- Balance difficulty

### Particle System
- Create visual effects (explosions, pickups, trails)
- Manage particle lifecycle
- Pool and reuse particles for performance

### UI System
- Score display
- Lives/health counter
- Pause menu
- Game over screen

---

**Last Updated**: January 20, 2026
**Version**: 1.0

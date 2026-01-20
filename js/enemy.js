// Simple AI for optional computer-controlled players
// Provides a single function `makeAIMove(game)` which will roll and pick a move when it's an AI turn

(function(){
    function makeAIMove(game) {
        // Only act when it's the AI player's turn and game is playing
        if (!game || game.gameState !== 'playing') return;
        const player = game.currentPlayer;

        // Very simple heuristic: roll if allowed, then choose first valid move
        if (game.canRoll && !game.diceRolled) {
            setTimeout(() => game.rollDiceButtonClicked(), 400);
            // Wait for dice to resolve in game loop; then select move
            setTimeout(() => {
                if (game.validMoves && game.validMoves.length > 0) {
                    // Choose the piece that is not in home if possible
                    let choice = game.validMoves.find(p => !p.isInHome) || game.validMoves[0];
                    game.movePiece(choice);
                }
            }, 900);
        }
    }

    window.LudoAI = { makeAIMove };
})();
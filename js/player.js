// Player helper utilities for Ludo
// Exposes functions to compute start positions and home coordinates

(function(){
    function getStartIndexForPlayer(playerIndex) {
        // Map player to starting board index (approximate mapping on 52-track)
        // Player 0 (red) starts at 0, player1 at 13, player2 at 26, player3 at 39
        const starts = [0, 13, 26, 39];
        return starts[playerIndex % 4];
    }

    function getPlayerPathPosition(playerIndex, offset) {
        // Convert a player-relative step to absolute board index
        const start = getStartIndexForPlayer(playerIndex);
        return (start + offset) % 52;
    }

    function isPieceAtStart(piece) {
        return piece.position === getStartIndexForPlayer(piece.player);
    }

    // Attach to window so other scripts can use without modules
    window.LudoPlayer = {
        getStartIndexForPlayer,
        getPlayerPathPosition,
        isPieceAtStart
    };
})();
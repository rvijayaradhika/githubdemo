// Collision utilities for Ludo
// Simple helpers to check board-position collisions and safe zones

(function(){
    function positionsEqual(posA, posB) {
        return posA === posB;
    }

    function isOnSameTile(pieceA, pieceB) {
        if (pieceA.isInHome || pieceB.isInHome) return false;
        return positionsEqual(pieceA.position, pieceB.position);
    }

    function findPiecesAtPosition(pieces, position, excludePlayer) {
        return pieces.filter(p => !p.isInHome && p.position === position && p.player !== excludePlayer);
    }

    window.LudoCollision = {
        positionsEqual,
        isOnSameTile,
        findPiecesAtPosition
    };
})();
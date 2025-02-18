// This holds some player information, like color and position.
// It also has some player methods for managing how a player moves.

class Player {
    constructor(_color, _position, _displaySize, _width) {
        this.playerColor = _color;
        this.position = _position;
        this.score = 0;
        this.displaySize = _displaySize;
        this.width = _width;
    }

    // Move player based on keyboard input
    move(_direction) {
        // increments or decrements player position, wrapping around the display
        this.position = (this.position + _direction + this.displaySize) % this.displaySize;
    }

    // Check if this player overlaps with another player
    checkOverlap(otherPlayer) {
        for (let i = 0; i < this.width; i++) {
            if ((this.position + i) % this.displaySize === otherPlayer.position) {
                return true;
            }
        }
        return false;
    }
}

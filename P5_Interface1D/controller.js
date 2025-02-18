// This is where your state machines and game logic lives

class Controller {
    // This is the state we start with.
    constructor() {
        this.gameState = "PLAY";
    }
    
    // This is called from draw() in sketch.js with every frame
    update() {
        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////
        switch(this.gameState) {
            // This is the main game state, where the playing actually happens
            case "PLAY":
                // clear screen at frame rate so we always start fresh      
                display.clear();
            
                // Display alien (3 pixels)
                for (let i = 0; i < 3; i++) {
                    display.setPixel((alien.position + i) % displaySize, alien.playerColor);
                }
                
                // Display cow (1 pixel, on top if overlapping)
                display.setPixel(cow.position, cow.playerColor);
                
                break;

            // This state is used to play an animation after a capture attempt
            case "COLLISION":
                // clear screen at frame rate so we always start fresh      
                display.clear();

                // play explosion animation one frame at a time.
                // first figure out what frame to show
                let frameToShow = collisionAnimation.currentFrame();    // this grabs number of current frame and increments it 
                
                // then grab every pixel of frame and put it into the display buffer
                for(let i = 0; i < collisionAnimation.pixels; i++) {
                    display.setPixel(i,collisionAnimation.animation[frameToShow][i]);                    
                }

                //check if animation is done and we should move on to another state
                if (frameToShow == collisionAnimation.animation.length-1)  {
                    // We've hit score max, alien wins
                    if (alien.score >= score.max) {
                        score.winner = alien.playerColor;   // store winning color in score.winner
                        this.gameState = "SCORE";           // go to state that displays score
                    
                    // We've hit score max, cow wins
                    } else if (cow.score >= score.max) {
                        score.winner = cow.playerColor;     // store winning color in score.winner
                        this.gameState = "SCORE";           // go to state that displays score

                    // We haven't hit the max score yet, keep playing    
                    } else {
                        this.resetPositions();              // move players to new random positions
                        this.gameState = "PLAY";            // back to play state
                    }
                } 
                break;

            // Game is over. Show winner and clean everything up so we can start a new game.
            case "SCORE":       
                //light up w/ winner color by populating all pixels in buffer with their color
                display.setAllPixels(score.winner);                    
                break;

            // Not used, it's here just for code compliance
            default:
                break;
        }
    }

    // Check if alien captures cow or misses
    checkCapture() {
        if (this.gameState === "PLAY") {
            if (alien.checkOverlap(cow)) {
                alien.score++;
                this.gameState = "COLLISION";
                collisionAnimation.setColor(alien.playerColor);
            } else {
                cow.score++;
                this.gameState = "COLLISION";
                collisionAnimation.setColor(cow.playerColor);
            }
        }
    }

    // Reset positions of alien and cow to random locations
    resetPositions() {
        alien.position = parseInt(random(0,displaySize-2));
        cow.position = parseInt(random(0,displaySize));
        while (alien.checkOverlap(cow)) {
            cow.position = parseInt(random(0,displaySize));
        }
    }
}

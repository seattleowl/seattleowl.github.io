/*
    MATCHING GAME  by Owen Leggett
    
    ------------------------------
    Feel free to use any code found in this file,
    just make sure to import GameSquare, witch can be found at http://seattleowl.com/games/gameSquare/gameSquare.js.

    This program use my free game engine, GameSquare, found at the link above.
    To play this game, go to http://seattleowl.com/games/gameSquare/matchingGame.


    Thank you for reading.

     --Owen
*/

// CANVAS
var canvas = new GameSquare.GameSquareCanvasObject("canvas")

// VARIBLES / FUNCTIONS
var flipped = []
var flippedCards = []
var turn = "player1"
var score = {player1: 0, player2: 0}
var mousePressed = false
function isMatch() {
    return flipped.join("") == flipped[0] + flipped[0]
}
function scoreCard() {
    score[turn]++
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function turnEnd() {
    if (turn == "player1") {
        turn = "player2"
    } else {
        turn = "player1"
    }
}

// CLASSES
class Card extends GameSquare.GameSquareSpriteObject {
    constructor(props) {
        super({x: props.x, y: props.y, url: "card_back.svg", width: 50, height: 50})

        this.flipped = false
        this.matchId = props.img
    }

    async flip() {
        if (! this.flipped) {
            flipped.push(this.matchId)
            flippedCards.push(this)
            this.flipped = true
            this.update()
            if (flipped.length == 2) {
                if (isMatch()) { 
                    scoreCard()
                } else {
                    await sleep(500)    
                    this.flipped = false
                    flippedCards[0].flipped = false
                    this.update()
                    flippedCards[0].update()
                    turnEnd()
                }
                flipped = []
                flippedCards = []
            }
        }
    }

    update() {
        if (this.flipped) {
            this.swichCostume(this.matchId)
        } else {
            this.swichCostume("card_back.svg")
        }
    }
}

class Grid extends GameSquare.GameSquareGroupObject {
    constructor(size) {
        super([])
        var cardsRemaning = [
            "card1.svg",
            "card2.svg",
            "card3.svg",
            "card4.svg",
            "card5.svg",
            "card6.svg",
            "card7.svg",
            "card8.svg",
            "card9.svg",
            "card10.svg",
            "card1.svg",
            "card2.svg",
            "card3.svg",
            "card4.svg",
            "card5.svg",
            "card6.svg",
            "card7.svg",
            "card8.svg",
            "card9.svg",
            "card10.svg"
        ]
        for (var i = 0; i < size[0]; i++) {
            var row = new GameSquare.GameSquareGroupObject([])
            for (var n = 0; n < size[1]; n++) {
                var img = cardsRemaning[Math.floor(Math.random() * cardsRemaning.length)]
                row.addMember(new Card({x: n*60+10, y: i*60+10, img: img}))
                cardsRemaning.splice(cardsRemaning.indexOf(img), 1)
            }
            this.addMember(row)
        }
    }
}

class ScoreCounter extends GameSquare.GameSquareTextObject {
    constructor(xy) {
        super({x: xy.x, y: xy.y, color: "black", text: "Player 1: 0, Player 2: 0"})
    }

    updateScore() {
        this.text = "Player 1: " + score.player1 + ", Player 2: " + score.player2 + ", Turn: " + turn
    }
}

// SPRITES
var grid = new Grid([4,5])
var scoreCounter = new ScoreCounter({x: 10, y: 270})

// LOOP
GameSquare.updateLoopCallback = function() {
    grid.forAll(function(row) {
        row.forAll(function(card) {
            if (GameSquare.getInput("mouse")) {
                if (card.colCheck(new GameSquare.GameSquareRectObject({x: GameSquare.getInput("mouseX"), y: GameSquare.getInput("mouseY"), width: 1, height: 1})) && !mousePressed) {
                    card.flip()
                    mousePressed = true
                }
            } else {
                mousePressed = false
            }
        })
    })

    scoreCounter.updateScore()

    // RENDER
    canvas.clear()
    grid.render()
    scoreCounter.render()
}
// Let the GGB begin!

// CANVAS
var canvas = new GameSquare.GameSquareCanvasObject("canvas")

// SPRITES
var player = new GameSquare.GameSquareSpriteObject({url: "greenGhoulR.svg", x: 10, y: 10, width: 82, height: 89})

// VARIABLES
var playerData = {
	xv: 0,
	yv: 0,
	speed: 3
}

// LOOP
GameSquare.updateLoopCallback = function() {

	// update X
	if (GameSquare.getInput("ArrowRight")) {
		if (playerData.xv <= playerData.speed) {
			playerData.xv += 1
			player.swichCostume("greenGhoulR.svg")
		}
	} else if (GameSquare.getInput("ArrowLeft")) {
		if (playerData.xv >= (playerData.speed * -1)) {
			playerData.xv -= 1
			player.swichCostume("greenGhoulL.svg")
		}
	} else {
		playerData.xv *= 0.95
	}
	player.x += playerData.xv

	// update Y
	if (GameSquare.getInput("ArrowDown")) {
		if (playerData.yv <= playerData.speed) {
			playerData.yv += 1
		}
	} else if (GameSquare.getInput("ArrowUp")) {
		if (playerData.yv >= (playerData.speed * -1)) {
			playerData.yv -= 1
		}
	} else {
		playerData.yv *= 0.95
	}
	player.y += playerData.yv

	// render
	canvas.clear()
	player.render()
}
// GAME SQUARE

var gameSquareSystem = {
	ctx: undefined,
	update: function() {
		GameSquare.updateLoopCallback()
		gameSquareSystem.ctx.element.stlye = "cursor: " + gameSquareSystem.ctx.cursor + ";"
		requestAnimationFrame(gameSquareSystem.update)
	},

	stopLoop: function() {
		this.update = function() {}
	},

	input: {
		mouseX: 0,
		mouseY: 0
	}
}

var GameSquare = {
	GameSquareCanvasObject: class {
		constructor(canvasId) {
			this.element = document.getElementById(canvasId)
			this.context = this.element.getContext("2d")
			this.cursor = "atuo"
			gameSquareSystem.ctx = this
		}

		clear() {
			this.context.clearRect(0, 0, this.element.width, this.element.height)
		}
	},

	GameSquareRectObject: class {
		constructor(props) {
			this.ctx = gameSquareSystem.ctx.context
			this.x = props.x
			this.y = props.y
			this.width = props.width
			this.height = props.height
			this.color = props.color
		}

		render() {
			this.ctx.fillStyle = this.color
			this.ctx.fillRect(this.x, this.y, this.width, this.height)
			this.ctx.fillStyle = "black"
		}

		colCheck(shapeB) {
		    // get the vectors to check against
		    var shapeA = this
		    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
		        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		        // add the half widths and half heights of the objects
		        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
		        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
		    	colDir = null
		 
		    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
		    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { 
		    	// figures out on which side we are colliding (top, bottom, left, or right)         
		    	var oX = hWidths - Math.abs(vX),
		    		oY = hHeights - Math.abs(vY)
		    	if (oX >= oY) {
		            if (vY > 0) {
		                colDir = "top"
		            } else {
		                colDir = "bottom"
		            }
		        } else {
		            if (vX > 0) {
		                colDir = "left"
		            } else {
		                colDir = "right"
		            }
		        }
		    }
		    return colDir
		}

		clone() {
			return new GameSquare.GameSquareRectObject(this)
		}

		delete() {
			this.x = ""
			this.y = ""
			this.width = 0
			this.height = 0
			this.color = ""
			this.render = function() {}
		}
	},

	GameSquareTextObject: class {
		constructor(props) {
			this.ctx = gameSquareSystem.ctx.context
			this.x = props.x
			this.y = props.y
			this.color = props.color
			this.text = props.text
		}

		render() {
			this.ctx.fillStyle = this.color
			this.ctx.font = "30px Arial"
			this.ctx.fillText(this.text, this.x, this.y)
			this.ctx.fillStyle = "black"
		}
	},

	GameSquareGroupObject: class {
		constructor(members) {
			this.members = members
		}

		render() {
			for (var i = 0; i < this.members.length; i++) {
				this.members[i].render()
			}
		}

		addMember(member) {
			this.members.push(member)
		}

		forAll(code) {
			for (var i = 0; i < this.members.length; i++) {
				code(this.members[i])
			}
		}
	},

	getInput: function(inputName) {
		if (gameSquareSystem.input[inputName] == undefined) {
			return false
		} else {
			return gameSquareSystem.input[inputName]
		}
	},

	updateLoopCallback: function() {},
	
}


window.addEventListener("load", function() {
	gameSquareSystem.update()
})

window.addEventListener("keydown", function(e) {
    gameSquareSystem.input[e.key] = true
});
 
window.addEventListener("keyup", function(e) {
    gameSquareSystem.input[e.key] = false
});

window.addEventListener("mousemove", function(e) {
	gameSquareSystem.input.mouseX = e.clientX - gameSquareSystem.ctx.element.offsetLeft
	gameSquareSystem.input.mouseY = e.clientY - gameSquareSystem.ctx.element.offsetTop
})

window.addEventListener("mousedown", function(e) {
	gameSquareSystem.input.mouse = true
})

window.addEventListener("mouseup", function(e) {
	gameSquareSystem.input.mouse = false
})

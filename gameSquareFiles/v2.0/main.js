const GameSquare = {
    Game: class {
        constructor(canvasID) {
            GameSquare.canvas = {
                element: document.getElementById(canvasID),
                ctx: document.getElementById(canvasID).getContext("2d"),
            }
            this.states = {}
            this.State = class {
                constructor(id, create, update, render, cleanup) {
                    this.parent = this.constructor.parent
                    this.parent.states[id] = this

                    this.create = create
                    this.update = update
                    this.render = render
                    this.cleanup = cleanup

                    this.objects = {}
                }

                _$update() {
                    this.update(this.objects)
                    GameSquare.canvas.ctx.clearRect(0, 0, GameSquare.canvas.element.width, GameSquare.canvas.element.height)
                    this.render(this.objects)
                }
            }
            this.State.parent = this

            this.currentState = "none"

            GameSquare.game = this
            window.onload = function () {
                GameSquare._$update()
            }
        }

        _$update() {
            if (this.currentState != "none") {
                this.currentState._$update()
            }
            requestAnimationFrame(GameSquare._$update)
        }

        startState(stateID) {
            this.currentState = this.states[stateID]
            this.currentState.create(this.currentState.objects)
        }
    },

    RectObject: class {
		constructor(props) {
			this.ctx = GameSquare.canvas.ctx
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

		colBlock(shapeB) {
		    // get the vectors to check against
		    var shapeA = this
		    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
		        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		        // add the half widths and half heights of the objects
		        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
		        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
		    	colDir = null;
		 
		    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
		    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { 
		    	// figures out on which side we are colliding (top, bottom, left, or right)         
		    	var oX = hWidths - Math.abs(vX),
		    		oY = hHeights - Math.abs(vY)
		    	if (oX >= oY) {
		            if (vY > 0) {
		                colDir = "top";
		                shapeA.y += oY;
		            } else {
		                colDir = "bottom";
		                shapeA.y -= oY;
		            }
		        } else {
		            if (vX > 0) {
		                colDir = "left";
		                shapeA.x += oX;
		            } else {
		                colDir = "right";
		                shapeA.x -= oX;
		            }
		        }
		    }
		    return colDir;
		}

		clone() {
			return new this.constructor(this)
		}

		destroy() {
			this.x = ""
			this.y = ""
			this.width = 0
			this.height = 0
			this.color = ""
			this.render = function() {}
		}
    },
    
    TextObject: class {
		constructor(props) {
			this.ctx = GameSquare.canvas.ctx
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
	
	SpriteObject: class {
		constructor(props) {
			this.ctx = GameSquare.canvas.ctx
			this.image = new Image()
			this.image.src = props.url
			this.url = props.url
			this.width = props.width
			this.height = props.height
			this.x = props.x
			this.y = props.y
			this.frame = 0
			this.frames = []
			this.loop = false
			this.runningAnimation = false
			this.speed = 1
		}

		render() {
			this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
		}

		clone() {
			return new GameSquare.GameSquareSpriteObject(this)
		}

		destroy() {
			this.x = ""
			this.y = ""
			this.width = 0
			this.height = 0
			this.image = ""
			this.render = function() {}
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

		colBlock(shapeB) {
		    // get the vectors to check against
		    var shapeA = this
		    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
		        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		        // add the half widths and half heights of the objects
		        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
		        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
		    	colDir = null;
		 
		    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
		    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { 
		    	// figures out on which side we are colliding (top, bottom, left, or right)         
		    	var oX = hWidths - Math.abs(vX),
		    		oY = hHeights - Math.abs(vY)
		    	if (oX >= oY) {
		            if (vY > 0) {
		                colDir = "top";
		                shapeA.y += oY;
		            } else {
		                colDir = "bottom";
		                shapeA.y -= oY;
		            }
		        } else {
		            if (vX > 0) {
		                colDir = "left";
		                shapeA.x += oX;
		            } else {
		                colDir = "right";
		                shapeA.x -= oX;
		            }
		        }
		    }
		    return colDir;
		}

		swichCostume(url) {
			this.url = url
			this.image.src = url
		}

		playAnimation(frames, loop, speed) {
			this.frames = frames
			this.speed = speed || 2
			this.frame = 0
			this.loop = loop || false
			this.runningAnimation = true
			this.image.src = this.frames[this.frame]
		}

		updateAnimationFrame() {
			if (this.runningAnimation) {
				if (GameSquare.tick / 2 == Math.round(GameSquare.tick / 2)) {
					this.frame++
				}
				if (this.frame == this.frames.length) {
					if (this.loop) {
						this.frame = 0
					} else {
						this.stopAnimation
						return
					}
				}
				this.image.src = this.frames[this.frame]
			}
		}

		stopAnimation() {
			this.runningAnimation = false
			this.frames = []
			this.loop = false
			this.frame = 0
		}
	},

	GroupObject: class {
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

    _$update: function () {
		GameSquare.tick++
		GameSquare.game._$update()
    },

    getInput: function(inputName) {
		if (GameSquare._$input[inputName] == undefined) {
			return false
		} else {
			return GameSquare._$input[inputName]
		}
    },
    
    _$input: {
		mouseX: 0,
		mouseY: 0
	},

    game: "none",

    tick: 0
}

window.addEventListener("keydown", function(e) {
    GameSquare._$input[e.key] = true
});
 
window.addEventListener("keyup", function(e) {
    GameSquare._$input[e.key] = false
});

window.addEventListener("mousemove", function(e) {
	GameSquare._$input.mouseX = e.clientX - GameSquare.canvas.element.offsetLeft
	GameSquare._$input.mouseY = e.clientY - GameSquare.canvas.element.offsetTop
})

window.addEventListener("mousedown", function(e) {
	GameSquare._$input.mouse = true
})

window.addEventListener("mouseup", function(e) {
	GameSquare._$input.mouse = false
})
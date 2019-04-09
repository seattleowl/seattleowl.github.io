// TOOL KIT
class ClassMod {
    constructor(callback) {
        this.callback = callback
    }

    static inculde(mod, obj) {
        mod.callback(obj)
    }
}
function getMap() {
    try {
        var map = new GamepadMap(0).getMap()
    } catch (e) {
        var map = {axis: {x: GameSquare.getInput("ArrowRight") + GameSquare.getInput("ArrowLeft") * -1, y: GameSquare.getInput("ArrowDown") + GameSquare.getInput("ArrowUp") * -1}, buttons: {y: GameSquare.getInput("z"), b: GameSquare.getInput("x")}}
    }
    return map
}
const Inneractable = new ClassMod(function (obj) {
    obj.checkInnneract = function (character, map = getMap(), button = "y") {
        if (this.colCheck(character) != null && map.buttons[button]) {
            return true
        }
        return false
    }
})

const RandomPos = new ClassMod(function (obj) {
    obj.moveToRandomPos = function () {
        this.x = Math.floor(Math.random() * 1600)
        this.y = Math.floor(Math.random() * 1000)
    }
})

const OnScreenOnly = new ClassMod(function (obj) {
    obj.keepOnScreen = function () {
        if (this.x > 3200) {
            this.x = 3200
        }

        if (this.x < -400) {
            this.x = -400
        }

        if (this.y > 2000) {
            this.y = 2000
        }

        if (this.y < -250) {
            this.y = -250
        }
    }
})

const dirBeetweenPoints = (a, b) => { 
    let upDown = ""
    let rightLeft = ""

    if (a == undefined || b == undefined) {
        return ""
    }

    if (a.x > b.x) {
        rightLeft = "left"
    } else {
        rightLeft = "right"
    }

    if (a.y > b.y) {
        upDown = "up"
    } else {
        upDown = "down"
    }

    if (Math.abs(b.x - a.x) > Math.abs(b.y - a.y)) {
        return rightLeft
    } else {
        return upDown
    }
}

// CANVAS AND PRELOAD
var game = new GameSquare.GameSquareCanvasObject("game")

GameSquare.preloadImages("Player-Right.svg", "Player-Left.svg")

// CLASSES / VARS
var scrollX = 0
var scrollY = 0
var score = 0

class ScrollingSprite extends GameSquare.GameSquareSpriteObject {
    constructor(config) {
        super(config)
    }

    render() {
        this.ctx.drawImage(this.image, this.x + 350 - scrollX, this.y + 200 - scrollY, this.width, this.height)
    }

    scrollToSelf() {
        scrollX += Math.round((this.x - scrollX) / 15)
        scrollY += Math.round((this.y - scrollY) / 15)

        if (scrollX < 0) {
            scrollX = 0
        }
        if (scrollX > 1600) {
            scrollX = 1600
        }

        if (scrollY < 0) {
            scrollY = 0
        }
        if (scrollY > 1000) {
            scrollY = 1000
        }
    }
}

class Player extends ScrollingSprite {
    constructor(config) {
        super({x: config.x, y: config.y, width: 50, height: 80, url: "Player-Right.svg"})
        this.speed = config.speed
        this.holding = null
        ClassMod.inculde(OnScreenOnly, this)
    }

    update() {
        var map = getMap()

        if (map.axis.x > 0.5) {
            this.x += this.speed
            this.url = "Player-Right.svg"
        }

        if (map.axis.x < -0.5) {
            this.x -= this.speed
            this.url = "Player-Left.svg"
        }

        if (map.axis.y < -0.5) {
            this.y -= this.speed
        }

        if (map.axis.y > 0.5) {
            this.y += this.speed
        }

        if (map.buttons.b && this.holding != null) {
            var newPackege = new Packege(this.holding)
            newPackege.x = this.x + 12
            newPackege.y = this.y + 60
            newPackege.url = this.holding.url
            newPackege.image.src = newPackege.url
            packeges.addMember(newPackege)
            this.holding = null
        }

        switch (dirBeetweenPoints(this, packeges.members[0])) {
            case "up":
                game.element.style.borderTopColor = "goldenrod"
                game.element.style.borderBottomColor = "darkmagenta"
                game.element.style.borderLeftColor = "darkmagenta"
                game.element.style.borderRightColor = "darkmagenta"
                break
            case "down":
                game.element.style.borderTopColor = "darkmagenta"
                game.element.style.borderBottomColor = "goldenrod"
                game.element.style.borderLeftColor = "darkmagenta"
                game.element.style.borderRightColor = "darkmagenta"
                break
            case "left":
                game.element.style.borderTopColor = "darkmagenta"
                game.element.style.borderBottomColor = "darkmagenta"
                game.element.style.borderLeftColor = "goldenrod"
                game.element.style.borderRightColor = "darkmagenta"
                break
            case "right":
                game.element.style.borderTopColor = "darkmagenta"
                game.element.style.borderBottomColor = "darkmagenta"
                game.element.style.borderLeftColor = "darkmagenta"
                game.element.style.borderRightColor = "goldenrod"
                break
            case "":
                game.element.style.borderTopColor = "darkmagenta"
                game.element.style.borderBottomColor = "darkmagenta"
                game.element.style.borderLeftColor = "darkmagenta"
                game.element.style.borderRightColor = "darkmagenta"
        }

        this.image.src = this.url
        this.keepOnScreen()
        this.scrollToSelf()
    }
}

class Packege extends ScrollingSprite {
    constructor(config) {
        super({x: config.x, y: config.y, width: 25, height: 25, url: ["Box-Red.svg", "Box-Yellow.svg", "Box-Blue.svg", "Box-Green.svg"][Math.floor(Math.random() * 4)]})
        ClassMod.inculde(Inneractable, this)
        ClassMod.inculde(RandomPos, this)
        this.moveToRandomPos()
        this.destructNxtFrame = false
    }

    update() {
        if (this.destructNxtFrame) {
            packeges.members.splice(packeges.members.indexOf(this), 1)
        }

        if (this.checkInnneract(player) && player.holding == null) {
            this.image.src = this.url
            var copiedPackege = new Packege(this)
            copiedPackege.url = this.url
            player.holding = copiedPackege
            this.delete()
            this.destructNxtFrame = true
        }
    }
}

class Mailbox extends ScrollingSprite {
    constructor(config) {
        super({x: config.x, y: config.y, width: 36, height: 66, url: "Mailbox-" + config.color + ".svg"})
        ClassMod.inculde(Inneractable, this)
    }

    update() {
        if (this.checkInnneract(player, undefined, "b") && player.holding != null) {
            let packegeColor = player.holding.url.split("-")[1]
            let mailboxColor = this.url.split("-")[1]
            if (packegeColor == mailboxColor) {
                score += 10
            } else {
                score -= 5
            }
            player.holding = null
            packeges.addMember(new Packege({x: 300, y: 300}))
        }
    }
}

// SPRITES
var player = new Player({x: 0, y: 0, speed: 3})
var packeges = new GameSquare.GameSquareGroupObject([new Packege({x: 300, y: 300})])
var background = new ScrollingSprite({x: -400, y: -250, width: 3200, height: 2000, url: "background.svg"})
var mailboxes = new GameSquare.GameSquareGroupObject([new Mailbox({x: 300, y: 300, color: "Red"}), new Mailbox({x: 1750, y: 280, color: "Yellow"}), new Mailbox({x: 1730, y: 1230, color: "Green"}), new Mailbox({x: 290, y: 1210, color: "Blue"})])
var scoreText = new GameSquare.GameSquareTextObject({x: 10, y: 30, text: "Score: 0"})

// LOOP
GameSquare.updateLoopCallback = function () {
    // UPDATE
    packeges.forAll((packege) => {
        packege.update()
    })
    mailboxes.forAll((mailbox) => {
        mailbox.update()
    })
    player.update()
    scoreText.text = "Score: " + score

    // RENDER
    game.clear()
    background.render()
    var infront = new GameSquare.GameSquareGroupObject([])
    var inback = new GameSquare.GameSquareGroupObject([])
    packeges.forAll((packege) => {
        if (player.y + player.height > packege.y + packege.height) {
            inback.addMember(packege)
        } else {
            infront.addMember(packege)
        }
    })
    mailboxes.forAll((mailbox) => {
        if (player.y + player.height > mailbox.y + mailbox.height) {
            inback.addMember(mailbox)
        } else {
            infront.addMember(mailbox)
        }
    })
    inback.render()
    player.render()
    infront.render()
    scoreText.render()
}
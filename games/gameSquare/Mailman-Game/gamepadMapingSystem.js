class GamepadMap {
    constructor(gamepadId) {
        this.gamepadId = gamepadId
        this.gamepad = navigator.getGamepads()[this.gamepadId]
    }

    getMap() {
        return {
            axis: {
                x: this.gamepad.axes[0],
                y: this.gamepad.axes[1],
            },
            buttons: {
                a: this.gamepad.buttons[0].pressed,
                b: this.gamepad.buttons[1].pressed,
                x: this.gamepad.buttons[3].pressed,
                y: this.gamepad.buttons[4].pressed,
                select: this.gamepad.buttons[10].pressed,
                start: this.gamepad.buttons[11].pressed,
                leftTrigger: this.gamepad.buttons[6].pressed,
                rightTrigger: this.gamepad.buttons[7].pressed,
            }
        }
    }
}
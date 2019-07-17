class App {
    constructor(name, url) {
        var leftPos = screen.width / 2 - 500
        var winHeight = screen.height - 200
        this.windowObject = window.open("about:blank", "popup", "width=1000,height=" + winHeight + ",top=100,left=" + leftPos)
        this.windowObject.document.title = name
        this.document = this.windowObject.document
        this.body = this.windowObject.document.body
        this.head = this.windowObject.document.head
    }

    addElement(type, text) {
        var e = this.windowObject.document.createElement(type)
        this.body.appendChild(e)
        e.innerHTML = text || ""
        return e
    }

    loadElement(elementID) {
        this.body.innerHTML += document.getElementById(elementID).innerHTML
    }

    loadCSS(styleID) {
        let styleTag = this.windowObject.document.createElement("style")
        styleTag.innerHTML += document.getElementById(styleID).innerHTML
        this.head.appendChild(styleTag)
    }

}
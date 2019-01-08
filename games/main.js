class Game {
    constructor(name, language, url) {
        this.name = name
        this.language = language
        this.url = url
    }

    getHTML() {
        return "<div class='smallLine result' onclick='location.href = `" + this.url + "`;'><h2>" + this.name + "</h2><p>" + this.language + "</p></div>"
    }
}

var games = []
gameData.forEach(data => {
    games.push(new Game(data.name, data.language, data.url))
});

function updateList() {
    var searchobj = {
        value: document.getElementById("search").value,
        element: document.getElementById("results")
    }

    function test(game) {
        switch (document.getElementById("type").value) {
            case "all":
                return game.name.toLowerCase().includes(this.value.toLowerCase()) || game.language.toLowerCase().includes(this.value.toLowerCase())

            case "name":
                return game.name.toLowerCase().includes(this.value.toLowerCase())

            case "language":
                return game.language.toLowerCase().includes(this.value.toLowerCase())
        }
    }
    var list = games.filter(test, searchobj)
    
    searchobj.element.innerHTML = ""
    if (list.length > 0) {
        list.forEach(element => {
            searchobj.element.innerHTML += "<br>" + element.getHTML()
        })
    } else {
        searchobj.element.innerHTML += "<h2>Nothing found.</h2>"
    }
}

window.onload = updateList
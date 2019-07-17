(function () {
    var mystuffLabel = document.getElementsByClassName("box-head")[0].children[0]

    mystuffLabel.innerHTML += " - OwlCoins: " + window.localStorage.owlCoins
})()
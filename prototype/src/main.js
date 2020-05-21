let lastY = window.scrollY
let header = document.getElementById("header")

window.onscroll = () => {
    if (window.scrollY > Math.min(lastY, 130)) {
        header.classList.add("minimized")
    } else if (window.scrollY < 130) {
        header.classList.remove("minimized")
    }
}

ajax("https://seattleowl-cms.herokuapp.com/content").then((data) => {
    let app = document.getElementById("app")

    data.posts.forEach(post => {
        let postEl = document.createElement("div")
        postEl.classList.add("post")

        let header = document.createElement("h2")
        header.innerHTML = post.title
        postEl.appendChild(header)

        let img = document.createElement("img")
        img.src = post.image
        postEl.appendChild(img)

        app.appendChild(postEl)
    })

    data.games.forEach(game => {
        let postEl = document.createElement("div")
        postEl.onclick = () => {location.href = game.url}
        postEl.classList.add("post")

        let header = document.createElement("h2")
        header.innerHTML = game.title
        postEl.appendChild(header)

        let img = document.createElement("img")
        img.src = game.image
        postEl.appendChild(img)

        app.appendChild(postEl)
    })
})
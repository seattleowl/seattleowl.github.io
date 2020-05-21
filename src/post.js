const md = markdownit()
let postID = new URLSearchParams(location.search).get("p")

ajax("https://seattleowl-cms.herokuapp.com/post/" + postID, "text").then((data) => {
    let result = md.render(data)
    document.getElementById("app").innerHTML += result
})
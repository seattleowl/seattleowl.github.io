window.onload = () => {
    setTimeout(() => {
        var user = firebase.auth().currentUser;
        console.log("Varible: ", user, ", Raw: ", firebase.auth().currentUser)
        if (user) {
            let message = document.getElementById("message")
            message.innerHTML = "Hello, " + user.displayName
        } else {
            let message = document.getElementById("message")
            message.innerHTML = "Hmm... I don't think your <a href='../login/'>signed in</a>..."
        }
    }, 1000)
}
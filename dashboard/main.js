window.onload = () => {
    setTimeout(() => {
        var user = firebase.auth().currentUser;
        //console.log("Varible: ", user, ", Raw: ", firebase.auth().currentUser)
        if (user) {
            let message = document.getElementById("message")
            message.innerHTML = "Hello, " + user.displayName + "<br><button onclick='firebase.auth().signOut();location.href = `https://seattleowl.com`'>Log Out</button>"
        } else {
            let message = document.getElementById("message")
            message.innerHTML = "Hmm... I don't think your <a href='../logIn/'>signed in</a>..."
        }
    }, 900)
}
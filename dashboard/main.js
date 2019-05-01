firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("message").innerHTML = "Hello, " + user.displayName
    } else {
        // No user is signed in.
    }
})
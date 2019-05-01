var user = firebase.auth().currentUser;

if (user) {
    let message = document.getElementById("message")
    message.innerHTML = user.displayName
} else {
    
}
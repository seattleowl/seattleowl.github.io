(function () {
    function copyTextToClipboard(text) {
        //Create a textbox field where we can insert text to. 
        var copyFrom = document.createElement("textarea");
      
        //Set the text content to be the text you wished to copy.
        copyFrom.textContent = text;
      
        //Append the textbox field into the body as a child. 
        //"execCommand()" only works when there exists selected text, and the text is inside 
        //document.body (meaning the text is part of a valid rendered HTML element).
        document.body.appendChild(copyFrom);
      
        //Select all the text!
        copyFrom.select();
      
        //Execute command
        document.execCommand('copy');
      
        //(Optional) De-select the text using blur(). 
        copyFrom.blur();
      
        //Remove the textbox field from the document.body, so no other JavaScript nor 
        //other elements can get access to this.
        document.body.removeChild(copyFrom);
      }

    let scratchVaribleValues = document.getElementsByClassName("monitor_value_3Yexa")

    let requestVar = Array.from(scratchVaribleValues).filter((element) => {
        return element.parentElement.children[0].innerHTML == "$owlCoins$"
    })[0]
    let requestCodeVar = Array.from(scratchVaribleValues).filter((element) => {
        return element.parentElement.children[0].innerHTML == "requestCode"
    })[0]
    let visableRequestCode = Array.from(scratchVaribleValues).filter((element) => {
        return element.parentElement.children[0].innerHTML == "Request code:"
    })[0]

    let request
    let requestCode

    if (requestVar && requestCodeVar && visableRequestCode) {
        request = requestVar.innerHTML
        requestCode = requestCodeVar.innerHTML
    } else {
        alert("This project is not able to connect with OwlCoins right now.\nPlease make sure that OwlCoins is supported with this project.")
    }

    if (request.includes(":reward")) {
        let val = request.split(":")[0]
        let userRequestNumber = prompt("Please enter the request code to claim your OwlCoins.")
        if (userRequestNumber == requestCode) {
            let result = Number(window.localStorage.owlCoins) + Number(val)
            window.localStorage.owlCoins = result
            let numOfStars = requestCodeVar.innerHTML.length
            visableRequestCode.innerHTML = "".padEnd(numOfStars, "*")
            alert("Great Job! You now have: " + window.localStorage.owlCoins + " OwlCoins!")
        } else {
            alert("Sorry, that's not it.")
        }
    } else if (request.includes(":pull")) {
        let val = request.split(":")[0]
        let userRequestNumber = prompt("Please enter the request code to withdraw your OwlCoins.")
        let oldOwlCoinCount = window.localStorage.owlCoins
        if (userRequestNumber == requestCode) {
            let result = Number(window.localStorage.owlCoins) - Number(val)
            if (result > -1) {
                window.localStorage.owlCoins = result
            } else {
                let message = "Oh no! You don't have that many owl coins! Click OK to take out only " + window.localStorage.owlCoins + " OwlCoins (That's all of your OwlCoins), or click cancel to stop the withdraw."
                if (confirm(message)) {
                    window.localStorage.owlCoins = 0
                } else {
                    return
                }
            }
            let numOfStars = requestCodeVar.innerHTML.length
            visableRequestCode.innerHTML = "".padEnd(numOfStars, "*")
            alert(`Nice! You have: ${window.localStorage.owlCoins} OwlCoins left over!
            Put the code '${oldOwlCoinCount - window.localStorage.owlCoins}-${requestCode}' in to the scratch project to claim your withdraw. Click OK to copy it.`)
            copyTextToClipboard(`${oldOwlCoinCount - window.localStorage.owlCoins}-${requestCode}`)
        } else {
            alert("Sorry, that's not it.")
        }
    }
})()
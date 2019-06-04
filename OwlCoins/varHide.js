(function () {
    function hideVar() {
        try {
            let scratchVaribleValues = document.getElementsByClassName("monitor_value_3Yexa")
    
            let requestCodeVar = Array.from(scratchVaribleValues).filter((element) => {
                return element.parentElement.children[0].innerHTML == "requestCode"
            })[0]
            requestCodeVar.parentElement.parentElement.style.display = "none"
        } catch (e) {}
    }

    setInterval(() => {
        hideVar()
        document.getElementsByClassName("monitor-list_monitor-list-scaler_143tA box_box_2jjDp")[0].addEventListener("DOMNodeInserted", function(e) {
            hideVar()
        }, false);
    }, 1000)
})()
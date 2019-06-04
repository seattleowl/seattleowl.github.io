chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.executeScript(null, {file: "processRequest.js"});
});

chrome.runtime.onInstalled.addListener(function() {
    window.localStorage.owlCoins = "0"
});
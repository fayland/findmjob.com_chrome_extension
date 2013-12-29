document.addEventListener("DOMContentLoaded", function () {
    backGround = chrome.extension.getBackgroundPage();
    //Call Function
    backGround.resetBadgeText();
});
!function(win, doc, $){
    var intervalId;
    var fetchUpdates = function() {
        var token = win.localStorage.getItem('findmjob_token');
        if (token && token.length > 0) {
            $.getJSON('http://findmjob.com/user/updates?format=json&token=' + token, function(data) {
                console.log(data);
            });
        } else if (intervalId) {
            window.clearInterval(intervalId);
        }
    };

    intervalId = win.setInterval(fetchUpdates, 60000); // every minute
    $(doc).ready(fetchUpdates);
}(window, document, Zepto);
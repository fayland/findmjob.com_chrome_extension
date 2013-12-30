!function(win, doc, $){
    var VERSION = '0.0.1';
    var base_url = 'http://findmjob.com';
    var REF_STRING = 'ref=chrome_' + VERSION;
    var intervalId;
    var fetchUpdates = function() {
        var token = localStorage.getItem('findmjob_token');
        if (token && token.length > 0) {
            var min_pushed_at = parseInt(localStorage.getItem('findmjob_pushed_at'));
            if (isNaN(min_pushed_at) || min_pushed_at < 1) min_pushed_at = 0;
            // min_pushed_at = 0;
            var url = 'http://findmjob.com/user/updates?' + REF_STRING + '&token=' + token + '&min_pushed_at=' + min_pushed_at;
            $.getJSON(url, function(data) {
                if (data.updates && data.updates.length) {
                    // send notification
                    if (window.webkitNotifications) {
                        $.each(data.updates, function(i, v) {
                            var notification = window.webkitNotifications.createNotification(
                                '../../icons/icon48.png',            // The image.
                                v.title,                       // The title.
                                v.title      // The body.
                            );
                            notification.onclick = function() { // Open on click
                                window.open(base_url + v.url + '?' + REF_STRING);
                                notification.cancel();
                            }
                            notification.show();
                            // Close after 30 secs
                            setTimeout(function() {
                                notification.cancel();
                            }, 30 * 1000);
                        });
                    }

                    // store it so that popups can read it
                    var updates = localStorage.getItem('findmjob_updates');
                    if (! updates) {
                        updates = Array();
                    } else {
                        updates = JSON.parse(updates);
                    }
                    updates = updates.splice(0, 10); // to keep it samll
                    updates = data.updates.concat(updates);
                    localStorage.setItem('findmjob_updates', JSON.stringify(updates));

                    // just make it simple, we do not count the old ones
                    chrome.browserAction.setBadgeText({
                        text: data.updates.length.toString()
                    });
                }
                if (data.max_pushed_at) {
                    localStorage.setItem('findmjob_pushed_at', data.max_pushed_at);
                }
            });
        } else if (intervalId) {
            window.clearInterval(intervalId);
        }
    };

    intervalId = win.setInterval(fetchUpdates, 60000); // every minute
    $(doc).ready(fetchUpdates);
}(window, document, Zepto);
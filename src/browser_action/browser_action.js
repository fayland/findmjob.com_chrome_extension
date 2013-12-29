!function(win, doc, $){
    var VERSION = '0.0.1';
    var base_url = 'http://findmjob.com';
    var REF_STRING = 'ref=chrome_' + VERSION;

    $(doc).ready(function () {
        // Mark as Read
        chrome.browserAction.setBadgeText({
            text: ""
        });

        var updates = localStorage.getItem('findmjob_updates');
        if (updates) {
            $("#updates_tips").hide();

            updates = JSON.parse(updates);
            var html = "";
            $.each(updates, function(i, v) {
                var url = base_url + v.url + '?' + REF_STRING;
                html += "<li><a href='" + url + "' target='_blank'>" + v.title + "</a></li>";
            });
            $("#updates").html(html);
            $("#updates_view_more").show();
        }
    });

}(window, document, Zepto);
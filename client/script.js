window.onload = function () {
    var url = window.location.href;
    function UrlExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if (http.status == 404) {
            fetch('/client/NotFound.html')
                .then(function (response) {
                    return response.text();
                })
        }

    }
}
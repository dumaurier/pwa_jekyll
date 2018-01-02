function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    var host = location.host;
    if (host.split('.').length === 1 || host === "localhost") {
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    else {
        domain = ".workopolis.com";
        document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
    }
    if (readCookie(name) == null || readCookie(name) != value) {
        document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
    }
}

function createCookieHostOnly(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    var host = location.host;
    if (host.split('.').length === 1 || host === "localhost" || host === "www.staging.workopolis.com") {
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    else {
        domain = "www.workopolis.com";
        document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
    }
    if (readCookie(name) == null || readCookie(name) != value) {
        domain = "www.workopolis.com";
        document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
    }
}

function readCookie(name) {
    var nameEq = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
    }
    return null;
}

function are_cookies_enabled() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        document.cookie = "testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
}

function eraseCookie(name) {
    if (document.cookie.indexOf(name) != -1) {
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/;';
    }
}

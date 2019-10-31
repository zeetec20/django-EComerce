function mediaQuery(min, max) {
    let maxWidth = "(max-width: " + max + "px)";
    let minWidth = "(min-width: " + min + "px)";
    var mediaQuery = window.matchMedia(minWidth + " and " + maxWidth);
    return mediaQuery;
}

function setCookie(name, value) {
    console.log(value);
    let expDay = 30;
    var date = new Date();
    date.setTime(date.getTime() + (expDay * 24 * 60 * 60 * 1000));
    var expires = "expires="+date.toUTCString();
    
    let cookie = getCookie(name);
    let arrayCookie = cookie.split(', ');
    if (cookie != "") {
        if (arrayCookie.indexOf(value) != -1) {
            // Barang sudah ada di cart
        } else {
            document.cookie = name + "=" + cookie + ", " + value + ";" + expires + ";path=/";
        }
    }else {
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    // document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// jangan diubah 
function getCookie(name) {
    var name = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(nama) {
    var cookie = getCookie(nama);
    let arrayCookie = cookie.split(', ');
    if (cookie != "") {
        alert(arrayCookie);
    } else {
        alert('tidak ada');
    }
}

function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
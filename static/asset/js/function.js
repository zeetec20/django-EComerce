function screenBlank(action) {
    if (action == 'show') {
        $('.screenBlank').css({
            'transition': 'all 0.5s',
            'visibility': 'visible',
            'opacity': '1',
        });
    }
    if (action == 'close') {
        $('.screenBlank').css({
            'transition': 'all 0.5s',
            'opacity': '0',
            'visibility': 'hidden'
        });
    }
}

function pageLogin_Register(action) {
    if (action == 'show') {
        $('.login-register').css({
            'visibility': 'visible',
            'transition': 'all 1s',
            'top': '5%',
        });
    } else if (action == 'close') {
        $('.login-register').css({
            'transition': 'all 1s',
            'top': '-90%',
            'visibility': 'hidden'
        });
    }
}

function ShowLoginPage() {
    $('#registerPage').css({
        'display': 'none'
    });
    $('#loginPage').css({
        'display': 'block'
    });
}

function ShowRegisterPage() {
    $('#loginPage').css({
        'display': 'none'
    });
    $('#registerPage').css({
        'display': 'block'
    });
}

function showLogin_Register(action) {
    if (action == 'login') {
        pageLogin_Register('show');
        ShowLoginPage();
        screenBlank('show');
        $('.login-register').css({
            'height': '440px',
            'margin-top': '5%'
        });
    }
    if (action == 'register') {
        pageLogin_Register('show');
        ShowRegisterPage();
        screenBlank('show');
        $('.login-register').css({
            'height': '630px',
            'margin-top': '30px'
        });
        if (mediaQuery('720', '1440').matches) {
            $('.login-register').css({
                'height': '610px',
                'margin-top': '-20px'
            });
        }
    }
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

function pageCart(action) {
    if (action == 'show') {
        $('.cartPage').css({
            'transition': 'all 1s',
            'visibility': 'visible',
            'opacity': '1',
            'left': '0',
        });
        screenBlank('show');
    }
    if (action == 'close') {
        $('.cartPage').css({
            'transition': 'all 1s',
            'left': '-160%',
            'opacity': '0',
            'visibility': 'hidden',
        });
        screenBlank('close');
    }
}

function addBarangCart(nama, warna, quantity = 1) {
    let data = nama + " : " + warna + " : " + quantity;
    setCookie("barang", data);
}

function removeBarangCart(params) {
    
}

function checkTotalFunction(params) {
    
}

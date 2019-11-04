function buy(username) {
    if (username != '') {
        let href = $('#buttonBuy').attr('href');
        href.replace('//', username);
        $('#buttonBuy').attr({
            'href': href
        });
    }

    $('#buttonBuy').attr({
        'href': $('#buttonBuy').attr('href') + "&quantity=" + $('#quantity').val() + "&color=" + $('#buttonColor').attr('color')
    });
    window.location.href = $("#buttonBuy").attr('href');
}

function setColor(color) {
    $('#buttonColor').atrr({
        'color': color
    });
}

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
            'transition': 'all 1s',
            'opacity': '1',
            'top': '5%',
        });
    } else if (action == 'close') {
        $('.login-register').css({
            'transition': 'all 1s',
            'opacity': '0',
            'top': '-90%',
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

function pageCart(action) {
    if (action == 'show') {
        $('.cartPage').css({
            'transition': 'all 1s',
            'visibility': 'visible',
            'opacity': '1',
            'left': '0',
        });
        screenBlank('show');
        $.ajax({
            url: '/ajax/cart',
            type: 'GET',
            data: {
    
            },
            success: function (returnData) {
                $('.cartPage').html(returnData);
            }
        });
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

function numberCart() {
    let barang = getCookie("barang");
    if (barang != "") {
        $('#numberCart').html(barang.split(', ').length);
    } else {
        $('#numberCart').html('0');
    }
}

function profile(action) {
    if (action == 'close') {
        $('.pageProfile').css({
            'transition': 'all 1s',
            'margin-top': '-600px',
            'opacity': '0',
            'visibility': 'hidden',
        });
        screenBlank('close');
    }
    if (action == 'show') {
        ajaxProfile();
        $('.pageProfile').css({
            'visibility': 'visible',
            'transition': 'all 1s',
            'margin-top': '150px',
            'opacity': '1',
        });
        if (mediaQuery(750, 1440).matches) {
            $('.pageProfile').css({
                'margin-top': '30px'
            });
        }
        screenBlank('show');
    }
}

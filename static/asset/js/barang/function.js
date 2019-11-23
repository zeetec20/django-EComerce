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
            'visibility': 'visible',
            'transition': 'all 1s',
            'height': '440px',
            'opacity': '1'
        });
    } else if (action == 'close') {
        $('.login-register').css({
            'transition': 'all 1s',
            'opacity': '0',
            'height': '0px',
            'visibility': 'hidden',
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
            'visibility': 'visible',
            'transition': 'all 1s',
            'height': '440px',
            'opacity': '1'
        });
    }
    if (action == 'register') {
        pageLogin_Register('show');
        ShowRegisterPage();
        screenBlank('show');
        $('.login-register').css({
            'visibility': 'visible',
            'transition': 'all 1s',
            'height': '635px',
            'opacity': '1'
        });
        if (mediaQuery('720', '1440').matches) {
            $('.login-register').css({
                'height': '625px',
                'top': '0'
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
            'height': '650px'
        });
        if (mediaQuery(750, 1440).matches) {
            $('.cartPage').css({
                'transition': 'all 1s',
                'visibility': 'visible',
                'opacity': '1',
                'height': '620px'
            });
        }
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
            'opacity': '0',
            'height': '0px',
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
            'height': '0px',
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
            'height': '580px',
            'opacity': '1',
        });
        screenBlank('show');
    }
}

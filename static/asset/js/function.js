function cart() {
    $.ajax({
        url: '/ajax/cart',
        type: 'GET',
        data: {

        },
        success: function (returnData) {
            $('.cartPage').html(returnData);
        }
    });
    console.log('cart');
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

function addBarangCart(nama, warna, quantity = 1) {
    let data = nama + " : " + warna + " : " + quantity;
    setCookie("barang", data);
}

function removeBarangCart(params) {
    
}

function checkTotalFunction(params) {
    
}

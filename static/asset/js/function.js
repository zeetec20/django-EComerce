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

function showLogin_Register(action) {
    if (action == 'login') {
        $('.login-register').css({
            'visibility': 'visible',
            'transition': 'all 1s',
            'top': '5%',
        });
        screenBlank('show');
    }
}



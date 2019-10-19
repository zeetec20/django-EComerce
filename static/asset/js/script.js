let notLogin = (
    '<a class="dropdown-item" onclick="showLogin_Register()">Login</a>' + 
    '<a class="dropdown-item">Register</a>'
);

$('#buttonCloseLoginRegister').click(function () {
    $('.login-register').css({
        'transition': 'all 1s',
        'top': '-90%',
        'visibility': 'hidden'
    });
    $('.screenBlank').css({
        'transition': 'all 0.5s',
        'opacity': '0',
        'visibility': 'hidden'
    });
});

$('.active').css({
    'background-color': '#313131',
    'color': '#f4f4f4',
});

$('#logout').click(function () {
    logout();
})

showLogin_Register('login');
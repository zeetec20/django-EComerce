let notLogin = (
    '<a class="dropdown-item" onclick="showLogin_Register()">Login</a>' + 
    '<a class="dropdown-item">Register</a>'
);

$('.active').css({
    'background-color': '#313131',
    'color': '#f4f4f4',
});

$('#logout').click(function () {
    logout();
})

showLogin_Register('login');
cart();
let notLogin = (
    '<a class="dropdown-item login" onclick="showLogin_Register(\'login\')">Login</a>' + 
    '<a class="dropdown-item register" onclick="showLogin_Register(\'register\')">Register</a>'
);

$('.active').css({
    'background-color': '#313131',
    'color': '#f4f4f4',
});

$('#logout').click(function () {
    logout();
})

// showLogin_Register('login');
listBarang('show');
numberCart();
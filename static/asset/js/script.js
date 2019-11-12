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

$("#inputSearch").on('keyup', function (e) {
    if (e.keyCode === 13) {
        search($("#inputSearch").val());
    }
});

// showLogin_Register('login');
// screenBlank('show');
// listBarang('show');
numberCart();
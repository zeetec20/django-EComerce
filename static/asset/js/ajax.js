
function logout() {
    $.ajax({
        url: '/ajax/logout',
        data: {
            
        },
        success: function (returnData) {
            $('.userBar').html(notLogin);
            showLogin_Register('login');
        }
    });
}




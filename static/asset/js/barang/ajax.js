
function logout() {
    $.ajax({
        url: '/ajax/logout',
        data: {
            
        },
        success: function (returnData) {
            $('.userBar').html(notLogin);
            showLogin_Register('login');
            $('#buttonBuy').attr('onclick', "showLogin_Register('login')");
        }
    });
}

function register(event) {
    event.preventDefault();
    var data = new FormData($('#form-register').get(0));
    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {
            $('#form-register').get(0).reset();
            pageLogin_Register('close');
            screenBlank('close');
        }
    });
    
    return false;
}

function login(event) {
    event.preventDefault();
    var data = new FormData($('#form-login').get(0));
    console.log(data)
    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            let username = $('.username').text();
            pageLogin_Register('close');
            screenBlank('close');
            $('#form-login').get(0).reset();
            $('.userBar').html(data);
            $('#buttonBuy').attr('onclick', "buy($('.username').text().trim())");
        }
    });

    return false;
}

function ajaxProfile() {
    $.ajax({
        url: '/ajax/profile',
        type: 'GET',
        data: {

        },
        success: function (returnData) {
            $('.pageProfile').html(returnData);
        }
    })
}

$('#form-register').submit(register);
$('#form-login').submit(login);
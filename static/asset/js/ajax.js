
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
            pageLogin_Register('close');
            screenBlank('close');
            $('#form-register').get(0).reset();
        }
    });
    
    return false;
}

function login(event) {
    event.preventDefault();
    var data = new FormData($('#form-login').get(0));
    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            pageLogin_Register('close');
            screenBlank('close');
            $('#form-login').get(0).reset();
            $('.userBar').html(data);
        }
    });

    return false;
}

function pagination(page) {
    $.ajax({
        url: '/',
        type: 'GET',
        data: {
            'pagination': page
        },
        success: function (returnData) {
            $('.listBarang').html(returnData);
            // listBarang('close');
            // listBarang('show');
        }
    });
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
    });
}

function ajaxSubscribe(email) {
    $.ajax({
        url: '/ajax/subscribe',
        type: 'GET',
        data: {
            'email': email
        },
        success: function (returnData) {
            
        }
    });
}

$('#form-register').submit(register);
$('#form-login').submit(login);
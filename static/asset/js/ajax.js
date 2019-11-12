function getCSRF() {
    $.ajax({
        url: '/ajax/csrf',
        data: {
            
        },
        success: function (returnData) {
            $('input[name="csrfmiddlewaretoken"]').val(returnData['csrf']);
        }
    });
}

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
            getCSRF();
        }
    });

    return false;
}

function pagination(page, url) {
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        data: {
            'pagination': page
        },
        success: function (returnData) {
            $('.listBarang').html(returnData);
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

function search(keyword) {
    $.ajax({
        url: '/ajax/search',
        type: 'GET',
        data: {
            'keyword': keyword
        },
        success: function (returnData) {
            $('.listBarang').html(returnData);
            $('.body2 .header .titleLeft').text('Hasil Pencarian ' + keyword);
            $('.body2 .header .buttonMain').html('Urutkan&nbsp');
        }
    });
}

function paginationSearch(keyword, key) {
    $.ajax({
        url: '/ajax/search',
        type: 'GET',
        data: {
            'keyword': keyword,
            'pagination': key
        },
        success: function (returnData) {
            $('.listBarang').html(returnData);
        }
    });
}

function barangTerbaru() {
    $.ajax({
        url: '/',
        type: 'GET',
        data: {
            'pagination': '1'
        },
        success: function (returnData) {
            $('.listBarang').html(returnData);
            $('.body2 .header .titleLeft').text('Produk Terbaru');
        }
    });
}

function sortBarang(sort) {
    let url = '/ajax/sort/';
    if (sort == 'barangTerbaru') {
        barangTerbaru();
    }
    if (sort == 'barangMurah') {
        $.ajax({
            url: url + sort,
            type: 'GET',
            data: {
                
            },
            success: function (returnData) {
                $('.listBarang').html(returnData);
                $('.body2 .header .titleLeft').text('Produk Harga Rendah ke Tinggi');
            }
        });
    }
    if (sort == 'barangMahal') {
        $.ajax({
            url: url + sort,
            type: 'GET',
            data: {
                
            },
            success: function (returnData) {
                $('.listBarang').html(returnData);
                $('.body2 .header .titleLeft').text('Produk Harga Tinggi ke Rendah');
            }
        });
    }
    if (sort == 'barangAZ') {
        $.ajax({
            url: url + sort,
            type: 'GET',
            data: {
                
            },
            success: function (returnData) {
                $('.listBarang').html(returnData);
                $('.body2 .header .titleLeft').text('Produk Nama A ke Z');
            }
        });
    }
    if (sort == 'barangZA') {
        $.ajax({
            url: url + sort,
            type: 'GET',
            data: {
                
            },
            success: function (returnData) {
                $('.listBarang').html(returnData);
                $('.body2 .header .titleLeft').text('Produk Nama Z ke A');
            }
        });
    }
}

$('#form-register').submit(register);
$('#form-login').submit(login);

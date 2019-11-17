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
    empty = []
    let fullName    = $('.register .fullName input').val()
    let username    = $('.register .username input').val()
    let email       = $('.register .email input').val()
    let password    = $('.register .password input').val()
    let profile     = $('.register .divProfile input').val()

    if (fullName == '') {
        empty.push('fullName')
        $('.register .fullName small').text('Masukkan Nama Lengkap terlebih dahulu sebelum register')
        $('.register .fullName small').css({'color': '#fd6c6c'})
    }
    if (username == '') {
        empty.push('username')
        $('.register .username small').text('Masukkan Username terlebih dahulu sebelum register')
        $('.register .username small').css({'color': '#fd6c6c'})
    }
    if (email == '') {
        empty.push('email')
        $('.register .email small').text('Masukkan Email terlebih dahulu sebelum register')
        $('.register .email small').css({'color': '#fd6c6c'})
    }
    if (password == '') {
        empty.push('password')
        $('.register .password small').text('Masukkan Password terlebih dahulu sebelum register')
        $('.register .password small').css({'color': '#fd6c6c'})
    }
    if (profile == '') {
        empty.push('profile')
        $('.register .divProfile small').text('Masukkan Profile terlebih dahulu sebelum register')
        $('.register .divProfile small').css({'color': '#fd6c6c'})
    }
    if (empty == 0) {
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
    } else {

    }
}

function login(event) {
    event.preventDefault();

    let username = $('.login .username input').val()
    let password = $('.login .password input').val()
    empty = []
    if (username == '') {
        empty.push('username')
        $('.login .username small').text('Masukkan Username terlebih dahulu sebelum login')
        $('.login .username small').css({
            'color': '#fd6c6c'
        })
    }
    if (password == '') {
        empty.push('password')
        $('.login .password small').text('Masukkan Password terlebih dahulu sebelum login')
        $('.login .password small').css({
            'color': '#fd6c6c'
        })
    }

    if (empty.length == 0) {
        var data = new FormData($('#form-login').get(0));
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                type = typeof data
                if (type == 'object') {
                    $('.login .password small, .login .username small').text('Anda gagal login, username atau password anda ada yang salah')
                    $('.login .password small, .login .username small').css({
                        'color': '#fd6c6c'
                    })
                } else {
                    pageLogin_Register('close');
                    screenBlank('close');
                    $('#form-login').get(0).reset();
                    $('.userBar').html(data);
                    getCSRF();
                }
            }
        });
    } else {
        
    }
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

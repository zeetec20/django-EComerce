function cart() {
    $.ajax({
        url: '/ajax/cart',
        type: 'GET',
        data: {

        },
        success: function (returnData) {
            $('.cartPage').html(returnData);
        }
    });
}

function listBarang(action) {
    if (action == 'close') {
        $('.item').css({
            'transition': '0s',
            'opacity': '0',
            'margin-top': '120px'
        });
    }
    if (action == 'show') {
        $('.item').css({
            'transition': '0.7s',
            'opacity': '1',
            'margin-top': '0'
        });
    }
}

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

function pageLogin_Register(action) {
    if (action == 'show') {
        $('.login-register').css({
            'visibility': 'visible',
            'transition': 'all 1s',
            'height': '440px',
            'opacity': '1'
        });
    } else if (action == 'close') {
        $('.login-register').css({
            'transition': 'all 1s',
            'opacity': '0',
            'height': '0px',
            'visibility': 'hidden',
        });
    }
}

function ShowLoginPage() {
    $('#registerPage').css({
        'display': 'none'
    });
    $('#loginPage').css({
        'display': 'block'
    });
}

function ShowRegisterPage() {
    $('#loginPage').css({
        'display': 'none'
    });
    $('#registerPage').css({
        'display': 'block'
    });
}

function showLogin_Register(action) {
    if (action == 'login') {
        pageLogin_Register('show');
        ShowLoginPage();
        screenBlank('show');
        $('.login-register').css({
            'visibility': 'visible',
            'transition': 'all 1s',
            'height': '440px',
            'opacity': '1'
        });
    }
    if (action == 'register') {
        pageLogin_Register('show');
        ShowRegisterPage();
        screenBlank('show');
        $('.login-register').css({
            'visibility': 'visible',
            'transition': 'all 1s',
            'height': '635px',
            'opacity': '1'
        });
        if (mediaQuery('720', '1440').matches) {
            $('.login-register').css({
                'height': '625px',
                'top': '0'
            });
        }
    }
}

function pageCart(action) {
    if (action == 'show') {
        $('.cartPage').css({
            'transition': 'all 1s',
            'visibility': 'visible',
            'opacity': '1',
            'height': '650px'
        });
        if (mediaQuery(750, 1440).matches) {
            $('.cartPage').css({
                'transition': 'all 1s',
                'visibility': 'visible',
                'opacity': '1',
                'height': '600px'
            });
        }
        screenBlank('show');
        $.ajax({
            url: '/ajax/cart',
            type: 'GET',
            data: {
    
            },
            success: function (returnData) {
                $('.cartPage').html(returnData);
            }
        });
    }
    if (action == 'close') {
        $('.cartPage').css({
            'transition': 'all 1s',
            'opacity': '0',
            'height': '0px',
            'visibility': 'hidden',
        });
        screenBlank('close');
    }
}

function numberCart() {
    let barang = getCookie("barang");
    if (barang != "") {
        $('#numberCart').html(barang.split(', ').length);
    } else {
        $('#numberCart').html('0');
    }
}

function addBarangCart(nama, warna, quantity = 1) {
    let data = nama + " : " + warna + " : " + quantity;
    setCookie("barang", data);
    numberCart();
}

function removeBarangCart(nama) {
    let semuaBarang = "";
    let cookieBarang = getCookie("barang").split(', ');
    let index = 0;
    cookieBarang.forEach(barang => {
        index += 1;
        barangNama = barang.split(' : ')[0];
        if (barangNama == nama) {
            
        } else {
            semuaBarang += barang + ', ';
        }
    });
    semuaBarang = semuaBarang.substring(0, semuaBarang.length - 2);
    replaceCookie('barang', semuaBarang);
    $.ajax({
        url: '/ajax/cart',
        type: 'GET',
        data: {

        },
        success: function (returnData) {
            $('.cartPage').html(returnData);
        }
    });
    numberCart();
}

function profile(action) {
    if (action == 'close') {
        $('.pageProfile').css({
            'transition': 'all 1s',
            'height': '0px',
            'opacity': '0',
            'visibility': 'hidden',
        });
        screenBlank('close');
    }
    if (action == 'show') {
        ajaxProfile();
        $('.pageProfile').css({
            'visibility': 'visible',
            'transition': 'all 1s',
            'height': '580px',
            'opacity': '1',
        });
        screenBlank('show');
    }
}

function toSearch() {
    window.scrollTo({top: 0, behavior: "smooth"});
    setTimeout(function(){
        $('.search').focus();
    }, 750);
}

function tentangKami(action) {
    if (action == 'visible') {
        $('.aboutPage').css({
            'visibility': 'visible',
            'transition': 'all 0.5s',
            'height': '400px',
            'opacity': '1'
        });
        screenBlank('show');
    }
    if (action == 'hidden') {
        $('.aboutPage').css({
            'transition': 'all 0.5s',
            'height': '0px',
            'opacity': '0',
            'visibility': 'hidden',
        });
        screenBlank('close');
    }
}

function cartBayar() {
    let slugify = []
    for (let index = 1; index < (parseInt($('.list').attr('barang')) + 1); index++) {
        slugify.push($('.list .barang{0} .name .barang'.format(index)).attr('slugify'));
    }
    let quantity = []
    for (let index = 1; index < (parseInt($('.list').attr('barang')) + 1); index++) {
        quantity.push($('#quantity' + index).val());
    }
    let color = []
    for (let index = 1; index < (parseInt($('.list').attr('barang')) + 1); index++) {
        color.push($('.list .warna' + index).text());
    }
    let barang = slugify.toString().replace(',', ' ');
    quantity = quantity.toString().replace(',', ' ');
    color = color.toString().replace(',', ' ');
    url = "http://127.0.0.1:8000/address/zeetec/cart?barang={0}&quantity={1}&color={2}".format(barang, quantity, color);
    window.location.href = url;
}

function quantityCart(quantity, idBarang, list = $('.list').attr('barang')) {
    let hargaAwal = parseInt($('.list #totalPrice' + idBarang).attr('harga'));
    let harga = hargaAwal * parseInt(quantity);
    $('.list #totalPrice' + idBarang).text('Rp. {0}'.format(harga.toString().numberComma()));

    let hargaTotalItem = 0, hargaTotal = 0
    for (let index = 1; index < (parseInt(list) + 1); index++) {
        hargaTotalItem = parseInt($('.list #totalPrice' + index).attr('harga') * $('#quantity' + index).val());
        hargaTotal += hargaTotalItem
    }
    $('#subtotal').html('Subtotal <b>Rp. {0}</b>'.format(hargaTotal.toString().numberComma()));
}

// delete_cookie('barang');
// checkCookie('barang');


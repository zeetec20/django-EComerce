function screenBlank(action) {
    if (action == 'visible') {
        $('.screenBlank').css({
            'visibility': 'visible',
            'transition': 'all 0.5s',
            'opacity': '1'
        });
    }
    if (action == 'hidden') {
        $('.screenBlank').css({
            'transition': 'all 0.5s',
            'opacity': '0',
            'visibility': 'hidden',
        });
    }
}

function provinsi(idProvinsi, nama) {
    $.ajax({
        url: '/ajax/api/kabupaten',
        type: 'GET',
        data: {
            'id_provinsi': idProvinsi
        },
        success: function (returnData) {
            $('.dropdown-menu-kabupaten').html(returnData);
            $('.buttonProvinsi').html(nama + '&nbsp;');
            $('.buttonKabupaten').html('Kabupaten / Kota&nbsp;');
            $('.buttonKecamatan').html('Kecamatan&nbsp;');
            $('.buttonKecamatan').prop('disabled', true);
            $('.buttonKabupaten').removeAttr('disabled');
        }
    });
}

function kabupaten(idKabupaten, nama) {
    $.ajax({
        url: '/ajax/api/kecamatan',
        type: 'GET',
        data: {
            'id_kabupaten': idKabupaten
        },
        success: function (returnData) {
            $('.dropdown-menu-kecamatan').html(returnData);
            $('.buttonKabupaten').html(nama);
            $('.buttonKecamatan').removeAttr('disabled');
            $('.buttonKecamatan').html('Kecamatan&nbsp;');
        }
    })
}

function kecamatan(idKecamatan, nama) {
    $('.buttonKecamatan').html(nama);
}

function getKontak() {
    let email   = $('#contactEmail').val();
    let noHp    = $('#contactNomorHP').val();
    return "{0}, {1}".format(email, noHp);
}

function getAlamat() {
    let label               = $('#alamatLabelAlamat').val();
    let namaLengkap         = $('#alamatNamaLengkap').val();
    let provinsi            = $('.buttonProvinsi').text();
    let kabupaten           = $('.buttonKabupaten').text();
    let kecamatan           = $('.buttonKecamatan').text();
    let kodePos             = $('#alamatKodePos').val();
    let informasiTambahan    = $('#alamatInformasiTambahan').val();
    let simpan              = $('#alamatSimpanAlamat').val();

    kabupatenLength = kabupaten.length
    kabupaten = kabupaten.split(' ').slice(1);
    kabupaten = String(kabupaten).replace(',', ' ');

    return [label, namaLengkap, provinsi, kabupaten, kecamatan, kodePos, informasiTambahan, simpan];
}

function getAddress(username) {
    // let user    = username;
    let kontak  = getKontak();
    let alamat  = getAlamat();

    screenBlank('visible');
    $('.loading').css({
        'visibility': 'visible',
        'transition': 'all 0.5s',
        'opacity': '1',
        'width': '80px',
    })
    ongkir(kontak, alamat);
}

function ekspedisi(namaEkpd, ekpd) {
    $('.buttonEkspedisi').html(namaEkpd + '&nbsp');
    $('.' + ekpd).css({
        'visibility': 'visible'
    });
    $('.buttonJenisPengiriman').removeAttr('disabled');
}

function jenisPengiriman(harga, nama) {
    let totalHargaBarang = parseInt($('#totalHargaBarang').text().split(' ')[1].replace(/,/g, ''));
    let total = totalHargaBarang + parseInt(harga);
    $('#hargaPengiriman').text('Rp. ' + harga.toString().numberComma());
    $('#total').text('Rp. ' + total.toString().numberComma());
    $('.buttonJenisPengiriman').html(nama);
}

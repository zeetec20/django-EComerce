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
    let informasiTambahan   = $('#alamatInformasiTambahan').val();
    let simpan              = $('#alamatSimpanAlamat').val();

    kabupatenLength = kabupaten.length
    kabupaten = kabupaten.split(' ').slice(1);
    kabupaten = String(kabupaten).replace(',', ' ');

    return [label, namaLengkap, provinsi, kabupaten, kecamatan, kodePos, informasiTambahan, simpan];
}

function getAddress(username, method, jumlahBarang, slugify) {
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
    ongkir(kontak, alamat, method, jumlahBarang, slugify);
}

function ekspedisi(namaEkpd, ekpd) {
    $('.buttonEkspedisi').html(namaEkpd + '&nbsp');
    $('.buttonJenisPengiriman').removeAttr('disabled');
    $('.buttonJenisPengiriman').html('Jenis Pengiriman&nbsp');
    $('.jne, .tiki, .pos').css({
        'display': ''
    });
    if (ekpd == 'jne') {
        $('.tiki').css({
            'display': 'none'
        });
        $('.pos').css({
            'display': 'none'
        });
    } else if (ekpd == 'tiki') {
        $('.jne').css({
            'display': 'none'
        });
        $('.pos').css({
            'display': 'none'
        });
    } else if (ekpd == 'pos') {
        $('.jne').css({
            'display': 'none'
        });
        $('.tiki').css({
            'display': 'none'
        });
    }
    $('#total').html($('#totalHargaBarang').text());
    $('#hargaPengiriman').html('Dihitung Nanti');
}

function jenisPengiriman(harga, nama) {
    let totalHargaBarang = parseInt($('#totalHargaBarang').text().split(' ')[1].replace(/,/g, ''));
    let total = totalHargaBarang + parseInt(harga);
    $('#hargaPengiriman').text('Rp. {0}'.format(harga.toString().numberComma()));
    $('#total').text('Rp. {0}'.format(total.toString().numberComma()));
    $('.buttonJenisPengiriman').text(nama);
}

function textBox(action) {
    if (action == 'visible') {
        $('.textBox').css({
            'visibility': 'visible',
            'transition': 'all 1s',
            'width': '40%',
            'opacity': '1'
        });
    }
    if (action == 'hidden') {
        $('.textBox').css({
            'transition': 'all 1s',
            'width': '0%',
            'opacity': '0',
            'visibility': 'hidden',
        });
    }
}

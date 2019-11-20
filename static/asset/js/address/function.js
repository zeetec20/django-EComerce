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
    
    empty = []
    if (email == '') {
        empty.push('email')
        $('.divEmail small').text('Email anda masih kosong, tolong diisi terlebih dahulu');
        $('.divEmail small').css({'color': '#fd6c6c'});
    }
    if (noHp == '') {
        empty.push('noHp')
        $('.divNoHP small').text('Nomer Hp anda masih kosong, tolong diisi terlebih dahulu');
        $('.divNoHP small').css({'color': '#fd6c6c'});
    }
    if (empty.length == 0) {
        return "{0}, {1}".format(email, noHp);
    } else {
        return false
    }
}

function getAlamat() {
    // let label               = $('#alamatLabelAlamat').val();
    // let namaLengkap         = $('#alamatNamaLengkap').val();
    // let provinsi            = $('.buttonProvinsi').text();
    // let kabupaten           = $('.buttonKabupaten').text();
    // let kecamatan           = $('.buttonKecamatan').text();
    // let kodePos             = $('#alamatKodePos').val();
    // let informasiTambahan   = $('#alamatInformasiTambahan').val();
    // let simpan              = $('#alamatSimpanAlamat').val();

    // kabupatenLength = kabupaten.length
    // kabupaten = kabupaten.split(' ').slice(1);
    // kabupaten = String(kabupaten).replace(/,/g, ' ');

    // return [label, namaLengkap, provinsi, kabupaten, kecamatan, kodePos, informasiTambahan, simpan];

    let label               = $('#alamatLabelAlamat');
    let namaLengkap         = $('#alamatNamaLengkap');
    let provinsi            = $('.buttonProvinsi');
    let kabupaten           = $('.buttonKabupaten');
    let kecamatan           = $('.buttonKecamatan');
    let kodePos             = $('#alamatKodePos');
    let informasiTambahan   = $('#alamatInformasiTambahan');
    let simpan              = $('#alamatSimpanAlamat').val();

    empty = []
    if (label.val() == '') {
        empty.push('label')
        $('.divLabel small').css({
            'color': '#fd6c6c'
        });
        $('.divLabel small').text('Label masih kosong, silahkan isikan sesuai alamat anda!');
    }
    if (namaLengkap.val() == '') {
        empty.push('namaLengkap')
        $('.divFullname small').text('Nama Lengkap masih kosong, silahkan isikan sesuai alamat anda!');
        $('.divFullname small').css({'color': '#fd6c6c'});
    }
    if (provinsi.text() == 'Provinsi') {
        empty.push('provinsi')
        provinsi.text('Belom Memilih Provinsi!')
    }
    if (kabupaten.text() == 'Kabupaten / Kota') {
        empty.push('kabupaten')
        kabupaten.text('Belom Memilih Kabupaten!')
    }
    if (kecamatan.text() == 'Kecamatan') {
        empty.push('kecamatan')
        kecamatan.text('Belom Memilih Kecamatan!')
    }
    if (kodePos.val() == '' || kodePos.length == 5) {
        empty.push('kodePos')
        $('.divKodePos small').text('Kode Pos masih kosong, silahkan isikan sesuai alamat anda!');
        $('.divKodePos small').css({'color': '#fd6c6c'});
    }
    if (informasiTambahan.val() == '') {
        empty.push('informasi')
        $('.divInformasiTambahan small').text('Informasi Tambahan masih kosong, silahkan isikan sesuai alamat anda!');
        $('.divInformasiTambahan small').css({'color': '#fd6c6c'});
    }
    if (empty.length == 0) {
        kabupatenLength = kabupaten.text().length
        kabupaten = kabupaten.text().split(' ').slice(1);
        kabupaten = String(kabupaten).replace(/,/g, ' ');
        kabupatenAsli = $('.buttonKabupaten').text()
        return [label.val(), namaLengkap.val(), provinsi.text(), kabupaten, kabupatenAsli, kecamatan.text(), kodePos.val(), informasiTambahan.val(), simpan];    
    } else {
        return false
    }
}

function getAddress(username, method, jumlahBarang, slugify) {
    let user    = username;
    let kontak  = getKontak();
    let alamat  = getAlamat();

    if (kontak != false && alamat != false) {
        screenBlank('visible');
        $('.loading').css({
            'visibility': 'visible',
            'transition': 'all 0.5s',
            'opacity': '1',
            'width': '80px',
        })
        ongkir(kontak, alamat, method, jumlahBarang, slugify);
    } else {
        window.scrollTo({top: 30, behavior: 'smooth'});
    }
}

function ekspedisi(namaEkpd, ekpd) {
    $('.buttonEkspedisi').html(namaEkpd);
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
    $('.buttonJenisPengiriman').text(nama)
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

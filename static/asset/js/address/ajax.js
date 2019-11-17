function ongkir(kontak, alamat, method, jumlahBarang, slugify) {
    $.ajax({
        url: '/ajax/ongkir',
        type: 'GET',
        data: {
            'email': kontak[0],
            'nomerHp': kontak[1],

            'label': alamat[0],
            'namaLengkap': alamat[1],
            'provinsi': alamat[2],
            'kabupaten': alamat[3],
            'kecamatan': alamat[4],
            'kodePos': alamat[5],
            'informasiTambahan': alamat[6],
            'simpan': alamat[7],

            'method': method,
            'jumlahBarang': jumlahBarang,
            'slugify': slugify
        },
        success: function (returnData) {
            screenBlank('hidden');
            $('.loading').css({
                'transition': 'all 0.5s',
                'opacity': '0',
                'width': '0px',
                'visibility': 'hidden',
            });
            $('#leftBar').html(returnData);
            window.scrollTo({top: 20, behavior: "smooth"});
            $('.leftBar').css({
                'transition': 'all 0.5s',
                'height': '860px'
            });
        }
    })
}

function xendit(method, barang) {
    let id_transaksi    = $('#id_transaksi').val();
    let description     = "Barang: {0} | Quantity: {1} | Price: {2}".format(
        $('.listBarang .barang .title').text(), 
        $('.listBarang .barang .quantity').text().split(' ')[1], 
        $('.listBarang .barang .harga').text()
    );
    let amount          = $('#total').text().replace(/,/g, '').split(' ')[1];

    if (method == 'cart') {
        description = [];
        for (let index = 0; index < barang; index++) {
            description.push("Barang: {0} | Jumlah: {1} | Harga: {2}".format(
                $('.listBarang .barang{0} .title'.format(index + 1)).text(), 
                $('.listBarang .barang{0} .quantity'.format(index + 1)).text().split(' ')[1], 
                $('.listBarang .barang{0} .harga'.format(index + 1)).text()
            ));
        }
    }

    $.ajax({
        url: '/ajax/api/xendit',
        type: 'GET',
        data: {
            'id_transaksi': id_transaksi,
            'description': description.toString().replace(/,/g, ', '),
            'amount': '{0}'.format(amount),
        },
        success: function (returnData) {
            screenBlank('visible');
            textBox('visible');
            let href = returnData['invoiceUrl'];
            $('.textBox button').attr({
                'onclick': 'window.location.href = \'{0}\''.format(href),
            })
            // setTimeout(function () {
            //     window.open(href, "_blank");
            // }, 5000)
        }
    });
}

function saveTransaksi(id_transaksi, barang, harga, alamat) {
    let data = new FormData();
    $.ajax({
        url: '/ajax/saveTransaksi',
        type: 'POST',
        data: {

        },
        success: function (params) {
            
        }
    })
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
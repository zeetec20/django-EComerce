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
            'kabupatenAsli': alamat[4],
            'kecamatan': alamat[5],
            'kodePos': alamat[6],
            'informasiTambahan': alamat[7],
            'simpan': alamat[8],

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

function xendit(method, barang, action='getInvoice') {
    let description     = ''
    let id_transaksi    = $('#inputHiddenId_transaksi').val();
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
        description = description.toString().replace(/,/g, ', ')
    } else {
        description = "Barang: {0} | Jumlah: {1} | Harga: {2}".format(
            $('.listBarang .barang .title').text(), 
            $('.listBarang .barang .quantity').text().split(' ')[1], 
            $('.listBarang .barang .harga').text()
        )
    }

    if (action == 'getInvoice') {
        $.ajax({
            url: '/ajax/api/xendit',
            type: 'GET',
            data: {
                'id_transaksi': id_transaksi,
                'description': description,
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
    } else if (action == 'getBarang') {
        console.log(method)
        return description
    } else if (action == 'getHarga') {
        return amount
    }
}

function saveTransaksi(id_transaksi, barang, harga, alamat) {
    let data = new FormData();
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
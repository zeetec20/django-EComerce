function ongkir(kontak, alamat) {
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
            'simpan': alamat[7]
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

function xendit() {
    let id_transaksi    = $('#id_transaksi').val();
    let description     = "Barang: {0} | Quantity: {1} | Price: {2}".format($('.listBarang .barang .title').text(), $('.listBarang .barang .quantity').text().split(' ')[1], $('.listBarang .barang .harga').text());
    let amount          = $('#total').text().replace(/,/g, '').split(' ')[1];
    console.log($('#total').text());
    console.log(amount);
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
            });
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
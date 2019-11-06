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
            })
            $('#leftBar').html(returnData);
        }
    })
}

function xendit() {
    $.ajax({
        url: '',
        type: 'GET',
        data: {

        },
        success: function (returnData) {
            
        }
    })
}
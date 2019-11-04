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
        }
    })
}

function kecamatan(idKecamatan, nama) {
    $('.buttonKecamatan').html(nama);
}

function getAddress() {
    
}
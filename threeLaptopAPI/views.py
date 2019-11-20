from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from goods.models import Barang as ModelBarang
from transaksi.models import Transaksi as ModelTransaksi

class Barang(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        if 'get' in request.GET:
            contentAPI = ''
            titleAPI = ''
            barang = [
                'Rest API Three Laptop | {}'.format(titleAPI),
                contentAPI
            ]

            if request.GET['get'] == 'list-barang':
                barangModel = ModelBarang.objects.all()
                index = 0

                barang = [
                    'Rest API Three Laptop | List Barang',
                    {
                        'jumlahBarang': len(barangModel),
                        'listBarang': [],
                    }
                ]
                
                for brng in barangModel:
                    tersedia = 'Tersedia' if brng.tersedia == True else 'Tidak Tersedia'
                    barang[1]['listBarang'].append({
                        'nama'      : brng.nama,
                        'harga'     : 'Rp. {:,}'.format(brng.harga),
                        'jenis'     : str(brng.jenis),
                        'brand'     : str(brng.brand),
                        'gambar'    : 'http://127.0.0.1:8000/media/' + str(brng.image1),
                        'tersedia'  : tersedia,
                        'terjual'   : brng.terjual
                    })
                    index += 1
                response = barang
            if request.GET['get'] == 'list-barang-detail':
                pass
        else:
            response = {
                'Pesan': "Parameter \'get\' tidak ditemukan, silahkan gunakan api seperti di contoh. " 
                +"Contoh: http GET \'http://127.0.0.1:8000/api/barang?get=list-barang\' \'Authorization:Token 32fd66707c69ec27926f097abe96ea35dd33686c\'"
            }
        return Response(response)

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = get_user_model().objects.get(id=token.user_id)
        if Group.objects.get(name='staff') in user.groups.all():
            return Response({'token': token.key, 'username': user.username})
        else:
            Token.objects.all(key=response.data['token']).delete()
            return Response({'pesan': 'Akun anda tidak terdaftar sebagai staff, akses ini hanya diperuntukan untuk staff!'})
            
class Transaksi(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        if 'get' in request.GET:
            if request.GET['get'] == 'list-transaksi':
                transaksiModel = ModelTransaksi.objects.all()
                transaksi = [
                    'Rest API Three Laptop List Transaksi',
                    {
                        'jumlah_transaksi'  : len(transaksiModel),
                        'list_transaksi'    : []
                    }
                ]
                for trns in transaksiModel:
                    harga_barang = trns.detailHarga.split(' - ')[0].split('Harga: ')
                    index = 0
                    harga = harga_barang
                    if len(harga_barang) > 2:
                        harga = ''
                        for hrg in harga_barang:
                            index += 1
                            if index > 1:
                                print(hrg)
                                if harga == '':
                                    harga = hrg.split(', Barang:')[0]
                                else:
                                    harga += ' - ' + hrg.split(', Barang:')[0]
                            harga = harga.replace(', ', ',')
                    else:
                        harga = harga_barang[1]

                    harga_barang = harga
                    transaksi[1]['list_transaksi'].append({
                        'id_transaksi'  : trns.id_transaksi,
                        'barang'        : trns.barang,
                        'pembeli'       : {
                            'username'      : trns.pembeli.username,
                            'email'         : trns.pembeli.email,
                            'nama_lengkap'  : trns.pembeli.fullname
                        },
                        'harga'         : {
                            'harga_barang':  harga,
                            'harga_pengiriman': trns.detailHarga.split(' - ')[1].replace('Harga Pengiriman: ', ''),
                            'total_harga': 'Rp. {:,}'.format(int(trns.detailHarga.split(' - ')[2]))
                        },
                        'alamat'        : trns.alamat,
                        'ekspedisi'     : trns.ekspedisi
                    })
                return Response(transaksi)

# mengecek token api
# http POST http://127.0.0.1:8000/api/get_api_token username=zeetec password=admin123

# mendapatkan list barang
# http GET 'http://127.0.0.1:8000/api/barang?get=list-barang' 'Authorization:Token 32fd66707c69ec27926f097abe96ea35dd33686c'

# mendapatkan list barang detail
# http GET 'http://127.0.0.1:8000/api/transaksi?get=list-transaksi' 'Authorization:Token 32fd66707c69ec27926f097abe96ea35dd33686c'

# mendapatkan list transaksi
# http GET 'http://127.0.0.1:8000/api/listbarang?get=list-transaksi' 'Authorization:Token 32fd66707c69ec27926f097abe96ea35dd33686c'